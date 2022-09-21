import React from 'react';
import styles from '../../css/mykurly/DestinationPage.module.css';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import MainHeader from '../../components/mainHeader';
import MainFooter from '../../components/mainFooter';

const DestinationPage = (props) => {
  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'destination'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <h2 className={styles.title}>
                배송지 관리{' '}
                <span className={styles.subtitle}>
                  배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.
                </span>
              </h2>
              <div className={styles.newaddress}>
                <button>
                  <img
                    src='https://res.kurly.com/pc/ico/2006/ico_add_16x16.svg'
                    alt=''
                    className='ico'
                  />
                  새 배송지 추가
                </button>
              </div>
            </div>

            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.thead_tr}>
                  <th className={styles.thead_th}>선택</th>
                  <th className={styles.thead_th}>주소</th>
                  <th className={styles.thead_th}>받으실 분</th>
                  <th className={styles.thead_th}>연락처</th>
                  <th className={styles.thead_th}>배송유형</th>
                  <th className={styles.thead_th}>수정</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                <tr className={styles.tbody_tr}>
                  <td colSpan='5' className={styles.tbody_td}>
                    배송지를 추가해주세요.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default DestinationPage;
