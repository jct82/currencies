import axios from 'axios';
import { LOG_USER, ADD_USER, connect } from '../actions/buyer';

const API = axios.create({ baseURL: 'https://mockend.com/jct82/currencies/users' });

const buyerMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case LOG_USER: {
      const config = {
        method: 'get',
        url: '',
      };
      API(config)
        .then((response) => {
          console.log('response GET récupère les users',response)
          if (response.status === 200) {
            store.dispatch(connect());
          }
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    case ADD_USER: {
      const { name, email, password } = state.buyer;

      const userData = `{"name": ${name}, "email": ${email},"password": ${password}}`;

      const config = {
        method: 'post',
        url: '/',
        data: userData,
        headers: { 'Content-Type': 'application/json' },
      };
      API(config)
        .then((response) => {
          console.log('response POST add user',response)
          if (response.status === 200) {
            store.dispatch(connect());
          }
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default buyerMiddleware;
