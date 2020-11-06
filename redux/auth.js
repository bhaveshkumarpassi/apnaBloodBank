import * as ActionTypes from './ActionTypes';
import { firebaseSupport } from '../firebase/firebase';

export const auth = (state = {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                user: null,
                errMess: null
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: null,
                user: action.user
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message,
                user: null
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true,
                errMess: null,
                user: null
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: null,
                user: null,
            };
        case ActionTypes.LOGOUT_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message,
                user: null
            };
        case ActionTypes.UPDATE_PROFILE_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true,
                user: firebaseSupport.auth.currentUser,
                errMess: null
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: null,
                user: action.user
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: action.message,
                user: firebaseSupport.auth.currentUser
            };
        default:
            return state
    }
}