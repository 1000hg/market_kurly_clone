import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainFooter from '../../components/mainFooter';
import MainHeader from '../../components/mainHeader';
import ServiceCenterTabs from '../../components/serviceCenterTabs';
import styles from '../../css/serviceCenter/FaqPage.module.css';

const FaqPage = (props) => {
  const [onTab, setOnTab] = useState(false);
  const [category, setCategory] = useState('전체');
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([{}]);
  const handleClick = (content) => {
    console.log(content);
  };
  const onChangeDate = (e) => {
    setCategory(e);
    setOnTab(false);
  };
  const onClickTab = () => {
    setOnTab(!onTab);
  };
  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <div className={styles.container}>
          <ServiceCenterTabs active={'faq'} />
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div className={styles.content_header}>
                <h3>
                  자주하는 질문
                  <span>
                    고객님들께서 가장 자주하시는 질문을 모두 모았습니다.
                  </span>
                </h3>

                <div
                  className={
                    onTab == false ? styles.dropbox : styles.dropbox_active
                  }
                >
                  <div className={styles.tab_btn} onClick={() => onClickTab()}>
                    <div className={styles.category}>{category}</div>
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '전체' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('전체')}
                  >
                    전체
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == 'TOP 공지' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('TOP 공지')}
                  >
                    TOP 공지
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '회원' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('회원')}
                  >
                    회원
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '상품' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('상품')}
                  >
                    상품
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${
                      category == '주문/결제/대량주문' ? styles.clicked : ''
                    }`}
                    onClick={() => onChangeDate('주문/결제/대량주문')}
                  >
                    주문/결제/대량주문
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '배송' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('배송')}
                  >
                    배송
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '포장' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('포장')}
                  >
                    포장
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${
                      category == '이벤트/쿠폰/적립금' ? styles.clicked : ''
                    }`}
                    onClick={() => onChangeDate('이벤트/쿠폰/적립금')}
                  >
                    이벤트/쿠폰/적립금
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '취소/교환/환불' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('취소/교환/환불')}
                  >
                    취소/교환/환불
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '컬리패스' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('컬리패스')}
                  >
                    컬리패스
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '선물하기' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('선물하기')}
                  >
                    선물하기
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '셀프픽업' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('셀프픽업')}
                  >
                    셀프픽업
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '퍼플박스' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('퍼플박스')}
                  >
                    퍼플박스
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '서비스 이용' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('서비스 이용')}
                  >
                    서비스 이용
                  </div>
                  <div
                    className={`${
                      onTab == true ? styles.active : styles.drop_btn
                    } ${category == '시스템 오류' ? styles.clicked : ''}`}
                    onClick={() => onChangeDate('시스템 오류')}
                  >
                    시스템 오류
                  </div>
                </div>
              </div>
              <div className={styles.contentTable}>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr className={styles.thead_tr}>
                      <th className={styles.thead_th}>번호</th>
                      <th className={styles.thead_th}>카테고리</th>
                      <th className={styles.thead_th}>제목</th>
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
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default FaqPage;
