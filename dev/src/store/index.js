import { createStore, compose } from 'redux';

import reducers from './../reducers';

const composeEnhancers = window.__REDUC_DEVTOOLS_EXTENSION_COMPOSE || compose;

const enhancers = composeEnhancers();

const store = createStore(reducers, enhancers);

export default store;