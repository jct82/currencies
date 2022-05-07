export const ADD_COURB = 'ADD_COURB';
export const SET_PERIOD = 'CHANGE_PERIOD';
export const SUP_CUR = 'SUP_CUR';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const ORDER_CURRENCIES = 'ORDER_CURRENCIES';
export const ORDER_PROGRESS = 'ORDER_PROGRESS';

export const addCourb = (courb) => ({
  type: ADD_COURB,
  courb: courb,
});

export const setPeriod = (period) => ({
  type: SET_PERIOD,
  period: period,
});

export const supCur = (id) => ({
  type: SUP_CUR,
  id: id,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies: currencies,
});

export const orderCurrencies = (prop) => ({
  type: ORDER_CURRENCIES,
  prop: prop,
});

export const orderProgress = (period) => ({
  type: ORDER_PROGRESS,
  period: period,
});

