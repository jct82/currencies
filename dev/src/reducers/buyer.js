import { CHANGE_FIELD, ADD_CUR, REMOVE_CUR, DISPLAY_MODAL, LOG_USER } from "src/actions/buyer";

const initialState = {
  id: 1,
  name:'jim',
  firstName:'',
  email:'',
  password: '',
  confirmPassword: '',
  wallet:[],
  money: 10000,
  connect: false,
  logModal: 'off',
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
        console.log(action.mode);
        return{
          ...state,
          logModal: action.mode,
        }
      }
      case REMOVE_CUR :{
        let newWallet = state.wallet;
        
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
          money: state.money + (action.inverseRate * action.quantity),
        }
      }
      case ADD_CUR :{
        let newWallet = state.wallet;
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
            sell:[{amount: action.quantity, date: new Date()}],
          });
        };
          console.log('newWallet', newWallet);
        return{
          ...state,
          wallet: newWallet,
          money: state.money - (action.inverseRate * action.quantity),
        }
      }
      default:
          return state;
    }
};

export default reducer;
