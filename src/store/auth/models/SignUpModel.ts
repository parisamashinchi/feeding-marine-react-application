export interface SignUpModel {
    fullName: string;
    email: string;
    password: string;
    confirm_password: string;
}

export const signUpInitialization: SignUpModel = {
    fullName : '',
    email: '',
    password: '',
    confirm_password: ''
}
