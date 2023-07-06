export interface Auth {
    username: string;
    password: string;
}

export interface AuthResponse {
    body: {
        token: string;
    }
    status: number;
}