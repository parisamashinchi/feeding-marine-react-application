export interface LoginModel {
    email: string;
    password: string;
}

export const loginInitialization: LoginModel = {
    email: '',
    password: ''
}

export interface LoginResponse {
    token: string;
}
