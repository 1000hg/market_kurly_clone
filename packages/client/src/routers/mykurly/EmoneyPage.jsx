import React from 'react';
import styles from '../../css/mykurly/EmoneyPage.module.css';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
const EmoneyPage = (props) => {
  return (
    <>
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'emoney'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <div className={styles.article}>
                <h2 className={styles.title}>
                  적립금{' '}
                  <span className={styles.subtitle}>
                    보유하고 계신 적립금의 내역을 한 눈에 확인 하실 수 있습니다.
                  </span>
                </h2>
              </div>
              <div className={styles.point_header}>
                <div className={styles.point_view}>
                  <h3>현재 적립금</h3>{' '}
                  <span className={styles.point}>0 원</span>
                </div>{' '}
                <div className={styles.point_expired}>
                  <h3>소멸예정 적립금</h3>{' '}
                  <span className={styles.point}>0 원</span>
                </div>
              </div>
            </div>

            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.thead_tr}>
                  <th className={styles.thead_th}>날짜</th>
                  <th className={styles.thead_th}>내용</th>
                  <th className={styles.thead_th}>유효기간</th>
                  <th className={styles.thead_th}>금액</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                <tr className={styles.tbody_tr}>
                  <td colspan='4' className={styles.tbody_td}>
                    적립금 내역이 존재하지 않습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmoneyPage;
