import React from 'react';
import styles from '../css/ReceiptPage.module.css';
import MainFooter from '../components/mainFooter';
import MainHeader from '../components/mainHeader';

const ReceiptPage = (props) => {
  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <div className={styles.body}>
          <div className={styles.receipt}>
            <div className={styles.receiptTitle}>
              <img
                src='https://res.kurly.com/mobile/service/order/1909/img_success_order_end.gif'
                alt=''
                className={styles.checkImg}
              />
              <div className={styles.receiptInfo}>
                <p>최도원님의 주문이 완료되었습니다.</p>
                <p>내일 만나요!</p>
              </div>
            </div>

            <div className={styles.paymentInfo}>
              <div className={styles.paymentInfoBody}>
                <span className={styles.paymentTitle}>결제금액</span>
                <span className={styles.paymentPrice}>
                  11,490<span className={styles.moneyUnit}>원</span>
                </span>
              </div>
              <div className={styles.paymentInfoBody}>
                <span className={styles.paymentTitle}>적립금</span>
                <span className={styles.accumulate}>
                  <span className={styles.paymentAccumulate}>
                    +575<span className={styles.moneyUnit}>원</span>
                  </span>
                  <span className={styles.accumulateNotice}>
                    적립금은 배송완료 다음날 적립 (웰컴 5%)
                  </span>
                </span>
              </div>
            </div>
            <div className={styles.allPaperImg}>
              <img
                src='https://res.kurly.com/kurly/img/2022/banner-paper_340_82_3x.png'
                alt=''
              />
            </div>
            <div className={styles.noticeWrapper}>
              <ul>
                <li className={styles.noticeList}>
                  [주문완료] 상태일 경우에만 주문내역 상세페이지에서 주문 취소가
                  가능합니다.
                </li>
                <li className={styles.noticeList}>
                  엘리베이터 이용이 어려운 경우 6층 이상부터는 공동 현관 앞 또는
                  경비실로 대응 배송 될 수 있습니다.
                </li>
                <li className={styles.noticeList}>
                  주문 / 배송 및 기타 문의가 있을 경우, 1:1 문의에 남겨주시면
                  신속히 해결해드리겠습니다.
                </li>
              </ul>
            </div>
            <div className={styles.receiptButton}>
              <button className={styles.orderDetail} type='button'>
                <span className={styles.buttonText}>주문 상세보기</span>
              </button>
              <button className={styles.continueShopping} type='button'>
                <span className={styles.buttonText}>쇼핑 계속하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default ReceiptPage;
