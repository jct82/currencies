import React from 'react';
import { render } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

const reactRootElement = (
    <Provider store = {store}>
      <App />
    </Provider>
);

const target = document.getElementById('root');

render(reactRootElement, target);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
