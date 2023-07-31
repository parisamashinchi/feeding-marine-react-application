

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


interface LoginAction {
    type: typeof LOGIN_SUCCESS;
    payload:any;
}



export type AuthActionTypes = LoginAction;
