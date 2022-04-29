export const CHANGE_FIELD = 'CHANGE_FIELD';
export const ADD_CUR = 'ADD_CUR';
export const REMOVE_CUR = 'REMOVE_CUR';
export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const LOG_USER = 'LOG_USER';

export const changeField = (name, value) => ({
  type: CHANGE_FIELD,
  name: name,
  value: value,
});

export const addCur = (name, rate, inverseRate, quantity) => ({
  type: ADD_CUR,
  name: name,
  rate: rate,
  inverseRate: inverseRate,
  quantity: quantity,
});

export const removeCur = (name, rate, inverseRate, quantity) => ({
  type: REMOVE_CUR,
  name: name,
  rate: rate,
  inverseRate: inverseRate,
  quantity: quantity,
});

export const displayModal = (mode) => ({
  type: DISPLAY_MODAL,
  mode: mode,
});

export const logUser = () => ({
  type: LOG_USER,
});
