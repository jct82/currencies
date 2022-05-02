import { ADD_COURB, SET_PERIOD, SUP_CUR } from "src/actions/currency";

const initialState = {
    currencyCourbs: [],
    period: 7,
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case ADD_COURB :{
        let newCurrencyCourbs = [...state.currencyCourbs];
        if (typeof newCurrencyCourbs.find(elem => elem.id == action.courb.id) == 'undefined') {
          newCurrencyCourbs.push(action.courb);
        }
        return{
          ...state,
          currencyCourbs: newCurrencyCourbs,
        }
      }
      case SET_PERIOD :{
        return{
          ...state,
          period: action.period,
        }
      }
      case SUP_CUR :{
        let newCurrencyCourbs = [...state.currencyCourbs];
        for (let i = 0; i < newCurrencyCourbs.length; i++) {
          if (newCurrencyCourbs[i].id == action.id) {
            newCurrencyCourbs.splice(i, 1);
            break;
          }
        }
        return{
          ...state,
          currencyCourbs: newCurrencyCourbs,
        }
      }
      default:
          return state;
    }
};

export default reducer;
