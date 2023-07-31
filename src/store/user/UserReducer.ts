import {FETCH_USER_FULFILLED, FETCH_USER_PENDING, FETCH_USER_REJECTED, UserActionTypes} from './models/actions';

import {User} from './models/User';
import {Action, Reducer} from "redux";

export const initializeUserState: User = {
    completed:false,
    id:0,
    title:'',
    userId:0
}

// @ts-ignore
export const userReducer: Reducer<User, Action> = (state = initializeUserState, action: UserActionTypes) => {

    switch (action.type) {
        case FETCH_USER_PENDING: {
            return {...state};
        }

        case FETCH_USER_FULFILLED: {
            return {...action.user};
        }

        case FETCH_USER_REJECTED: {
            return {...action.user};
        }
        default:
            return state;
    }
}
