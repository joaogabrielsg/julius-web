import * as actions from './actionTypes';
import axios from '../../config/axiosInstance';

import { getGoals } from './goal';

export const authSuccess = token => ({
  type: actions.AUTH_SUCCESS,
  token,
});

export const auth = (code, password) => async dispatch => {
  dispatch(isLoading(true));
  try {
    const response = await axios.post('/login', { code, password });
    localStorage.setItem('token', response.data.access_token);
    dispatch(authSuccess(response.data.access_token));

    const responseGoals = await dispatch(getGoals());
    dispatch(isLoading(false));
    return Promise.resolve(responseGoals.data);
  } catch (error) {
    dispatch(isLoading(false));
    return Promise.reject(error);
  }
};

export const logoutSuccess = () => ({
  type: actions.AUTH_LOGOUT,
});

export const logout = () => (dispatch, getState) => {
  dispatch(isLoading(true));
  return axios
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
      dispatch(isLoading(false));
      return Promise.resolve();
    })
    .catch(() => {
      dispatch(isLoading(false));
      return Promise.reject();
    });
};

export const checkAuth = () => dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(authSuccess(token));
  } else {
    dispatch(logoutSuccess());
  }
};

export const isLoading = isLoading => ({
  type: actions.IS_LOADING,
  isLoading,
});
