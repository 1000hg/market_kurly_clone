import React from 'react';
import styles from '../../css/mykurly/GiftPage.module.css';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';

const GiftPage = (props) => {
  return (
    <>
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'gift'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <div className={styles.title}>
                <h2>선물 내역</h2>
                <span>지난 3년간의 선물 내역 조회가 가능합니다.</span>
              </div>
              <div className={styles.dropbox}>
                <div className={styles.outline}>
                  <div
                    tabIndex='0'
                    role='button'
                    aria-expanded='false'
                    aria-haspopup='listbox'
                    aria-label='Without label'
                    className={styles.selector}
                  >
                    {' '}
                    3개월
                  </div>
                  <input
                    aria-hidden='true'
                    tabIndex='-1'
                    className={styles.inputbox}
                    value='3'
                    readOnly
                  />
                </div>
                <fieldset aria-hidden='true' className={styles.fieldset}>
                  <legend className={styles.legend}>
                    <span></span>
                  </legend>
                </fieldset>
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.content}>
              <div className={styles.warning_orders}>
                <div className={styles.warning}>
                  <span></span>
                  3개월간의 주문내역이 없습니다.
                  <p>선물하기 서비스는 마켓컬리 앱에서 이용할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftPage;
