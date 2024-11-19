import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";

actor Main {
    // Type definitions
    type ProjectId = Nat;
    type TaskId = Nat;
    type SubtaskId = Nat;

    // Priority type
    type Priority = {
        #low;
        #normal;
        #urgent;
    };

    // Subtask type
    type Subtask = {
        id: SubtaskId;
        name: Text;
        description: Text;
        assignees: [Principal];
        dueDate: Time.Time;
        priority: Priority;
        createdAt: Time.Time;
        createdBy: Principal;
    };

    // Task type
    type Task = {
        id: TaskId;
        name: Text;
        description: Text;
        subtasks: [Subtask];
        createdAt: Time.Time;
        createdBy: Principal;
    };

    // Project type
    type Project = {
        id: ProjectId;
        name: Text;
        description: Text;
        tasks: [Task];
        createdAt: Time.Time;
        createdBy: Principal;
        members: [Principal];
    };

    // Error types
    type Error = {
        #NotFound;
        #NotAuthorized;
        #InvalidInput;
    };

    // Stable variables for upgrades
    private stable var nextProjectId : Nat = 0;
    private stable var projectEntries : [(ProjectId, Project)] = [];

    // State
    private var projects = HashMap.HashMap<ProjectId, Project>(1, Nat.equal, Hash.hash);

    // Initialize state from stable variables
    system func preupgrade() {
        projectEntries := Iter.toArray(projects.entries());
    };

    system func postupgrade() {
        projects := HashMap.fromIter<ProjectId, Project>(
            projectEntries.vals(),
            1,
            Nat.equal,
            Hash.hash
        );
        projectEntries := [];
    };

    // Helper function to convert priority from Text to Priority type
    private func textToPriority(text: Text) : Priority {
        switch (text) {
            case ("urgent") #urgent;
            case ("normal") #normal;
            case (_) #low;
        };
    };

    // Validate Principal (Improved with Result handling)
    public func validatePrincipal(principalText: Text) : async Result.Result<Principal, Error> {
        if (Text.size(principalText) > 0 and Text.size(principalText) <= 100) {
          
            return #ok(Principal.fromText(principalText));
        } else {
            return #err(#InvalidInput); // Return error if input is invalid
        };
    };

    // Create new project
    public shared({ caller }) func createProject(
        projectName: Text,
        projectDescription: Text,
        tasks: [{
            name: Text;
            description: Text;
            subtasks: [{
                name: Text;
                description: Text;
                assignees: [Text]; // Array of Principal IDs as text
                dueDate: Time.Time;
                priority: Text;
            }];
        }]
    ) : async Result.Result<ProjectId, Error> {
        // Validate input
        if (Text.size(projectName) == 0) {
            return #err(#InvalidInput);
        };

        let processedTasks = Buffer.Buffer<Task>(0);
        var taskId : Nat = 0;
        var subtaskId : Nat = 0;

        for (taskInput in tasks.vals()) {
            let processedSubtasks = Buffer.Buffer<Subtask>(0);
            
            for (subtaskInput in taskInput.subtasks.vals()) {
                // Convert assignee text to principals
                let validAssignees = Buffer.Buffer<Principal>(0);
                
                for (assigneeText in subtaskInput.assignees.vals()) {
                    switch (await validatePrincipal(assigneeText)) {
                        case (#ok(principal)) {
                            validAssignees.add(principal);
                        };
                        case (#err(_)) {}; // Skip invalid principals
                    };
                };

                processedSubtasks.add({
                    id = subtaskId;
                    name = subtaskInput.name;
                    description = subtaskInput.description;
                    assignees = Buffer.toArray(validAssignees);
                    dueDate = subtaskInput.dueDate;
                    priority = textToPriority(subtaskInput.priority);
                    createdAt = Time.now();
                    createdBy = caller;
                });
                subtaskId += 1;
            };

            processedTasks.add({
                id = taskId;
                name = taskInput.name;
                description = taskInput.description;
                subtasks = Buffer.toArray(processedSubtasks);
                createdAt = Time.now();
                createdBy = caller;
            });
            taskId += 1;
        };

        let newProject : Project = {
            id = nextProjectId;
            name = projectName;
            description = projectDescription;
            tasks = Buffer.toArray(processedTasks);
            createdAt = Time.now();
            createdBy = caller;
            members = [caller];
        };

        projects.put(nextProjectId, newProject);
        nextProjectId += 1;

        return #ok(newProject.id); // Return the new project ID
    };

    // Get project by ID
    public query func getProject(projectId: ProjectId) : async Result.Result<Project, Error> {
        switch (projects.get(projectId)) {
            case (?project) { return #ok(project); };
            case (null) { return #err(#NotFound); };
        }
    };

    // Get all projects for a user
    public query({ caller }) func getUserProjects() : async [Project] {
        let userProjects = Buffer.Buffer<Project>(0);
        for ((_, project) in projects.entries()) {
            if (Array.find<Principal>(project.members, func(p) { p == caller }) != null) {
                userProjects.add(project);
            };
        };
        return Buffer.toArray(userProjects);
    };

    // Add member to project
    public shared({ caller }) func addProjectMember(
        projectId: ProjectId,
        memberPrincipal: Text
    ) : async Result.Result<(), Error> {
        switch (projects.get(projectId)) {
            case (?project) {
                if (project.createdBy != caller) {
                    return #err(#NotAuthorized);
                };

                switch (await validatePrincipal(memberPrincipal)) {
                    case (#ok(principal)) {
                        // Add the principal to the members list
                        let newMembers = Buffer.fromArray<Principal>(project.members);
                        newMembers.add(principal);

                        let updatedProject = {
                            project with
                            members = Buffer.toArray(newMembers); // Update the members list
                        };
                        projects.put(projectId, updatedProject); // Save the updated project
                        return #ok(());
                    };
                    case (#err(_)) {
                        return #err(#InvalidInput); // Handle invalid input
                    };
                }
            };
            case (null) {
                return #err(#NotFound);
            };
        }
    };

    // Update subtask assignees
    public shared({ caller }) func updateSubtaskAssignees(
        projectId: ProjectId,
        taskId: TaskId,
        subtaskId: SubtaskId,
        newAssignees: [Text]
    ) : async Result.Result<(), Error> {
        switch (projects.get(projectId)) {
            case (?project) {
                // Verify caller is a project member
                if (Array.find<Principal>(project.members, func(p) { p == caller }) == null) {
                    return #err(#NotAuthorized);
                };

                let validAssignees = Buffer.Buffer<Principal>(0);
                
                for (assigneeText in newAssignees.vals()) {
                    switch (await validatePrincipal(assigneeText)) {
                        case (#ok(principal)) {
                            validAssignees.add(principal); // Add valid principal to the list
                        };
                        case (#err(_)) {}; // Skip invalid principals
                    };
                };

                let updatedTasks = Array.map<Task, Task>(
                    project.tasks,
                    func(task) {
                        if (task.id != taskId) { return task; };
                        
                        let updatedSubtasks = Array.map<Subtask, Subtask>(
                            task.subtasks,
                            func(subtask) {
                                if (subtask.id != subtaskId) { return subtask; };
                                {
                                    subtask with
                                    assignees = Buffer.toArray(validAssignees);
                                }
                            }
                        );
                        {
                            task with
                            subtasks = updatedSubtasks;
                        }
                    }
                );

                let updatedProject = {
                    project with
                    tasks = updatedTasks;
                };
                projects.put(projectId, updatedProject);
                return #ok(());
            };
            case (null) {
                return #err(#NotFound);
            };
        }
    };

    // Delete project
    public shared({ caller }) func deleteProject(projectId: ProjectId) : async Result.Result<(), Error> {
        switch (projects.get(projectId)) {
            case (?project) {
                if (project.createdBy != caller) {
                    return #err(#NotAuthorized);
                };
                projects.delete(projectId);
                return #ok(());
            };
            case (null) {
                return #err(#NotFound);
            };
        }
    };
};

// import Principal "mo:base/Principal";
// import HashMap "mo:base/HashMap";
// import Hash "mo:base/Hash";
// import Buffer "mo:base/Buffer";
// import Time "mo:base/Time";
// import Array "mo:base/Array";
// import Iter "mo:base/Iter";
// import Text "mo:base/Text";
// import Nat "mo:base/Nat";
// import Result "mo:base/Result";


// actor ProjectManager {
//     // Type definitions
//     type ProjectId = Nat;
//     type TaskId = Nat;
//     type SubtaskId = Nat;

//     // Priority type
//     type Priority = {
//         #low;
//         #normal;
//         #urgent;
//     };

//     // Subtask type
//     type Subtask = {
//         id: SubtaskId;
//         name: Text;
//         description: Text;
//         assignees: [Principal];
//         dueDate: Time.Time;
//         priority: Priority;
//         createdAt: Time.Time;
//         createdBy: Principal;
//     };

//     // Task type
//     type Task = {
//         id: TaskId;
//         name: Text;
//         description: Text;
//         subtasks: [Subtask];
//         createdAt: Time.Time;
//         createdBy: Principal;
//     };

//     // Project type
//     type Project = {
//         id: ProjectId;
//         name: Text;
//         description: Text;
//         tasks: [Task];
//         createdAt: Time.Time;
//         createdBy: Principal;
//         members: [Principal];
//     };

//     // Error types
//     type Error = {
//         #NotFound;
//         #NotAuthorized;
//         #InvalidInput;
//     };

//     // Stable variables for upgrades
//     private stable var nextProjectId : Nat = 0;
//     private stable var projectEntries : [(ProjectId, Project)] = [];

//     // State
//     private var projects = HashMap.HashMap<ProjectId, Project>(1, Nat.equal, Hash.hash);
//     // private var projects = HashMap.HashMap<ProjectId, Project>(1, Nat.equal, Hash.natHash);

//     // Initialize state from stable variables
//     system func preupgrade() {
//         projectEntries := Iter.toArray(projects.entries());
//     };

//     system func postupgrade() {
//         projects := HashMap.fromIter<ProjectId, Project>(
//             projectEntries.vals(),
//             1,
//             Nat.equal,
//             Hash.hash
//         );
//         projectEntries := [];
//     };

//     // Helper function to convert priority from Text to Priority type
//     private func textToPriority(text: Text) : Priority {
//         switch (text) {
//             case ("urgent") #urgent;
//             case ("normal") #normal;
//             case (_) #low;
//         };
//     };

//     private func validatePrincipal(principalText: Text) : ?Principal {
//         switch (Principal.fromText(principalText)) {
//             case (?principal) { // If the principal is valid, return it
//                 return ?principal;
//             };
//             case (null) { // If it's invalid, return null
//                 return null;
//             };
//         };
//     };


    

//     // Create new project
//     public shared({ caller }) func createProject(
//         projectName: Text,
//         projectDescription: Text,
//         tasks: [{
//             name: Text;
//             description: Text;
//             subtasks: [{
//                 name: Text;
//                 description: Text;
//                 assignees: [Text]; // Array of Principal IDs as text
//                 dueDate: Time.Time;
//                 priority: Text;
//             }];
//         }]
//     ) : async Result.Result<ProjectId, Error> {
//         // Validate input
//         if (Text.size(projectName) == 0) {
//             return #err(#InvalidInput);
//         };

//         let processedTasks = Buffer.Buffer<Task>(0);
//         var taskId : Nat = 0;
//         var subtaskId : Nat = 0;

//         for (taskInput in tasks.vals()) {
//             let processedSubtasks = Buffer.Buffer<Subtask>(0);
            
//             for (subtaskInput in taskInput.subtasks.vals()) {
//                 // Convert assignee text to principals
//                 let validAssignees = Buffer.Buffer<Principal>(0);
//                 for (assigneeText in subtaskInput.assignees.vals()) {
//                     switch (validatePrincipal(assigneeText)) {
//                         case (?principal) { validAssignees.add(principal); };
//                         case (null) {}; // Skip invalid principals
//                     };
//                 };

//                 processedSubtasks.add({
//                     id = subtaskId;
//                     name = subtaskInput.name;
//                     description = subtaskInput.description;
//                     assignees = Buffer.toArray(validAssignees);
//                     dueDate = subtaskInput.dueDate;
//                     priority = textToPriority(subtaskInput.priority);
//                     createdAt = Time.now();
//                     createdBy = caller;
//                 });
//                 subtaskId += 1;
//             };

//             processedTasks.add({
//                 id = taskId;
//                 name = taskInput.name;
//                 description = taskInput.description;
//                 subtasks = Buffer.toArray(processedSubtasks);
//                 createdAt = Time.now();
//                 createdBy = caller;
//             });
//             taskId += 1;
//         };

//         let newProject : Project = {
//             id = nextProjectId;
//             name = projectName;
//             description = projectDescription;
//             tasks = Buffer.toArray(processedTasks);
//             createdAt = Time.now();
//             createdBy = caller;
//             members = [caller];
//         };

//         projects.put(nextProjectId, newProject);
//         nextProjectId += 1;

//         #ok(newProject.id)
//     };

//     // Get project by ID
//     public query func getProject(projectId: ProjectId) : async Result.Result<Project, Error> {
//         switch (projects.get(projectId)) {
//             case (?project) { #ok(project) };
//             case (null) { #err(#NotFound) };
//         }
//     };

//     // Get all projects for a user
//     public query({ caller }) func getUserProjects() : async [Project] {
//         let userProjects = Buffer.Buffer<Project>(0);
//         for ((_, project) in projects.entries()) {
//             if (Array.find<Principal>(project.members, func(p) { p == caller }) != null) {
//                 userProjects.add(project);
//             };
//         };
//         Buffer.toArray(userProjects)
//     };

//     // Add member to project
//     public shared({ caller }) func addProjectMember(
//         projectId: ProjectId,
//         memberPrincipal: Text
//     ) : async Result.Result<(), Error> {
//         switch (projects.get(projectId)) {
//             case (?project) {
//                 if (project.createdBy != caller) {
//                     return #err(#NotAuthorized);
//                 };

//                 switch (validatePrincipal(memberPrincipal)) {
//                     case (?principal) {
//                         let newMembers = Buffer.fromArray<Principal>(project.members);
//                         newMembers.add(principal);

//                         let updatedProject = {
//                             project with
//                             members = Buffer.toArray(newMembers);
//                         };
//                         projects.put(projectId, updatedProject);
//                         #ok(())
//                     };
//                     case (null) {
//                         #err(#InvalidInput)
//                     };
//                 }
//             };
//             case (null) {
//                 #err(#NotFound)
//             };
//         }
//     };

//     // Update subtask status
//     public shared({ caller }) func updateSubtaskAssignees(
//         projectId: ProjectId,
//         taskId: TaskId,
//         subtaskId: SubtaskId,
//         newAssignees: [Text]
//     ) : async Result.Result<(), Error> {
//         switch (projects.get(projectId)) {
//             case (?project) {
//                 // Verify caller is a project member
//                 if (Array.find<Principal>(project.members, func(p) { p == caller }) == null) {
//                     return #err(#NotAuthorized);
//                 };

//                 let validAssignees = Buffer.Buffer<Principal>(0);
//                 for (assigneeText in newAssignees.vals()) {
//                     switch (validatePrincipal(assigneeText)) {
//                         case (?principal) { validAssignees.add(principal); };
//                         case (null) {}; // Skip invalid principals
//                     };
//                 };

//                 let updatedTasks = Array.map<Task, Task>(
//                     project.tasks,
//                     func(task) {
//                         if (task.id != taskId) { return task; };
                        
//                         let updatedSubtasks = Array.map<Subtask, Subtask>(
//                             task.subtasks,
//                             func(subtask) {
//                                 if (subtask.id != subtaskId) { return subtask; };
//                                 {
//                                     subtask with
//                                     assignees = Buffer.toArray(validAssignees);
//                                 }
//                             }
//                         );
//                         {
//                             task with
//                             subtasks = updatedSubtasks;
//                         }
//                     }
//                 );

//                 let updatedProject = {
//                     project with
//                     tasks = updatedTasks;
//                 };
//                 projects.put(projectId, updatedProject);
//                 #ok(())
//             };
//             case (null) {
//                 #err(#NotFound)
//             };
//         }
//     };

//     // Delete project
//     public shared({ caller }) func deleteProject(projectId: ProjectId) : async Result.Result<(), Error> {
//         switch (projects.get(projectId)) {
//             case (?project) {
//                 if (project.createdBy != caller) {
//                     return #err(#NotAuthorized);
//                 };
//                 projects.delete(projectId);
//                 #ok(())
//             };
//             case (null) {
//                 #err(#NotFound)
//             };
//         }
//     };
// };

// import Project "Project";
// import Task "Task";
// import User "User";

// actor TaskManagerBackend {
//     stable var users = User();
//     stable var tasks = Task();
//     stable var projects = Project();

//     public shared(msg) func createUser(username: Text): async User.User {
//         users.createUser(username);
//     };

//     public shared(msg) func getUsers(): async [User.User] {
//         users.getUsers();
//     };

//     public shared(msg) func addTask(title: Text, description: Text, status: Text, assignedTo: Principal): async Task.Task {
//         tasks.addTask(title, description, status, assignedTo);
//     };

//     public shared(msg) func updateTask(id: Nat, title: ?Text, description: ?Text, status: ?Text, assignedTo: ?Principal): async ?Task.Task {
//         tasks.updateTask(id, title, description, status, assignedTo);
//     };

//     public shared(msg) func deleteTask(id: Nat): async Bool {
//         tasks.deleteTask(id);
//     };

//     public shared(msg) func getTasks(): async [Task.Task] {
//         tasks.getTasks();
//     };

//     public shared(msg) func addProject(name: Text, description: Text, members: [Principal]): async Project.Project {
//         projects.addProject(name, description, members);
//     };

//     public shared(msg) func addTaskToProject(projectId: Nat, task: Task.Task): async ?Project.Project {
//         projects.addTaskToProject(projectId, task);
//     };

//     public shared(msg) func getProjects(): async [Project.Project] {
//         projects.getProjects();
//     };

//     public shared(msg) func getProjectsByPrincipal(principal: Principal): async [Project.Project] {
//         projects.getProjectsByPrincipal(principal);
//     };
// };