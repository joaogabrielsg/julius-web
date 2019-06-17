import moment from 'moment';

import * as actions from './actionTypes';
import axios from '../../config/axiosInstance';

import { isLoading } from './auth';

export const createNewFinanceSuccess = () => ({
  type: actions.CREATE_NEW_FINANCE_SUCCESS,
});

export const createNewFinance = (id, title, value) => (dispatch, getState) => {
  console.log('Valores');
  console.log(title);
  console.log(value);
  dispatch(isLoading(true));
  return axios
    .post(
      `/goals/${id}/finances`,
      {
        id,
        insertAt: moment().toISOString(),
        title,
        value,
      },
      {
        headers: { Authorization: `Bearer ${getState().auth.token}` },
      }
    )
    .then(response => {
      console.log(response);
      dispatch(isLoading(false));
      dispatch(createNewFinanceSuccess());
      return Promise.resolve(response);
    })
    .catch(error => {
      dispatch(isLoading(false));
      console.log(error);
      return Promise.reject(error);
    });
};

export const getFinancesSuccess = financesList => ({
  type: actions.GET_FINANCES_LIST_SUCCESS,
  financesList,
});

export const getFinances = () => (dispatch, getState) =>
  axios
    .get('/finances', {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    })
    .then(response => {
      dispatch(getFinancesSuccess(response.data));
      return Promise.resolve();
    })
    .catch(error => {
      console.log(error);
      return Promise.reject();
    });

export const deleteFinancesSuccess = financeId => ({
  type: actions.DELETE_FINANCES_SUCCESS,
  financeId,
});

export const deleteFinances = (goalId, financeId) => (dispatch, getState) =>
  axios
    .delete(`/goals/${goalId}/finances/${financeId}`, {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    })
    .then(response => {
      dispatch(deleteFinancesSuccess(financeId));
      return Promise.resolve();
    })
    .catch(error => {
      console.log(error);
      return Promise.reject();
    });
