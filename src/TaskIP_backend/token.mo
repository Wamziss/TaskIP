import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";

actor Token {
    private let tokenName : Text = "TIO";
    private let symbol : Text = "TIO";
    private let decimals : Nat = 18;
    private let totalSupply : Nat = 1_000_000_000_000;

    private let balances = HashMap.HashMap<Principal, Nat>(10, Principal.equal, Principal.hash);

    // Constructor
    public func init() {
        balances.put(Principal.fromText("br5f7-7uaaa-aaaaa-qaaca-cai"), totalSupply);
    };

    public query func balanceOf(who : Principal) : async Nat {
        switch (balances.get(who)) {
            case (null) { 0 };
            case (?balance) { balance };
        }
    };

    public shared(msg) func transfer(to : Principal, amount : Nat) : async Bool {
        let from = msg.caller;
        
        switch (balances.get(from)) {
            case (null) { false };
            case (?fromBalance) {
                if (fromBalance < amount) { 
                    false 
                } else {
                    balances.put(from, fromBalance - amount);
                    switch (balances.get(to)) {
                        case (null) { 
                            balances.put(to, amount);
                        };
                        case (?toBalance) {
                            balances.put(to, toBalance + amount);
                        };
                    };
                    true
                }
            };
        }
    };

    public query func getTokenInfo() : async {
        name : Text;
        symbol : Text;
        decimals : Nat;
        totalSupply : Nat;
    } {
        {
            name = tokenName;
            symbol = symbol;
            decimals = decimals;
            totalSupply = totalSupply;
        }
    };
}
