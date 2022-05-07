import { CHANGE_FIELD, ADD_CUR, REMOVE_CUR, DISPLAY_MODAL, CONNECT, POSTER_DISCO, ORDER_CURRENCIES } from "src/actions/buyer";
import { getColor } from "../utils/methods";

const initialState = {
  id: 1,
  name:'john',
  email:'',
  password: '',
  confirmPassword: '',
  wallet:[],
  sortedDir: 'up',
  connected: false,
  logModal: 'off',
  amount: 0,
  discoBtn: false,
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case CONNECT :{
        return{
          ...state,
          logModal: 'off',
          email: state.connected == true ? '' : state.email,
          password: state.connected == true ? '' : state.password,
          confirmPassword: state.connected == true ? '' : state.confirmPassword,
          wallet: state.connected == true ? [] : state.wallet,
          connected: !state.connected,
        }
      }
      case POSTER_DISCO :{
        return{
          ...state,
          discoBtn: !state.discoBtn,
        }
      }
      case CHANGE_FIELD :{
        return{
          ...state,
          [action.name]: action.value,
        }
      }
      case DISPLAY_MODAL :{
        return{
          ...state,
          logModal: action.mode,
        }
      }
      case REMOVE_CUR :{
        let newWallet = state.wallet;
        let newAmount = state.amount;
        
        for (let i = 0; i < newWallet.length; i++) {
          if (newWallet[i].name == action.name) {
            newWallet[i].quantity -= action.quantity;
            newWallet[i].sell.push({amount: newWallet[i].quantity, date: new Date()});
            if (newWallet[i].quantity == 0) newWallet.splice(i, 1);
            break;
          }
        }
        
        return{
          ...state,
          wallet: newWallet,
          amount : newAmount -= (action.inverseRate * action.quantity),
        }
      }
      case ADD_CUR :{
        let newWallet = state.wallet;
        let newAmount = state.amount;
        let hasCur = false;
        
        for (let i = 0; i < newWallet.length; i++) {
          if (newWallet[i].name === action.name) {
            newWallet[i].quantity += action.quantity;
            newWallet[i].sell.push({amount: newWallet[i].quantity, date: new Date()});
            hasCur = true;
            break;
          }
        }

        if (hasCur == false) {
          newWallet.push({
            name : action.name, 
            rate : action.rate, 
            inverseRate : action.inverseRate ,
            quantity: action.quantity,
            color: getColor(),
            sell:[{amount: action.quantity, date: new Date()}],
          });
        }
        return{
          ...state,
          wallet: newWallet,
          amount : newAmount += (action.inverseRate * action.quantity),
        }
      }
      case ORDER_CURRENCIES :{
        let newWallet = [...state.wallet].map(elem => ({...elem}));
        newWallet.sort((a, b) => {
          if (a[action.prop] > b[action.prop]) return state.sortedDir === 'up' ? 1 : -1;
          if (a[action.prop] < b[action.prop]) return state.sortedDir === 'up' ? -1 : 1;
          return 0;
        });
        return{
          ...state,
          wallet: newWallet,
          sortedDir: state.sortedDir === 'up' ? 'down' : 'up',
        }
      }
      default:
          return state;
    }
};

export default reducer;
