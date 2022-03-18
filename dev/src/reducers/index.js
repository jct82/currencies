import { combineReducers } from "redux";

import buyerReducer from './buyer';
import currencyReducer from './currency';
import equityReducer from './equity';


const rootReducer = combineReducers({
    buyer:buyerReducer,
    currency:currencyReducer,
    equity:equityReducer,
});

export default rootReducer;