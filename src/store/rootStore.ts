import {createStore, combineReducers, applyMiddleware} from 'redux';
import {userReducer} from "./user/UserReducer";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {AppActions} from './actions';
import {authReducer} from './auth/AuthReducer';

export const rootReducer = combineReducers({userReducer,authReducer})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));
