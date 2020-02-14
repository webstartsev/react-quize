import axios from 'axios';
import { FIREBASE_API_KEY } from '../../secret';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export default function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem(`idToken`, data.idToken);
    localStorage.setItem(`userId`, data.localId);
    localStorage.setItem(`expirationDate`, expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn * 1000));
  };
}

const autoLogout = time => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time);
  };
};

export const logout = () => {
  localStorage.removeItem(`idToken`);
  localStorage.removeItem(`userId`);
  localStorage.removeItem(`expirationDate`);

  return {
    type: AUTH_LOGOUT
  };
};

const authSuccess = token => {
  return {
    type: AUTH_SUCCESS,
    token
  };
};
