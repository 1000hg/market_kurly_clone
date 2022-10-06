import React from 'react';
import styles from '../../css/mykurly/CouponPage.module.css';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import MainHeader from '../../components/mainHeader';
import MainFooter from '../../components/mainFooter';
import { useEffect } from 'react';
import { useState } from 'react';

const CouponPage = ({ mykurlyService }) => {
  const [couponList, setCouponList] = useState([{}]);
  useEffect(() => {
    mykurlyService.getCouponList().then((e) => setCouponList(e));
  }, [mykurlyService]);
  return (
    <>
      <MainHeader />
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
                  {couponList === [{}] && (
                    <td colSpan='5' className={styles.tbody_td}>
                      쿠폰 내역이 존재하지 않습니다.
                    </td>
                  )}
                </tr>
                {Object.keys(couponList).map((key) => (
                  <tr colSpan='5' className={styles.tbody_td}>
                    <td className={styles.coupon_name}>
                      <h6>{couponList[key].coupon_name}</h6>
                      <p>{couponList[key].coupon_description}</p>
                    </td>
                    <td className={styles.type}>
                      {couponList[key].coupon_action}
                    </td>
                    <td className={styles.type}>
                      {couponList[key].coupon_percent == null
                        ? 0
                        : couponList[key].coupon_percent}
                      %
                    </td>

                    <td className={styles.type}>
                      {couponList[key].update_dtm}까지
                    </td>
                    <td>
                      <p className={styles.edit}>미사용</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default CouponPage;
