import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './services/auth_service';

const baseURL = process.env.REACT_APP_BASE_URL;
const root = ReactDOM.createRoot(document.getElementById('root'));
const authService = new AuthService(baseURL);

root.render(
  <BrowserRouter>
    <App authService={authService} />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
