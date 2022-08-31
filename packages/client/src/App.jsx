import styles from "./App.module.css";
import MainPage from "./routers/MainPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./routers/LoginPage";
import SignUpPage from "./routers/SignupPage";
import AddressPage from "./routers/AddressPage";
import AddressResult from "./components/addressResult";
import FindIdPage from "./routers/FindIdPage";
import FindPwdPage from "./routers/FindPwdPage";
import FindIdConfirmPage from "./routers/FindIdConfirmPage";
import PwdRePage from "./routers/PwdRePage";
import PwdReMailPage from "./routers/PwdReMailPage";
import OrderPage from "./routers/mykurly/OrderPage";
import MainHeader from "./components/mainHeader";
import MainFooter from "./components/mainFooter";
import CouponPage from "./routers/mykurly/CouponPage";
import EmoneyPage from "./routers/mykurly/EmoneyPage";
import InfoEditPage from "./routers/mykurly/InfoEditPage";
import GiftPage from "./routers/mykurly/GiftPage";
import InquiryPage from "./routers/mykurly/InquiryPage";
import MyPickPage from "./routers/mykurly/MyPickPage";
import ReviewPage from "./routers/mykurly/ReviewPage";
import DestinationPage from "./routers/mykurly/DestinationPage";

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

        <Route path="/mypage/coupon" element={<CouponPage />}></Route>
        <Route path="/mypage/destination" element={<DestinationPage />}></Route>
        <Route path="/mypage/emoney" element={<EmoneyPage />}></Route>
        <Route path="/mypage/gift" element={<GiftPage />}></Route>
        <Route path="/mypage/infoedit" element={<InfoEditPage />}></Route>
        <Route path="/mypage/inquiry" element={<InquiryPage />}></Route>
        <Route path="/mypage/mypick" element={<MyPickPage />}></Route>
        <Route path="/mypage/order" element={<OrderPage />}></Route>
        <Route path="/mypage/review" element={<ReviewPage />}></Route>

        <Route
          path="/address/shipping-address"
          element={<AddressPage />}
        ></Route>
        <Route
          path="/address/shipping-address/result"
          element={<AddressResult />}
        ></Route>
        <Route path="*" element={<Navigate replace to="/" />}></Route>
      </Routes>
      <MainFooter />
    </div>
  );
}

export default App;
