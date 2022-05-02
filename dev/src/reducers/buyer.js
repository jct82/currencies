import { CHANGE_FIELD, ADD_CUR, REMOVE_CUR, DISPLAY_MODAL, LOG_USER } from "src/actions/buyer";
import { getColor } from "../utils/methods";

const initialState = {
  id: 1,
  name:'',
  firstName:'',
  email:'',
  password: '',
  confirmPassword: '',
  wallet:[],
  connect: false,
  logModal: 'off',
  amount: 0,
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case LOG_USER :{
        return{
          ...state,
          connect: true,
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
          if (newWallet[i].name == action.name) {
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
        };
        
        return{
          ...state,
          wallet: newWallet,
          amount : newAmount += (action.inverseRate * action.quantity),
        }
      }
      default:
          return state;
    }
};

export default reducer;
