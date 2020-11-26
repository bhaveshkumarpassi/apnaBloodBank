import * as ActionTypes from './ActionTypes';

export const posts = (state = {
        isLoading: true,
        errMess: null,
        posts: []
    }, action) => {
    switch(action.type) {
        
        case ActionTypes.POSTS_LOADING:
            return {...state, isLoading: true, errMess: null, posts: []};
            
        case ActionTypes.ADD_POSTS:
            return {...state, isLoading: false, errMess: null, posts: action.payload};

        case ActionTypes.POSTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, posts: []};

        case ActionTypes.ADD_POST:
            var post = action.payload;
            return {...state, posts: state.posts.concat(post)};

        case ActionTypes.DELETE_POST: 
            var postId = action.payload;
            var index = state.posts.indexOf(state.posts.filter(post => post._id === postId)[0]);
            state.posts.splice(index, 1);
            return {...state, posts: state.posts}

        default:
            return state;
    }
}