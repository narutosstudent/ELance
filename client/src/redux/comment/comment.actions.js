import axios from "axios";
import {setAlert} from "../alert/alert.actions"
import {CommentActionTypes} from "./comment.types"


// Get Comments
export const getComments = id => async dispatch => {
    try {
      const res = await axios.get(`/api/posts/comments/${id}`);
  
      dispatch({
        type: CommentActionTypes.GET_COMMENTS,
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
  export const addComment = (text, postId) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ text });

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, body, config);
    
        dispatch({
          type: CommentActionTypes.ADD_COMMENT,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: CommentActionTypes.COMMENT_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
  }

 // Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`api/posts/comment/${postId}/${commentId}`);

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

