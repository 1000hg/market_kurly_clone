import React from 'react';
import styles from '../../css/mykurly/CouponPage.module.css';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';

const CouponPage = (props) => {
  return (
    <>
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'coupon'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <h3>쿠폰</h3>
            </div>
            <div className={styles.couponbox}>
              <div className={styles.couponform}>
                <div className={styles.inputbox}>
                  <input
                    data-testid='input-box'
                    placeholder='발급된 쿠폰번호를 입력해 주세요'
                    type='text'
                    readOnly
                  />
                  <button>쿠폰 등록</button>
                  <p>
                    쿠폰에 하이픈 '-'이 포함되어 있을 경우, 하이픈 '-'을 반드시
                    입력해주세요.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.notice}>
              <p>
                쿠폰은 적용 가능한 상품이 따로 적용되어 있는 경우 해당 상품 구매
                시에만 사용이 가능합니다.
              </p>
              <p>사용가능쿠폰: 0장</p>
            </div>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.thead_tr}>
                  <th className={styles.thead_th}>쿠폰명</th>
                  <th className={styles.thead_th}>기능</th>
                  <th className={styles.thead_th}>할인/적립</th>
                  <th className={styles.thead_th}>사용가능기간</th>
                  <th className={styles.thead_th}>사용여부</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                <tr className={styles.tbody_tr}>
                  <td colSpan='5' className={styles.tbody_td}>
                    쿠폰 내역이 존재하지 않습니다.
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

export default CouponPage;
