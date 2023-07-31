import {AuthActionTypes, LOGIN_SUCCESS} from './models/actions';
import {Action, Reducer} from "redux";
import {LoginResponse} from './models/LoginModel';

export const initializeLoginResponseState: LoginResponse = {
    token: ''
}

// @ts-ignore
export const authReducer: Reducer<LoginResponse, Action> = (state = initializeLoginResponseState, action: AuthActionTypes) => {

    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {...action.payload};
        }
        default:
            return state;
    }
}
