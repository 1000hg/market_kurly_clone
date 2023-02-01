import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainFooter from '../../components/mainFooter';
import MainHeader from '../../components/mainHeader';
import styles from '../../css/serviceCenter/NoticeDetailPage.module.css';

const NoticeDetailPage = ({ mykurlyService }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState({});

  useEffect(() => {
    console.log(location.state);
    setContent(location.state);
  }, []);

  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <span>공지사항</span>
            <span>
              컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.
            </span>
          </div>
          <div className={styles.contentBox}>
            <div className={styles.contentHeader}>
              <li className={styles.contentInfo}>
                <div>제목</div>
                <div>{content.title}</div>
              </li>
              <li className={styles.contentInfo}>
                <div>작성자</div>
                <div>{content.writer}</div>
              </li>
              <li className={styles.contentInfo}>
                <div>작성일</div>
                <div>{content.create_dtm}</div>
              </li>
            </div>
            <div className={styles.content}>{content.content}</div>
          </div>
          <div className={styles.listButton}>
            <button onClick={() => navigate('/serviceCenter/notice')}>
              목록
            </button>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default NoticeDetailPage;
