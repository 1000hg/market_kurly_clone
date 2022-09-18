import React, { useRef } from 'react';
import styles from '../../css/mykurly/InfoEditPage.module.css';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import { useSelector } from 'react-redux';

const InfoEditPage = (props) => {
  const passwordRef = useRef();
  const user_id = useSelector((state) => state.userData.user_id);
  return (
    <>
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <div className={styles.myTabs}>
            <MyPageTabs active={'infoedit'} />
          </div>
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <div className={styles.article}>
                <h2 className={styles.title}>개인 정보 수정</h2>
              </div>
              <div className={styles.info}>
                <div className={styles.notice}>
                  <h4>비밀번호 재확인</h4>
                  <p>
                    회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번
                    확인해주세요.
                  </p>
                </div>
              </div>
              <div className={styles.infoedit}>
                <div className={styles.list}>
                  <div className={styles.labelbox}>
                    <label className={styles.label}>아이디</label>
                  </div>
                  <div className={styles.form}>
                    <div className={styles.inputbox}>
                      <input
                        id='ID'
                        data-testid='input-box'
                        placeholder='아이디를 입력해주세요'
                        type='text'
                        className={styles.input}
                        readOnly
                        value={user_id}
                      />
                    </div>
                  </div>
                  <div className={styles.space}></div>
                </div>
                <div className={styles.list}>
                  <div className={styles.labelbox}>
                    <label className={styles.label}>비밀번호</label>
                    <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
                  </div>
                  <div className={styles.form}>
                    <div className={styles.inputbox}>
                      <input
                        id='PASSWORD'
                        data-testid='input-box'
                        placeholder='현재 비밀번호를 입력해주세요'
                        type='text'
                        className={styles.input}
                        ref={passwordRef}
                      />
                    </div>
                    {passwordRef && (
                      <div className={styles.invalid}>
                        <p>비밀번호를 입력해 주세요.</p>
                      </div>
                    )}
                  </div>
                  <div className={styles.space}></div>
                </div>
              </div>
              <div className={styles.submit}>
                <button>
                  <span>확인</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoEditPage;
