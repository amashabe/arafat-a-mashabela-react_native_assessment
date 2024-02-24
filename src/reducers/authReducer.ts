import { AnyAction } from 'redux';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state;
  }
};

export default authReducer;
