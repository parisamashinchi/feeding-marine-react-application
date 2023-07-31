import {UserActionTypes} from './user/models/actions';
import {AuthActionTypes} from './auth/models/actions';

export type AppActions = AuthActionTypes | UserActionTypes;
