import {CommentActionTypes} from "./comment.types";



const initialState = {
    comments: [],
    loading: true,
    error: {}
}

const commentReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
            case CommentActionTypes.GET_SINGLE_POST_COMMENTS:
                return {
                    ...state,
                    comments: payload,
                    loading: false
                }
            case CommentActionTypes.ADD_COMMENT:
                return {
                    ...state,
                    comments: [payload, ...state.comments],
                    loading: false
                }
            case CommentActionTypes.DELETE_COMMENT:
                return {
                    ...state,
                    comments: state.comments.filter(comment => comment._id !== payload),
                    loading: false
                }
            case CommentActionTypes.COMMENT_ERROR:
                return {
                    ...state,
                    error: payload,
                    loading: false
                }
        default:
            return state;
    }
}

export default commentReducer