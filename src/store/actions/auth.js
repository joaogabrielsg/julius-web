import * as actions from './actionTypes';
import axios from '../../config/axiosInstance';

export const authSuccess = token => ({
  type: actions.AUTH_SUCCESS,
  token,
});

export const auth = (code, password) => dispatch =>
  axios
    .post('/login', { code, password })
    .then(response => {
      localStorage.setItem('token', response.data.access_token);
      dispatch(authSuccess(response.data.access_token));
      return Promise.resolve();
    })
    .catch(error => {
      return Promise.reject();
    });

export const logoutSuccess = () => ({
  type: actions.AUTH_LOGOUT,
});

export const logout = () => (dispatch, getState) =>
  axios
    .post(
      '/logout',
      {},
      {
        headers: { Authorization: `Bearer ${getState().auth.token}` },
      }
    )
    .then(() => {
      localStorage.removeItem('token');
      dispatch(logoutSuccess());
      return Promise.resolve();
    })
    .catch(() => {
      return Promise.reject();
    });

export const checkAuth = () => dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(authSuccess(token));
  } else {
    dispatch(logoutSuccess());
  }
};
