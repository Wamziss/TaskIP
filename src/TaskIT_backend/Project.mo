// import Principal "mo:base/Principal";
// import Task "Task.mo";

// actor {
//     stable var projects: [Project] = [];
//     var nextProjectId: Nat = 0;

//     type Project = {
//         id: Nat;
//         name: Text;
//         description: Text;
//         members: [Principal];
//         tasks: [Task.Task];
//     };

//     public func addProject(name: Text, description: Text, members: [Principal]): Project {
//         let project = {
//             id = nextProjectId;
//             name = name;
//             description = description;
//             members = members;
//             tasks = [];
//         };
//         nextProjectId += 1;
//         projects := Array.append(projects, [project]);
//         project
//     };

//     public func addTaskToProject(projectId: Nat, task: Task.Task): ?Project {
//         let index = projects.findIndex((project) project.id == projectId);
//         if (Option.isSome(index)) {
//             let i = Option.unwrap(index);
//             let project = projects[i];
//             project.tasks := Array.append(project.tasks, [task]);
//             projects[i] := project;
//             return ?project;
//         } else {
//             return null;
//         };
//     };

//     // Retrieve all projects
//     public func getProjects(): [Project] {
//         projects
//     };

//     // Retrieve projects by Principal ID (i.e., user membership)
//     public func getProjectsByPrincipal(principal: Principal): [Project] {
//         projects.filter(func (project) project.members.contains(principal))
//     }
// };