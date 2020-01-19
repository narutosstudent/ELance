import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import alertReducer from "./alert/alert.reducer";
import profileReducer from "./profile/profile.reducer";

export default combineReducers({
  user: userReducer,
  alert: alertReducer,
  profile: profileReducer
});