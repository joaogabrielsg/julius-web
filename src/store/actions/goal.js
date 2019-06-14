import moment from 'moment';

import * as actions from './actionTypes';
import axios from '../../config/axiosInstance';

export const createNewGoalSuccess = newGoal => ({
  type: actions.CREATE_NEW_GOAL_SUCCESS,
  newGoal,
});

export const createNewGoal = (finishDate, title, totalValue) => (dispatch, getState) =>
  axios
    .post(
      '/goals',
      {
        finishDate: moment(finishDate, 'DD/MM/YYYY').format(),
        startDate: moment().format(),
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
      dispatch(createNewGoalSuccess(response.data));
      return Promise.resolve();
    })
    .catch(error => {
      console.log(error);
      return Promise.reject();
    });
