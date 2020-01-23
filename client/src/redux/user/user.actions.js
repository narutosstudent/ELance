import axios from "axios";
import {setAlert} from "../alert/alert.actions"
import {ProfileActionTypes} from "../profile/profile.types"
import {UserActionTypes} from "./user.types"
import setAuthToken from "../../utils/setAuthToken"

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.get('/api/auth');
  
      dispatch({
        type: UserActionTypes.USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UserActionTypes.AUTH_ERROR
      });
    }
  };

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ name, email, password });
  
    try {
      const res = await axios.post('/api/users', body, config);
  
      dispatch({
        type: UserActionTypes.REGISTER_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: UserActionTypes.REGISTER_FAIL
      });
    }
  };

  export const updateUserImage = (image) => async dispatch => {
    const formData = new FormData();
    formData.append("image", image)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    try {
      const res = await axios.post("/api/users/avatar", formData, config);


      dispatch({
        type: UserActionTypes.USER_IMAGE_UPDATED,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: UserActionTypes.USER_ERROR
      });
    }


  }


  // Login User
export const login = (email, password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ email, password });
  
    try {
      const res = await axios.post('/api/auth', body, config);
  
      dispatch({
        type: UserActionTypes.LOGIN_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: UserActionTypes.LOGIN_FAIL
      });
    }
  };

  // Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: ProfileActionTypes.CLEAR_PROFILE });
    dispatch({ type: UserActionTypes.LOGOUT });
  };