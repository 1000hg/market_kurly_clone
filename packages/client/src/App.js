import './App.css';
import MainPage from './routers/MainPage.js';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './routers/LoginPage';
import SignUpPage from './routers/signupPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignUpPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
