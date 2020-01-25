import axios from "axios";
import {setAlert} from "../alert/alert.actions";
import {PostActionTypes} from "./post.types";


// Get posts
export const getPosts = (page) => async dispatch => {
    try {
      const res = await axios.get(`/api/posts?page=${page}`);
  
      dispatch({
        type: PostActionTypes.GET_POSTS,
        payload: {posts: res.data.posts, totalItems: res.data.totalItems}
      });
    } catch (err) {
      dispatch({
        type: PostActionTypes.POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Add post
export const addPost = formData => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post('/api/posts', formData, config);
  
      dispatch({
        type: PostActionTypes.ADD_POST,
        payload: res.data
      });
  
      dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
      dispatch({
        type: PostActionTypes.POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Get post
export const getPost = id => async dispatch => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
  
      dispatch({
        type: PostActionTypes.GET_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PostActionTypes.POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Add like
export const likePost = id => async dispatch => {
    try {
      const res = await axios.put(`/api/posts/like/${id}`);
  
      dispatch({
        type: PostActionTypes.LIKE_POST,
        payload: { id, likes: res.data }
      });
    } catch (err) {
        const errors = err.response.data.errors;
  
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
      dispatch({
        type: PostActionTypes.POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


  // Add dislike
export const dislikePost = id => async dispatch => {
    try {
      const res = await axios.put(`/api/posts/dislike/${id}`);
  
      dispatch({
        type: PostActionTypes.DISLIKE_POST,
        payload: { id, dislikes: res.data }
      });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
      dispatch({
        type: PostActionTypes.POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // update post
  export const updatePost = (text, id) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({text})

    try {
      const res = await axios.put(`/api/posts/${id}`, body, config)

      dispatch({
        type: PostActionTypes.UPDATE_POST,
        payload: {text, id}
      })
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    }
  }

// Delete post
export const deletePost = id => async dispatch => {
    try {
      await axios.delete(`/api/posts/${id}`);
  
      dispatch({
        type: PostActionTypes.DELETE_POST,
        payload: id
      });
  
      dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PostActionTypes.POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };  
  