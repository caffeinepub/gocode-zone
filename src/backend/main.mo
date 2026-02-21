import Time "mo:core/Time";
import Array "mo:core/Array";
import Set "mo:core/Set";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  // Authorization system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Type Definitions
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  type CourseUnit = {
    title : Text;
    description : Text;
    topics : [Text];
  };

  type Lesson = {
    id : Nat;
    title : Text;
    content : Text;
    associatedUnit : Nat;
    order : Nat;
    timestamp : Time.Time;
  };

  type Announcement = {
    id : Nat;
    title : Text;
    content : Text;
    timestamp : Time.Time;
  };

  type Member = {
    principalId : Principal;
    joinDate : Time.Time;
    isVIP : Bool;
  };

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

  // Persistent State
  var courseUnits : [CourseUnit] = [
    {
      title = "Unit 1";
      description = "First course unit";
      topics = ["Spanish", "French"];
    },
    {
      title = "Unit 2";
      description = "Second course unit";
      topics = ["Financial and VISA topics"];
    },
    {
      title = "Unit 3";
      description = "Third course unit";
      topics = ["Practice"];
    },
    {
      title = "Unit 4";
      description = "Fourth course unit";
      topics = ["Culture & community"];
    },
  ];

  let userProfiles = Map.empty<Principal, UserProfile>();
  let members = Map.empty<Principal, Member>();
  let contacts = Set.empty<Contact>();
  let announcements = Map.empty<Nat, Announcement>();
  var announcementIdCounter = 0;
  let lessons = Map.empty<Nat, Lesson>();
  var lessonIdCounter = 0;

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Initialization
  public shared ({ caller }) func initNewMember() : async Time.Time {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can initialize membership");
    };
    let joinDate = Time.now();
    members.add(
      caller,
      {
        principalId = caller;
        joinDate;
        isVIP = false;
      },
    );
    joinDate;
  };

  // Administrative Functions (Admin Only)
  public shared ({ caller }) func publishAnnouncement(title : Text, content : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can publish announcements");
    };

    let announcement : Announcement = {
      id = announcementIdCounter;
      title;
      content;
      timestamp = Time.now();
    };

    announcements.add(announcementIdCounter, announcement);
    announcementIdCounter += 1;
  };

  public shared ({ caller }) func addLesson(unitId : Nat, title : Text, content : Text, order : Nat) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add lessons");
    };

    let lesson : Lesson = {
      id = lessonIdCounter;
      title;
      content;
      associatedUnit = unitId;
      order;
      timestamp = Time.now();
    };

    lessons.add(lessonIdCounter, lesson);
    lessonIdCounter += 1;
    lesson.id;
  };

  public shared ({ caller }) func updateCourseContent(unitId : Nat, description : Text, title : Text, topics : [Text]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update course content");
    };

    if (unitId >= courseUnits.size()) {
      Runtime.trap("Invalid unit ID");
    };

    let updatedUnit = {
      title;
      description;
      topics;
    };

    let mutableUnits = courseUnits.toVarArray<CourseUnit>();
    mutableUnits[unitId] := updatedUnit;
    courseUnits := mutableUnits.toArray();
  };

  public shared ({ caller }) func updateVIPStatus(principal : Principal, isVIP : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update VIP status");
    };

    switch (members.get(principal)) {
      case (?existingMember) {
        let updatedMember = {
          principalId = existingMember.principalId;
          joinDate = existingMember.joinDate;
          isVIP;
        };
        members.add(principal, updatedMember);
      };
      case null {
        let newMember = {
          principalId = principal;
          joinDate = Time.now();
          isVIP;
        };
        members.add(principal, newMember);
      };
    };
  };

  // Query Functions
  public query ({ caller }) func getCourseUnits() : async [CourseUnit] {
    // Public access - no authorization check needed
    courseUnits;
  };

  public query ({ caller }) func getAllLessons() : async [Lesson] {
    // Public access - no authorization check needed
    lessons.values().toArray();
  };

  public query ({ caller }) func getAllAnnouncements() : async [Announcement] {
    // Public access - no authorization check needed
    announcements.values().toArray();
  };

  public query ({ caller }) func getVIPMembers() : async [Member] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all members");
    };
    members.values().toArray();
  };

  public query ({ caller }) func getAllContacts() : async [Contact] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all contacts");
    };
    contacts.toArray();
  };

  // Contact Function
  public shared ({ caller }) func onContact(name : Text, email : Text, message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit contact forms");
    };
    let contact : Contact = {
      name;
      emailAddress = email;
      message;
      sender = caller;
      timestamp = Time.now();
    };
    contacts.add(contact);
  };
};
