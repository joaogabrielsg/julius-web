import * as actions from '../actions/actionTypes';

const initialState = {
  goalsList: {},
  userProgress: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_NEW_GOAL_SUCCESS:
      return {
        ...state,
      };
    case actions.GET_GOALS_LIST_SUCCESS:
      return {
        ...state,
        goalsList: action.goalsList,
      };
    case actions.GET_USER_PROGRESS_SUCCESS:
      return {
        ...state,
        userProgress: action.userProgress,
      };

    default:
      return state;
  }
};

export default reducer;
