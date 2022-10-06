import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './services/auth_service';
import MyKurlyService from './services/mykurly_service';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const baseURL = process.env.REACT_APP_BASE_URL;
const root = ReactDOM.createRoot(document.getElementById('root'));
const authService = new AuthService(baseURL);
const mykurlyService = new MyKurlyService(baseURL);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App authService={authService} mykurlyService={mykurlyService} />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
