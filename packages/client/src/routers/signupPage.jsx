import React, { useState, useEffect } from 'react';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import styles from '../css/SignupPage.module.css';
import Info_service_term from '../components/signupTerm';
import SignupInfo from '../components/signupInfo';

const SignUpPage = ({ authService }) => {
  const [data, setData] = useState({
    user_id: 'albert',
    user_password: '1234',
    user_name: 'albert',
    user_email: '1234567@naver.com',
    user_phone: '010-1111-1111',
    zip_code: '',
    address: '서울특별시 서울구 서울동',
    address_detail: '',
    user_birth: '20010101',
    gender: '0',
    reffer_id: '',
    join_event_name: '',
  });
  const [valid, setvalid] = useState(false);
  const [idIsValid, setIdIsValid] = useState(false);

  const [submit, setSubmit] = useState(null);

  const addInfo = (info) => {
    setData(info);
    setSubmit(false);
    authService.postSignup(data);
  };
  const onSubmit = () => {
    setSubmit(true);
  };
  const checkId = (info) => {
    const isValid = authService.signupIdCheck(info);
    if (isValid == true) {
      console.log('사용 가능 아이디입니다.');
    } else {
      console.log('다른 아이디를 사용하십시오');
    }
  };
  const checkEmail = (info) => {
    const isValid = authService.signupEmailCheck(info);
    if (isValid == true) {
      console.log('사용 가능 이메일입니다.');
    } else {
      console.log('다른 이메일을 사용하십시오');
    }
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
              addInfo={addInfo}
              submit={submit}
              data={data}
              checkId={checkId}
              checkEmail={checkEmail}
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
