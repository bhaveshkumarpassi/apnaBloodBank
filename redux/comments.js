import * as ActionTypes from './ActionTypes';

export const comments = (state = {
        errMess: null,
        comments: []
    }, action) => {
    switch(action.type) {
            
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments: []};

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};

        case ActionTypes.DELETE_COMMENT: 
            var commentId = action.payload;
            var index = state.comments.indexOf(state.comments.filter(comment => comment._id === commentId)[0]);
            state.comments.splice(index, 1);
            return {...state, comments: state.comments}
        default:
            return state;
    }
}