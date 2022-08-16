import styles from './App.module.css';
import MainPage from './routers/MainPage.jsx';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './routers/LoginPage';
import SignUpPage from './routers/SignupPage';
import AddressPage from './routers/AddressPage';
import AddressResult from './components/addressResult';

function App({ authService }) {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route
          path='/login'
          element={<LoginPage authService={authService} />}
        ></Route>
        <Route
          path='/signup'
          element={<SignUpPage authService={authService} />}
        ></Route>
        <Route
          path='/address/shipping-address'
          element={<AddressPage />}
        ></Route>
        <Route
          path='/address/shipping-address/result'
          element={<AddressResult />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
