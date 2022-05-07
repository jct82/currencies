import { ADD_COURB, SET_PERIOD, SUP_CUR, SET_CURRENCIES, ORDER_CURRENCIES, ORDER_PROGRESS } from "src/actions/currency";

const initialState = {
    currencies: [],
    currencyCourbs: [],
    period: 7,
    dortedDir: 'up',
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case ADD_COURB :{
        let newCurrencyCourbs = [...state.currencyCourbs];
        if (typeof newCurrencyCourbs.find(elem => elem.id == action.courb.id) == 'undefined') {
          newCurrencyCourbs.push(action.courb);
          let newCurrencies = [...state.currencies].map(elem => ({...elem}));
          for (let i = 0; i < newCurrencies.length; i++) {
            if (newCurrencies[i].name == action.courb.id) {
              newCurrencies[i].on = true;
              break;
            }
          }
          return{
            ...state,
            currencies: newCurrencies,
            currencyCourbs: newCurrencyCourbs,
          }
        }
        return state;
      }
      case SET_PERIOD :{
        return{
          ...state,
          period: action.period,
        }
      }
      case SET_CURRENCIES :{
        return{
          ...state,
          currencies: action.currencies,
        }
      }
      case ORDER_CURRENCIES :{
        let newCurrencies = [...state.currencies].map(elem => ({...elem}));
        newCurrencies.sort((a, b) => {
          if (a[action.prop] > b[action.prop]) return state.sortedDir === 'up' ? 1 : -1;
          if (a[action.prop] < b[action.prop]) return state.sortedDir === 'up' ? -1 : 1;
          return 0;
        });
        return{
          ...state,
          currencies: newCurrencies,
          sortedDir: state.sortedDir === 'up' ? 'down' : 'up',
        }
      }
      case ORDER_PROGRESS :{
        let newCurrencies = [...state.currencies].map(elem => ({...elem}));
        newCurrencies.sort((a, b) => {
          let progressA = a.inverseRate * 100 / a.history[7 - action.period].inverseRate;
          let progressB = b.inverseRate * 100 / b.history[7 - action.period].inverseRate;
          if (progressA > progressB) return state.sortedDir === 'up' ? 1 : -1;
          if (progressA < progressB) return state.sortedDir === 'up' ? -1 : 1;
          return 0;
        });
        return{
          ...state,
          currencies: newCurrencies,
          sortedDir: state.sortedDir === 'up' ? 'down' : 'up',
        }
      }
      case SUP_CUR :{
        let newCurrencyCourbs = [...state.currencyCourbs];
        let newCurrencies = [...state.currencies].map(elem => ({...elem}));
        for (let i = 0; i < newCurrencyCourbs.length; i++) {
          if (newCurrencyCourbs[i].id == action.id) {
            newCurrencyCourbs.splice(i, 1);
            for (let j = 0; j < newCurrencies.length; j++) {
              if (newCurrencies[j].name === action.id) {
                newCurrencies[j] = {
                  code: newCurrencies[j].code,
                  name: newCurrencies[j].name,
                  rate: newCurrencies[j].rate,
                  inverseRate: newCurrencies[j].inverseRate,
                  date: newCurrencies[j].date,
                  history: newCurrencies[j].history,
                }
                break;
              }
            }
            break;
          }
        }
        return{
          ...state,
          currencies: newCurrencies,
          currencyCourbs: newCurrencyCourbs,
        }
      }
      default:
          return state;
    }
};

export default reducer;
