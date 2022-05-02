import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './../reducers';
import buyerMiddleware from './../middlewares/buyerMiddleware';

const composeEnhancers = window.__REDUC_DEVTOOLS_EXTENSION_COMPOSE || compose;

const enhancers = composeEnhancers(
  applyMiddleware(buyerMiddleware),
);

const store = createStore(reducers, enhancers);

export default store;
