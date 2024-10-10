actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};

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