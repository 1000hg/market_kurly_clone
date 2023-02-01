import React from 'react';
import { useState } from 'react';
import MainFooter from '../../components/mainFooter';
import MainHeader from '../../components/mainHeader';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import { useSelector } from 'react-redux';
import styles from '../../css/mykurly/OrderPage.module.css';
import { useEffect } from 'react';

const OrderPage = ({ mykurlyService }) => {
  const token = useSelector((state) => state.loginToken.accessToken);
  const user_seq = useSelector((state) => state.userData.user_seq);
  const [date, setDate] = useState('3개월');
  const [onTab, setOnTab] = useState(false);
  const [paymentList, setPaymentList] = useState([{}]);

  useEffect(() => {
    mykurlyService
      .getPaymentList(token, user_seq)
      .then((e) => setPaymentList(e));
    console.log(paymentList);
  }, [mykurlyService]);

  const onChangeDate = (e) => {
    setDate(e);
    setOnTab(false);
  };
  const onClickTab = () => {
    setOnTab(!onTab);
  };
  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'order'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <div className={styles.title}>
                <h2>주문 내역</h2>
                <span>최대 지난 3년간의 주문 내역까지 확인할 수 있어요</span>
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
              <div className={styles.warning}>
                <div>
                  <p>3개월간의 주문내역이 없습니다.</p>
                  <button type='button' width='150' height='44' radius='3'>
                    <span className={styles.best_items}>베스트 상품 보기</span>
                  </button>
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

export default OrderPage;
