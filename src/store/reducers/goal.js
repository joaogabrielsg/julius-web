import * as actions from '../actions/actionTypes';

const initialState = {
  goalsList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_NEW_GOAL_SUCCESS:
      return {
        ...state,
        goalsList: state.goalsList.concat(action.newGoal),
      };
    case actions.GET_GOALS_LIST_SUCCESS:
      return {
        ...state,
        goalsList: action.goalsList,
      };

    default:
      return state;
  }
};

export default reducer;
