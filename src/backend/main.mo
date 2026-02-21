import Time "mo:core/Time";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  type Contact = {
    name : Text;
    emailAddress : Text;
    message : Text;
    sender : Principal;
    timestamp : Time.Time;
  };

  module Contact {
    public func compare(contact1 : Contact, contact2 : Contact) : Order.Order {
      switch (Text.compare(contact1.name, contact2.name)) {
        case (#equal) {
          switch (Text.compare(contact1.emailAddress, contact2.emailAddress)) {
            case (#equal) {
              switch (Text.compare(contact1.message, contact2.message)) {
                case (#equal) {
                  if (contact1.timestamp < contact2.timestamp) {
                    #less;
                  } else {
                    #greater;
                  };
                };
                case (other) { other };
              };
            };
            case (other) { other };
          };
        };
        case (other) { other };
      };
    };
  };

  let contacts = Set.empty<Contact>();

  public shared ({ caller }) func onContact(name : Text, emailAddress : Text, message : Text) : async () {
    let contact : Contact = {
      name;
      emailAddress;
      message;
      sender = caller;
      timestamp = Time.now();
    };
    contacts.add(contact);
  };

  public query ({ caller }) func getAllContacts() : async [Contact] {
    contacts.toArray();
  };
};
