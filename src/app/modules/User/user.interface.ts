export type TUser = {
    name: string;
    email?: string;
    phoneNumber?: string;
    password: string;
    role: "user" | "admin"
}