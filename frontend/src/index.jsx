import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import axios from 'axios'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from 'reducers'

const store = createStore(rootReducer)

axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND_HOST}/api`;

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
