import * as actions from '../actions/actionTypes';

const initialState = {
  token: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
      };
    case actions.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    case actions.IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};

export default reducer;
