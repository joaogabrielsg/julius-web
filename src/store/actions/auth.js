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
      dispatch(authSuccess(response.data.access_token));
      return Promise.resolve();
    })
    .catch(error => {
      return Promise.reject();
    });
