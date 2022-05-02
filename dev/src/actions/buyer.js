export const CHANGE_FIELD = 'CHANGE_FIELD';
export const ADD_CUR = 'ADD_CUR';
export const REMOVE_CUR = 'REMOVE_CUR';
export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const LOG_USER = 'LOG_USER';
export const ADD_USER = 'ADD_USER';
export const CONNECT = 'CONNECT';
export const POSTER_DISCO = 'POSTER_DISCO';

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

export const addUser = () => ({
  type: ADD_USER,
});

export const connect = () => ({
  type: CONNECT,
});

export const posterDisco = () => ({
  type: POSTER_DISCO,
});
