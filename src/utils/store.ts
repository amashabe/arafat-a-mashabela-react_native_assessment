import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk)); //TODO: check for latest version

export default store;
