import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/MyPageTabs.module.css';

const MyPageTabs = ({ active }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>마이컬리</div>
      <ul>
        <Link to='/mypage/order'>
          <li className={styles.list}>
            <a className={active == 'order' ? styles.active : ''}>
              주문 내역<span></span>
            </a>
          </li>
        </Link>
        <Link to='/mypage/gift'>
          <li className={styles.list}>
            <a className={active == 'gift' ? styles.active : ''}>
              선물 내역<span></span>
            </a>
          </li>
        </Link>
        <Link to='/mypage/coupon'>
          <li className={styles.list}>
            <a className={active == 'mypick' ? styles.active : ''}>
              찜한 상품<span></span>
            </a>
          </li>
        </Link>
        <Link to='/mypage/destination'>
          <li className={styles.list}>
            <a className={active == 'destination' ? styles.active : ''}>
              배송지 관리<span></span>
            </a>
          </li>
        </Link>
        <Link to='/mypage/review'>
          <li className={styles.list}>
            <a className={active == 'review' ? styles.active : ''}>
              상품 후기<span></span>
            </a>
          </li>
        </Link>
        <Link to='/mypage/inquiry'>
          <li className={styles.list}>
            <a className={active == 'inquiry' ? styles.active : ''}>
              상품 문의<span></span>
            </a>
          </li>
        </Link>
        <Link to='/mypage/emoney'>
          <li className={styles.list}>
            <a className={active == 'emoney' ? styles.active : ''}>
              적립금<span></span>
            </a>
          </li>
        </Link>
        <Link to='/mypage/coupon'>
          <li className={styles.list}>
            <a className={active == 'coupon' ? styles.active : ''}>
              쿠폰<span></span>
            </a>
          </li>
        </Link>
        <Link to='/mypage/infoedit'>
          <li className={styles.list}>
            <a className={active == 'infoedit' ? styles.active : ''}>
              개인 정보 수정<span></span>
            </a>
          </li>
        </Link>
      </ul>
      <a href='/mypage/inquiry/form' className={styles.inquiry}>
        <div className={styles.inquiry_content}>
          <span>도움이 필요하신가요 ?</span>
          <span>1:1 문의하기</span>
        </div>
        <span className={styles.arrow}></span>
      </a>
    </div>
  );
};

export default MyPageTabs;
