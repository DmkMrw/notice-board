import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.scss';
import App from './App';
import './styles/normalize.scss';
import './styles/global.scss';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>

  </>
);

