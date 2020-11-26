import * as ActionTypes from './ActionTypes';

export const BloodRequests = (state = {
        isLoading: true,
        errMess: null,
        bloodRequests: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.BLOOD_REQUESTS_LOADING:
            return {...state, isLoading: true, errMess: null, bloodRequests: []};
        case ActionTypes.ADD_BLOOD_REQUESTS:
            return {...state, isLoading: false, errMess: null, bloodRequests: action.payload};

        case ActionTypes.BLOOD_REQUESTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, bloodRequests: []};

        case ActionTypes.ADD_BLOOD_REQUEST:
            var bloodRequest = action.payload;
            return {...state, bloodRequests: state.bloodRequests.concat(bloodRequest)};

        default:
            return state;
    }
}