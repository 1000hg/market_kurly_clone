import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/MyPageTabs.module.css';

const ServiceCenterTabs = ({ active }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>고객센터</div>
      <ul>
        <Link to='/serviceCenter/notice'>
          <li className={styles.list}>
            <a className={active == 'notice' ? styles.active : ''}>
              공지사항<span></span>
            </a>
          </li>
        </Link>
        <Link to='/serviceCenter/faq'>
          <li className={styles.list}>
            <a className={active == 'faq' ? styles.active : ''}>
              자주하는 질문<span></span>
            </a>
          </li>
        </Link>
        <Link to='/serviceCenter/inquiry'>
          <li className={styles.list}>
            <a className={active == 'inquiry' ? styles.active : ''}>
              1:1 문의<span></span>
            </a>
          </li>
        </Link>
        <Link to='/serviceCenter/notice'>
          <li className={styles.list}>
            <a className={active == 'quan' ? styles.active : ''}>
              대량주문 문의<span></span>
            </a>
          </li>
        </Link>
      </ul>
      <a href='/serviceCenter/inquiry' className={styles.inquiry}>
        <div className={styles.inquiry_content}>
          <span>도움이 필요하신가요 ?</span>
          <span>1:1 문의하기</span>
        </div>
        <span className={styles.arrow}></span>
      </a>
    </div>
  );
};

export default ServiceCenterTabs;
