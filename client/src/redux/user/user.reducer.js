import {UserActionTypes} from "./user.types";


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null
}


const userReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UserActionTypes.USER_LOADED:
          case UserActionTypes.USER_IMAGE_UPDATED:
          return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
          };
        case UserActionTypes.REGISTER_SUCCESS:
        case UserActionTypes.LOGIN_SUCCESS:
          localStorage.setItem('token', payload.token);
          return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
          };
        case UserActionTypes.REGISTER_FAIL:
        case UserActionTypes.AUTH_ERROR:
        case UserActionTypes.LOGIN_FAIL:
        case UserActionTypes.LOGOUT:
        case UserActionTypes.ACCOUNT_DELETED:
          case UserActionTypes.USER_ERROR:
          localStorage.removeItem('token');
          return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
          };
        default:
          return state;
    }
}

export default userReducer