import React, { useState } from 'react';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import styles from '../css/SignupPage.module.css';
import Info_service_term from '../components/signupTerm';
import SignupInfo from '../components/signupInfo';

const SignUpPage = ({ authService }) => {
  const [submit, setSubmit] = useState(false);

  const onSubmit = () => {
    setSubmit(true);
  };

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
            <SignupInfo
              submit={submit}
              setSubmit={setSubmit}
              authService={authService}
            />
            <div className={styles.line}></div>
          </div>
          <div>
            <Info_service_term />
          </div>
          <div className={styles.submit}>
            <button onClick={onSubmit}>가입하기</button>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default SignUpPage;
