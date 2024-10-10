
// import Principal "mo:base/Principal";

// actor {
//     stable var users: [User] = [];

//     type User = {
//         principal: Principal;
//         username: Text;
//     };

//     public func createUser(username: Text): async User {
//         let user = {
//             principal = msg.caller;
//             username = username;
//         };
//         users := Array.append(users, [user]);
//         user
//     };

//     public func getUsers(): async[User] {
//         users
//     }
// };