export const ADD_COURB = 'ADD_COURB';
export const SET_PERIOD = 'CHANGE_PERIOD';
export const SUP_CUR = 'SUP_CUR';

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
