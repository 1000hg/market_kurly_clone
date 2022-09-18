import React from 'react';
import { useState } from 'react';
import styles from '../../css/mykurly/GiftPage.module.css';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';

const GiftPage = (props) => {
  const [date, setDate] = useState('3개월');
  const [onTab, setOnTab] = useState(false);
  const onChangeDate = (e) => {
    setDate(e);
  };
  const onClickTab = () => {
    setOnTab(!onTab);
  };
  return (
    <>
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'gift'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <div className={styles.title}>
                <h2>선물 내역</h2>
                <span>지난 3년간의 선물 내역 조회가 가능합니다.</span>
              </div>
              <div
                className={
                  onTab == false ? styles.dropbox : styles.dropbox_active
                }
              >
                <div className={styles.tab_btn} onClick={() => onClickTab()}>
                  <div className={styles.date}>{date}</div>
                </div>
                <div
                  className={`${
                    onTab == true ? styles.active : styles.drop_btn
                  } ${date == '3개월' ? styles.clicked : ''}`}
                  onClick={() => onChangeDate('3개월')}
                >
                  3개월
                </div>
                <div
                  className={`${
                    onTab == true ? styles.active : styles.drop_btn
                  } ${date == '6개월' ? styles.clicked : ''}`}
                  onClick={() => onChangeDate('6개월')}
                >
                  6개월
                </div>
                <div
                  className={`${
                    onTab == true ? styles.active : styles.drop_btn
                  } ${date == '1년' ? styles.clicked : ''}`}
                  onClick={() => onChangeDate('1년')}
                >
                  1년
                </div>
                <div
                  className={`${
                    onTab == true ? styles.active : styles.drop_btn
                  } ${date == '3년' ? styles.clicked : ''}`}
                  onClick={() => onChangeDate('3년')}
                >
                  3년
                </div>
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.content}>
              <div className={styles.warning_orders}>
                <div className={styles.warning}>
                  <span></span>
                  3개월간의 주문내역이 없습니다.
                  <p>선물하기 서비스는 마켓컬리 앱에서 이용할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftPage;
