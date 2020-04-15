import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducers from './redux/reducers';

export default createStore(allReducers, composeWithDevTools(applyMiddleware(logger, thunk)));
