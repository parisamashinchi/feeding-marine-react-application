import {LOGIN_SUCCESS} from './models/actions';
import {Action, Dispatch} from "redux";

import {AppActions} from '../actions';
import {LoginResponse} from './models/LoginModel';


export const loginSuccess = (login: LoginResponse): AppActions => {
    return {
        type: LOGIN_SUCCESS,
        payload: {...login}
    }
}
