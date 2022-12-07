import styles from './App.module.css';
import MainPage from './routers/MainPage.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './routers/LoginPage';
import SignUpPage from './routers/SignupPage';
import AddressPage from './routers/AddressPage';
import AddressResult from './components/addressResult';
import FindIdPage from './routers/FindIdPage';
import FindPwdPage from './routers/FindPwdPage';
import FindIdConfirmPage from './routers/FindIdConfirmPage';
import PwdRePage from './routers/PwdRePage';
import PwdRemailPage from './routers/PwdRemailPage';
import OrderPage from './routers/mykurly/OrderPage';
import CouponPage from './routers/mykurly/CouponPage';
import EmoneyPage from './routers/mykurly/EmoneyPage';
import InfoEditPage from './routers/mykurly/InfoEditPage';
import GiftPage from './routers/mykurly/GiftPage';
import InquiryPage from './routers/mykurly/InquiryPage';
import MyPickPage from './routers/mykurly/MyPickPage';
import ReviewPage from './routers/mykurly/ReviewPage';
import DestinationPage from './routers/mykurly/DestinationPage';
import ProductDetailPage from './routers/ProductDetailPage';
import SearchResultPage from './routers/SearchResultPage';
import AddressEdit from './components/addressEdit';
import CartPage from './routers/CartPage';
import CheckoutPage from './routers/CheckoutPage';
import ReceiptPage from './routers/ReceiptPage';

function App({ authService, mykurlyService }) {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route
          path='/login'
          element={<LoginPage authService={authService} />}
        ></Route>
        <Route path='/login/findId' element={<FindIdPage />}></Route>
        <Route path='/login/findPwd' element={<FindPwdPage />}></Route>
        <Route
          path='/login/findIdConfirm'
          element={<FindIdConfirmPage />}
        ></Route>
        <Route path='/login/pwdRePage' element={<PwdRePage />}></Route>
        <Route path='/login/pwdRemail' element={<PwdRemailPage />}></Route>
        <Route
          path='/signup'
          element={<SignUpPage authService={authService} />}
        ></Route>

        <Route
          path='/cart'
          element={<CartPage mykurlyService={mykurlyService} />}
        ></Route>
        <Route
          path='/order/checkout'
          element={<CheckoutPage mykurlyService={mykurlyService} />}
        ></Route>
        <Route
          path='/order/receipt'
          element={<ReceiptPage mykurlyService={mykurlyService} />}
        ></Route>
        <Route
          path='/mypage/coupon'
          element={<CouponPage mykurlyService={mykurlyService} />}
        ></Route>
        <Route
          path='/mypage/destination'
          element={<DestinationPage mykurlyService={mykurlyService} />}
        ></Route>
        <Route path='/mypage/emoney' element={<EmoneyPage />}></Route>
        <Route path='/mypage/gift' element={<GiftPage />}></Route>
        <Route path='/mypage/infoedit' element={<InfoEditPage />}></Route>
        <Route path='/mypage/inquiry' element={<InquiryPage />}></Route>
        <Route
          path='/mypage/mypick'
          element={<MyPickPage mykurlyService={mykurlyService} />}
        ></Route>
        <Route path='/mypage/order' element={<OrderPage />}></Route>
        <Route path='/mypage/review' element={<ReviewPage />}></Route>

        <Route
          path='/address/shipping-address'
          element={<AddressPage />}
        ></Route>
        <Route
          path='/address/shipping-address/result'
          element={<AddressResult mykurlyService={mykurlyService} />}
        ></Route>
        <Route
          path='/address/shipping-address/edit'
          element={<AddressEdit mykurlyService={mykurlyService} />}
        ></Route>
        <Route
          path='/product/detail/:product_view_seq'
          element={<ProductDetailPage />}
        ></Route>
        <Route path='/product/search' element={<SearchResultPage />}></Route>
        <Route path='*' element={<Navigate replace to='/' />}></Route>
      </Routes>
    </div>
  );
}

export default App;
