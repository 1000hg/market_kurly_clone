import React from 'react';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import styles from '../../css/mykurly/ReviewPage.module.css';

const ReviewPage = (props) => {
  return (
    <>
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'review'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <h2 className={styles.title}>상품후기</h2>
            </div>
            <div className={styles.content}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr className={styles.thead_tr}>
                    <th className={styles.thead_th}></th>
                    <th className={styles.thead_th}>제목</th>
                    <th className={styles.thead_th}>작성일</th>
                    <th className={styles.thead_th}>답변상태</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  <tr className={styles.tbody_tr}>
                    <td colspan='5' className={styles.tbody_td}>
                      작성한 상품 문의가 없습니다.
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.inquiry_area}>
                <div className={styles.navigation}>
                  <button className={styles.paging_prev}>
                    <span>이전</span>
                  </button>
                  <button className={styles.paging_next}>
                    <span>다음</span>
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

export default ReviewPage;
