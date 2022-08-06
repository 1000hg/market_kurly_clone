import React from 'react';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import styles from '../css/signupPage.module.css';
import Info_add_form from '../components/info_add_form';
import Info_service_term from '../components/info_service_term';

const SignUpPage = (props) => {
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
            <div className={styles.lists}>
              <div className={styles.list}>
                <Info_add_form
                  name={'아이디'}
                  form_msg={'아이디를 입력해주세요'}
                  option={'button'}
                  required={true}
                />
              </div>
              <div className={styles.list}>
                <Info_add_form
                  name={'비밀번호'}
                  form_msg={'비밀번호를 입력해주세요'}
                  required={true}
                />
              </div>
              <div className={styles.list}>
                <Info_add_form
                  name={'비밀번호확인'}
                  form_msg={'비밀번호를 한번 더 입력해주세요'}
                  required={true}
                />
              </div>
              <div className={styles.list}>
                <Info_add_form
                  name={'이름'}
                  form_msg={'이름을 입력해주세요'}
                  required={true}
                />
              </div>
              <div className={styles.list}>
                <Info_add_form
                  name={'이메일'}
                  option={'button'}
                  form_msg={'예: marketkurly@kurly.com'}
                  required={true}
                />
              </div>
              <div className={styles.list}>
                <Info_add_form
                  name={'휴대폰'}
                  form_msg={'숫자만 입력해주세요'}
                  option={'verify'}
                  required={true}
                />
              </div>
              <div className={styles.list}>
                <Info_add_form name={'주소'} required={true} />
              </div>
              <div className={styles.list}>
                <Info_add_form name={'성별'} />
              </div>
              <div className={styles.list}>
                <Info_add_form name={'생년월일'} />
              </div>
              <div className={styles.list}>
                <Info_add_form name={'추가사항'} />
              </div>
            </div>
            <div className={styles.line}></div>
          </div>
          <div>
            <Info_service_term />
          </div>
          <div className={styles.submit}>
            <button>가입하기</button>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default SignUpPage;
