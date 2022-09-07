import React from 'react';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import styles from '../../css/mykurly/OrderPage.module.css';

const OrderPage = () => {
  return (
    <>
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'order'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <div className={styles.title}>
                <h2>주문 내역</h2>
                <span>최대 지난 3년간의 주문 내역까지 확인할 수 있어요</span>
              </div>
              <div className={styles.dropbox}>
                <div className={styles.outline}>
                  <div
                    tabindex='0'
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
                    tabindex='-1'
                    className={styles.inputbox}
                    value='3'
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
              <div className={styles.warning}>
                <div>
                  <p>3개월간의 주문내역이 없습니다.</p>
                  <button type='button' width='150' height='44' radius='3'>
                    <span className={styles.best_items}>베스트 상품 보기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
