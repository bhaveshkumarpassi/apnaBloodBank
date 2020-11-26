import * as ActionTypes from './ActionTypes';

export const likes = (state = {
        errMess: null,
        likes: []
    }, action) => {
    switch(action.type) {
            
        case ActionTypes.ADD_LIKES:
            return {...state, isLoading: false, errMess: null, likes: action.payload};

        case ActionTypes.LIKES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, likes: []};

        case ActionTypes.ADD_LIKE:
            var like = action.payload;
            return {...state, likes: state.likes.concat(like)};
        case ActionTypes.DELETE_LIKE: 
            var likeId = action.payload;
            var index = state.likes.indexOf(state.likes.filter(like => like._id === likeId)[0]);
            state.likes.splice(index, 1);
            return {...state, likes: state.likes}
        default:
            return state;
    }
}