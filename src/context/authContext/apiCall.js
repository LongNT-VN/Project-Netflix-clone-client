import {axiosInstance } from  '../../config.js';
import { loginFailure, loginStart, loginSuccess, logout } from './AuthAction';

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post('auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
}

export const logoutfunc = async (dispatch) => {
  try {
    dispatch(logout());
  } catch (error) {
    console.error(error)
  }
}



