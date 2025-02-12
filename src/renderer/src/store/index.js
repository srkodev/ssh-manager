import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import connectionReducer from './reducers/connectionReducer';

const rootReducer = combineReducers({
  connections: connectionReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
