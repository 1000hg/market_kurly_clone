import React, { useState } from 'react';
import MainFooter from '../../components/mainFooter';
import MainHeader from '../../components/mainHeader';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import styles from '../../css/mykurly/ReviewPage.module.css';

const ReviewPage = (props) => {
  const [reviewTab, setReviewTab] = useState('before');
  const changeTab = (e) => {
    if (e == 'before') {
      setReviewTab('before');
    } else {
      setReviewTab('after');
    }
  };
  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'review'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <div className={styles.article}>
                <h2 className={styles.title}>상품후기</h2>
              </div>
              <div className={styles.review}>
                <div className={styles.notice}>
                  <p>
                    <b>
                      후기 작성 시 사진후기 100원, 글후기 50원을 적립해드립니다.
                    </b>
                    <br></br>- 퍼플, 더퍼플은 <b>2배</b> 적립 (사진 200원, 글
                    100원)<br></br>- 주간 베스트 후기로 선정 시 <b>5,000원</b>을
                    추가 적립<br></br>
                    <b>* 후기 작성은 배송 완료일로부터 30일 이내 가능합니다.</b>
                  </p>
                </div>
                <div className={styles.review_tab}>
                  <div className={styles.buttonbox}>
                    <button
                      id='before'
                      className={
                        reviewTab == 'before' ? styles.active : styles.button
                      }
                      onClick={() => changeTab('before')}
                    >
                      작성가능 후기(0)
                    </button>
                  </div>
                  <div className={styles.buttonbox}>
                    <button
                      id='after'
                      className={
                        reviewTab == 'after' ? styles.active : styles.button
                      }
                      onClick={() => changeTab('after')}
                    >
                      작성완료 후기(0)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default ReviewPage;
