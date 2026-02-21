import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CourseUnit {
    title: string;
    description: string;
    topics: Array<string>;
}
export type Time = bigint;
export interface Lesson {
    id: bigint;
    title: string;
    associatedUnit: bigint;
    content: string;
    order: bigint;
    timestamp: Time;
}
export interface Contact {
    name: string;
    sender: Principal;
    message: string;
    timestamp: Time;
    emailAddress: string;
}
export interface Member {
    joinDate: Time;
    isVIP: boolean;
    principalId: Principal;
}
export interface Announcement {
    id: bigint;
    title: string;
    content: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addLesson(unitId: bigint, title: string, content: string, order: bigint): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllAnnouncements(): Promise<Array<Announcement>>;
    getAllContacts(): Promise<Array<Contact>>;
    getAllLessons(): Promise<Array<Lesson>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCourseUnits(): Promise<Array<CourseUnit>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVIPMembers(): Promise<Array<Member>>;
    initNewMember(): Promise<Time>;
    isCallerAdmin(): Promise<boolean>;
    onContact(name: string, email: string, message: string): Promise<void>;
    publishAnnouncement(title: string, content: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCourseContent(unitId: bigint, description: string, title: string, topics: Array<string>): Promise<void>;
    updateVIPStatus(principal: Principal, isVIP: boolean): Promise<void>;
}
