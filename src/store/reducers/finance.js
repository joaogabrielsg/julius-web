import * as actions from '../actions/actionTypes';

const initialState = {
  financesList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_NEW_FINANCE_SUCCESS:
      return {
        ...state,
      };
    case actions.GET_FINANCES_LIST_SUCCESS:
      return {
        ...state,
        financesList: action.financesList,
      };

    default:
      return state;
  }
};

export default reducer;
