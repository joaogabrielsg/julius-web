import moment from 'moment';

import * as actions from './actionTypes';
import axios from '../../config/axiosInstance';

import { isLoading } from './auth';

export const createNewGoalSuccess = () => ({
  type: actions.CREATE_NEW_GOAL_SUCCESS,
});

export const createNewGoal = (finishDate, title, totalValue) => (dispatch, getState) => {
  dispatch(isLoading(true));
  return axios
    .post(
      '/goals',
      {
        finishDate: moment(finishDate, 'DD/MM/YYYY').toISOString(),
        startDate: moment().toISOString(),
        title,
        totalValue,
        id: 0,
        closed: false,
        currentValue: 0,
        wasReached: true,
      },
      {
        headers: { Authorization: `Bearer ${getState().auth.token}` },
      }
    )
    .then(response => {
      dispatch(isLoading(false));
      dispatch(createNewGoalSuccess(response));
      return Promise.resolve(response);
    })
    .catch(error => {
      dispatch(isLoading(false));
      console.log(error);
      return Promise.reject(error);
    });
};

export const getGoalsSuccess = goalsList => ({
  type: actions.GET_GOALS_LIST_SUCCESS,
  goalsList,
});

export const getGoals = () => (dispatch, getState) =>
  axios
    .get('/goals', {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    })
    .then(response => {
      dispatch(getGoalsSuccess(response.data));
      return Promise.resolve(response);
    })
    .catch(error => {
      console.log(error);
      return Promise.reject();
    });

export const getUserProgressSuccess = userProgress => ({
  type: actions.GET_USER_PROGRESS_SUCCESS,
  userProgress,
});

export const getUserProgress = () => (dispatch, getState) =>
  axios
    .get('/user-progress', {
      headers: { Authorization: `Bearer ${getState().auth.token}` },
    })
    .then(response => {
      dispatch(getUserProgressSuccess(response.data));
      return Promise.resolve(response);
    })
    .catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
