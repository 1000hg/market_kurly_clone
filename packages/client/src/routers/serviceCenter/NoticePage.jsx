import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainFooter from '../../components/mainFooter';
import MainHeader from '../../components/mainHeader';
import ServiceCenterTabs from '../../components/serviceCenterTabs';
import styles from '../../css/serviceCenter/NoticePage.module.css';

const NoticePage = ({ mykurlyService }) => {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([{}]);
  const handleClick = (content) => {
    console.log(content);
    navigate('/serviceCenter/notice/detail', { state: content });
  };

  useEffect(() => {
    mykurlyService.getNoticeList().then((e) => {
      console.log(e);
      setNoticeList(e);
    });
  }, [mykurlyService]);

  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <div className={styles.container}>
          <ServiceCenterTabs active={'notice'} />
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div className={styles.content_header}>
                <h3>공지사항</h3>
                <span>
                  컬리의 새로운 소식들과 유용한 정보들을 한 곳에서 확인하세요.
                </span>
              </div>
              <div className={styles.contentTable}>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr className={styles.thead_tr}>
                      <th className={styles.thead_th}>번호</th>
                      <th className={styles.thead_th}>제목</th>
                      <th className={styles.thead_th}>작성자</th>
                      <th className={styles.thead_th}>작성일</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tbody}>
                    <tr className={styles.tbody_tr}>
                      {noticeList === [{}] && (
                        <td colSpan='5' className={styles.tbody_td}>
                          공지사항이 없습니다.
                        </td>
                      )}
                    </tr>
                    {Object.keys(noticeList).map((key) => (
                      <tr
                        colSpan='4'
                        className={styles.tbody_td}
                        onClick={() => handleClick(noticeList[key])}
                      >
                        <td>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default NoticePage;
