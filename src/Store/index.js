import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import * as reducers from './Reducers';
import apiMiddleware from './apiMiddleware';
import logMiddleware from './logMiddleware';

const rootReducer = combineReducers(reducers);

const store = createStore(
    rootReducer,
    applyMiddleware(logMiddleware, apiMiddleware)
);

window.store = store;

export default store;
