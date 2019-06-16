import * as actions from '../actions/actionTypes';

const initialState = {
  financeList: {},
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
        financeList: action.financeList,
      };

    default:
      return state;
  }
};

export default reducer;
