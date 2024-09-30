export interface User {
    name: string;
    email: string;
    password: string; // If you need to handle this, consider if it should be included in the UI
    role: string;
    id: string;
}
