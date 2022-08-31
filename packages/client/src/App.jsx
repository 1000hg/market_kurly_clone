import styles from "./App.module.css";
import MainPage from "./routers/MainPage.jsx";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./routers/LoginPage";
import SignUpPage from "./routers/SignupPage";
import AddressPage from "./routers/AddressPage";
import AddressResult from "./components/addressResult";
import FindIdPage from "./routers/FindIdPage";
import FindPwdPage from "./routers/FindPwdPage";
import FindIdConfirmPage from "./routers/FindIdConfirmPage";
import PwdRePage from "./routers/PwdRePage";
import PwdRemailPage from "./routers/PwdRemailPage";
import MyCurlyPage from "./routers/MyCurlyPage";
import MainHeader from "./components/mainHeader";
import MainFooter from "./components/mainFooter";

function App({ authService }) {
  return (
    <div className={styles.app}>
      <MainHeader />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route
          path="/login"
          element={<LoginPage authService={authService} />}
        ></Route>
        <Route path="/login/findId" element={<FindIdPage />}></Route>
        <Route path="/login/findPwd" element={<FindPwdPage />}></Route>
        <Route
          path="/login/findIdConfirm"
          element={<FindIdConfirmPage />}
        ></Route>
        <Route path="/login/pwdRePage" element={<PwdRePage />}></Route>

        <Route path="/login/pwdRemail" element={<PwdRemailPage />}></Route>
        <Route
          path="/signup"
          element={<SignUpPage authService={authService} />}
        ></Route>
        <Route path="/mycurly/order-history" element={<MyCurlyPage />}></Route>
        <Route
          path="/address/shipping-address"
          element={<AddressPage />}
        ></Route>
        <Route
          path="/address/shipping-address/result"
          element={<AddressResult />}
        ></Route>
      </Routes>
      <MainFooter />
    </div>
  );
}

export default App;
