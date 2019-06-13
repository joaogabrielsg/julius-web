import * as actions from '../actions/actionTypes';

const initialState = {
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};

export default reducer;
