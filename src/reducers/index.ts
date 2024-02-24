import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ticketReducer from './ticketReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  ticket: ticketReducer
});

export default rootReducer;
