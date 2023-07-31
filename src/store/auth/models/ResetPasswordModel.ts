export interface ResetPasswordModel {
    email: string | null;
    password: string;
    confirm_password: string;
    token: string | null;
}

export const resetPasswordModelInitialization: ResetPasswordModel = {
    email: '',
    password: '',
    confirm_password: '',
    token: ''
}
