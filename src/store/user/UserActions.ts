import {FETCH_USER_REJECTED, FETCH_USER_FULFILLED, FETCH_USER_PENDING} from './models/actions';
import {initializeUserState} from "./UserReducer";
import {Action, Dispatch} from "redux";
import {User} from "./models/User";

import {AppActions} from '../actions';


export const requestUser = (): AppActions => {
    return {
        type: FETCH_USER_PENDING,
        user: initializeUserState
    }
}

export const returnUser = (user: User): AppActions => {
    return {
        type: FETCH_USER_FULFILLED,
        user: {...user}
    }
}

export const errorUser = (): AppActions => {
    return {
        type: FETCH_USER_REJECTED,
        user: {...initializeUserState, id: -1, userId: -1, title: 'error'}
    }
}


export const fetchUser = () => {
    return async (dispatch: Dispatch) => {
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        try {
            dispatch(requestUser());
            // const response = await get(`https://jsonplaceholder.typicode.com/todos/${randomNumber}`);

            // set account info
            // if (response) {
            //     dispatch(returnUser(response))
            // }

        } catch (err) {

            // show error
            dispatch(errorUser())

        } finally {
        }
    };
};


