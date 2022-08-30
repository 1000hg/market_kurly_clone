import React from 'react';
import styles from '../css/MyCurlyPage.module.css';

const MyCurlyPage = () => {
  return (
    <>
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
    </>
  );
};

export default MyCurlyPage;
