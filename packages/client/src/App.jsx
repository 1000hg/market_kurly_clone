import './App.css';
import MainPage from './routers/MainPage.jsx';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './routers/LoginPage';
import SignUpPage from './routers/SignupPage';

function App({ authService }) {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route
          path='/signup'
          element={<SignUpPage authService={authService} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
