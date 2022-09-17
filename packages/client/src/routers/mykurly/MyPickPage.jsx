import React from 'react';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import styles from '../../css/mykurly/MyPickPage.module.css';

const MyPickPage = (props) => {
  return (
    <>
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'mypick'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <div className={styles.title}>
                <h2>찜한 상품(0)</h2>
                <span>찜한 상품은 최대 200개까지 저장됩니다.</span>
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.content}>
              <div className={styles.warning}>
                <div>
                  <img src='https://res.kurly.com/pc/service/pick/icon-empty-like.svg' />
                  <p>찜한 상품이 없습니다.</p>
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

export default MyPickPage;
