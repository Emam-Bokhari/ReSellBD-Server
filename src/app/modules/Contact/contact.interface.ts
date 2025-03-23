export type TContact = {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message: string;
    services?: string[];
    isDeleted?: boolean;
}
