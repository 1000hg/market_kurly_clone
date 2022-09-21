import React from 'react';
import styles from '../../css/mykurly/InquiryPage.module.css';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import MainHeader from '../../components/mainHeader';
import MainFooter from '../../components/mainFooter';

const InquiryPage = (props) => {
  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'inquiry'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <h2 className={styles.title}>상품 문의 </h2>
              <div className={styles.subtitle}>
                상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른
                글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
              </div>
              <div className={styles.subtitle}>
                배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리
                내 <a href='/mypage/inquiry/list'>1:1 문의</a>에 남겨주세요.
              </div>
            </div>

            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.thead_tr}>
                  <th className={styles.thead_th}>제목</th>
                  <th className={styles.thead_th}>작성일</th>
                  <th className={styles.thead_th}>답변상태</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                <tr className={styles.tbody_tr}>
                  <td colSpan='3' className={styles.tbody_td}>
                    <div>작성한 상품 문의가 없습니다.</div>
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
      <MainFooter />
    </>
  );
};

export default InquiryPage;
