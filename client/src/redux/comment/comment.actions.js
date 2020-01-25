import axios from "axios";
import {setAlert} from "../alert/alert.actions"
import {CommentActionTypes} from "./comment.types"


// Get Comments For a Single Post
export const getSinglePostComments = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/comments/${id}`);

    dispatch({
      type: CommentActionTypes.GET_SINGLE_POST_COMMENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CommentActionTypes.COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



  // Add Comment
  export const addComment = (postId, formData) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        dispatch({
          type: CommentActionTypes.ADD_COMMENT,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: CommentActionTypes.COMMENT_ERROR,
          payload: { msg: err.message, status: err.response.status }
        });
      }
  }

  // Update Comment
    export const updateComment = (text, id) => async dispatch => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const body = JSON.stringify({text})
  
      try {
        const res = await axios.put(`/api/posts/comments/${id}`, body, config)
  
        dispatch({
          type: CommentActionTypes.UPDATE_COMMENT,
          payload: {text, id}
        });
        setAlert("Comment Updated", "success");
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
      dispatch({
        type: CommentActionTypes.COMMENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
      }
    }

 // Delete comment
export const deleteComment = (commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${commentId}`);

    dispatch({
      type: CommentActionTypes.DELETE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CommentActionTypes.COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};  

