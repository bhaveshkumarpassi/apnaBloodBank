import * as ActionTypes from './ActionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
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
        default:
            return state
    }
}