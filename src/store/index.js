import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import { loadState, saveState } from './localStorage';
import { throttle } from '../Utils';

const logger = createLogger({ collapsed: true });

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store;
