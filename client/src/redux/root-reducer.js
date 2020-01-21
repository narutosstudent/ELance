import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import alertReducer from "./alert/alert.reducer";
import profileReducer from "./profile/profile.reducer";
import postReducer from "./post/post.reducer";
import commentReducer from './comment/comment.reducer';

export default combineReducers({
  auth: userReducer,
  alert: alertReducer,
  profile: profileReducer,
  post: postReducer,
  comment: commentReducer
});