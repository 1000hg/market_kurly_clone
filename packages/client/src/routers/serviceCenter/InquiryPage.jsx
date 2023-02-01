import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainFooter from '../../components/mainFooter';
import MainHeader from '../../components/mainHeader';
import ServiceCenterTabs from '../../components/serviceCenterTabs';
import styles from '../../css/serviceCenter/InquiryPage.module.css';

const InquiryPage = (props) => {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([{}]);
  const handleClick = (content) => {
    console.log(content);
  };
  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <div className={styles.container}>
          <ServiceCenterTabs active={'inquiry'} />
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div className={styles.content_header}>
                <h3>1:1 문의</h3>
              </div>
              <div className={styles.contentTable}>
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
                      {noticeList === [{}] && (
                        <td colSpan='5' className={styles.tbody_td}>
                          질문 내역이 존재하지 않습니다.
                        </td>
                      )}
                    </tr>
                    {/* {Object.keys(noticeList).map((key) => (
                      <tr
                        colSpan='4'
                        className={styles.tbody_td}
                        onClick={() => handleClick(noticeList[key])}
                      >
                        <td className={styles.coupon_name}>
                          <h6>{noticeList[key].notice_seq}</h6>
                        </td>
                        <td className={styles.type}>{noticeList[key].title}</td>
                        <td className={styles.type}>
                          {noticeList[key].writer}
                        </td>
                        <td className={styles.type}>
                          {noticeList[key].create_dtm &&
                            noticeList[key].create_dtm.substr(0, 10)}
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>
              <div className={styles.empty}>게시글이 없습니다.</div>
            </div>
            <div className={styles.inquiryButton}>
              <button>문의하기</button>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default InquiryPage;
