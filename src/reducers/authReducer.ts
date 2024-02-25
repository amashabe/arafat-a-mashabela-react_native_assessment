import { AnyAction } from 'redux';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  spinner: false,
  error: null
};

const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: action.payload !== null, };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_SPINNER':
      return { ...state, spinner: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state;
  }
};

export default authReducer;