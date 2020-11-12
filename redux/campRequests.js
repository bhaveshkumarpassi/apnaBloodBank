import * as ActionTypes from './ActionTypes';

export const CampRequests = (state = {
        isLoading: true,
        errMess: null,
        campRequests: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.CAMP_REQUESTS_LOADING:
            return {...state, isLoading: true, errMess: null, campRequests: []};
        case ActionTypes.ADD_CAMP_REQUESTS:
            return {...state, isLoading: false, errMess: null, campRequests: action.payload};

        case ActionTypes.CAMP_REQUESTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, campRequests: []};

        case ActionTypes.ADD_CAMP_REQUEST:
            var campRequest = action.payload;
            return {...state, campRequests: state.campRequests.concat(campRequest)};

        default:
            return state;
    }
}