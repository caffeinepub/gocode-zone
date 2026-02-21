import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Contact {
    name: string;
    sender: Principal;
    message: string;
    timestamp: Time;
    emailAddress: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllContacts(): Promise<Array<Contact>>;
    onContact(name: string, emailAddress: string, message: string): Promise<void>;
}
