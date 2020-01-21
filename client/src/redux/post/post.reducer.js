import {PostActionTypes} from "./post.types";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

const postReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
        case PostActionTypes.GET_POSTS:
            return {
              ...state,
              posts: payload,
              loading: false
            };
          case PostActionTypes.GET_POST:
            return {
              ...state,
              post: payload,
              loading: false
            };
          case PostActionTypes.ADD_POST:
            return {
              ...state,
              posts: [payload, ...state.posts],
              loading: false
            };
          case PostActionTypes.DELETE_POST:
            return {
              ...state,
              posts: state.posts.filter(post => post._id !== payload),
              loading: false
            };
          case PostActionTypes.POST_ERROR:
            return {
              ...state,
              error: payload,
              loading: false
            };
          case PostActionTypes.LIKE_POST:
            return {
              ...state,
              posts: state.posts.map(post =>
                post._id === payload.id ? { ...post, likes: payload.likes } : post
              ),
              loading: false
            };
            case PostActionTypes.DISLIKE_POST:
                return {
                  ...state,
                  posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, dislikes: payload.dislikes } : post
                  ),
                  loading: false
                };
        default:
            return state;
    }
}

export default postReducer;