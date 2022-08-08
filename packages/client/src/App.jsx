import './App.css';
import MainPage from './routers/MainPage.jsx';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './routers/LoginPage';
import SignUpPage from './routers/SignupPage';
import AddressPage from './routers/AddressPage';

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
        <Route path='/address/shipping-address' element={<AddressPage />} />
      </Routes>
    </div>
  );
}

export default App;
