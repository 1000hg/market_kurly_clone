import React from 'react';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import styles from '../css/MyCurlyPage.module.css';

const MyCurlyPage = () => {
  return (
    <>
      <MainHeader />
      <div className={styles.signup}>
        <div className={styles.title}>회원가입</div>
        <div className={styles.container}>
          <div classs={styles.info_container}>
            <div className={styles.notice}>
              <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
              필수입력사항
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default MyCurlyPage;
