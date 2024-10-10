import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor {
    stable var tasks: [Task] = [];
    var nextTaskId: Nat = 0;

    type Task = {
        id: Nat;
        title: Text;
        description: Text;
        status: Text;
        assigned_to: Principal;
        created_by: Principal;
    };

    public func addTask(title: Text, description: Text, status: Text, assigned_to: Principal): async Task {
        let task = {
            id = nextTaskId;
            title = title;
            description = description;
            status = status;
            assigned_to = assigned_to;
            created_by = msg.caller;
        };
        nextTaskId += 1;
        tasks := Array.append(tasks, [task]);
        task
    };

    public func updateTask(id: Nat, newTitle: ?Text, newDescription: ?Text, newStatus: ?Text, newAssignedTo: ?Principal): async ?Task {
        let index = Iter.findIndex<Tasks>(tasks, func(task) { task.id == id });
        if (Option.isSome(index)) {
            let i = Option.unwrap(index);
            var task = tasks[i];

            if (newTitle != null) { task.title := Option.unwrap(newTitle); };
            if (newDescription != null) { task.description := Option.unwrap(newDescription); };
            if (newStatus != null) { task.status := Option.unwrap(newStatus); };
            if (newAssignedTo != null) { task.assigned_to := Option.unwrap(newAssignedTo); };

            tasks[i] := task;
            return ?task;
        } else {
            return null;
        };
    };

    public func deleteTask(id: Nat): async Bool {
        let index = tasks.indexWhere(func(task) { task.id == id });
        if (Option.isSome(index)) {
            let i = Option.unwrap(index);
            tasks := Array.remove(tasks, i);
            true
        } else {
            false
        }
    };

    public func getTasks(): async [Task] {
        tasks
    }
};
