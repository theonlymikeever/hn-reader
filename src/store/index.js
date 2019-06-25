import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const logger = createLogger({ collapsed: true });

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
