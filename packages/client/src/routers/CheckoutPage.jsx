import React, { useEffect, useState } from 'react';
import styles from '../css/CheckoutPage.module.css';
import MainFooter from '../components/mainFooter';
import MainHeader from '../components/mainHeader';
import { useSelector } from 'react-redux';

const CheckoutPage = ({ mykurlyService }) => {
  const token = useSelector((state) => state.loginToken.accessToken);
  const user_seq = useSelector((state) => state.userData.user_seq);
  const user_id = useSelector((state) => state.userData.user_id);
  const [cartList, setCartList] = useState([{}]);
  const user_address = useSelector((state) => state.userData.address);
  const user_address_detail = useSelector(
    (state) => state.userData.address_detail
  );
  const [checkOutInfo, setCheckOutInfo] = useState({
    user_seq: 29,
    cart_seq: 220,
    user_coupon_seq: 1,
    accumulate_price: 0,
    used_accumulate: '0',
    payment_method: '1',
    payment_kind: '토스',
    is_installment: '0',
    receiver: '아무개',
    receiver_phone: '010xxxxxxxx',
    receive_place: '문앞',
    door_password: 'null',
    receive_place_etc: 'null',
    arrival_message_time: '1',
  });

  const onCheckOut = () => {
    mykurlyService
      .paymentCheckOut(token, checkOutInfo)
      .then((e) => console.log(e));
  };

  useEffect(() => {
    mykurlyService.getCartList(token, user_seq).then((e) => setCartList(e));
  }, [mykurlyService]);

  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <h2 className={styles.pageTitle}>주문서</h2>
        <div className={styles.body}>
          <div>
            <div className={styles.title}>
              <h3>주문 상품</h3>
              <button className={styles.flipBtn}>
                <img
                  src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iN2EwMnFxZzNqYSIgZD0iTTExIDEyaDl2OSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCAwaDMwdjMwSDB6Ii8+CiAgICAgICAgPHVzZSBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE1LjUgMTYuNSkiIHhsaW5rOmhyZWY9IiM3YTAycXFnM2phIi8+CiAgICA8L2c+Cjwvc3ZnPgo='
                  alt='펼치기'
                  className={styles.flipBtnImage}
                />
              </button>
            </div>
            <ul className={styles.products}>
              {Object.keys(cartList).map((key) => (
                <li key={key}>
                  <div className={styles.productList}>
                    <img
                      className={styles.productImage}
                      src={cartList[key].product_img}
                      alt='product_image'
                    />
                    <div className={styles.productName}>
                      {cartList[key].product_name}
                    </div>
                    <div className={styles.productCount}>
                      {cartList[key].total_product_count}개
                    </div>
                    <div className={styles.productPrice}>
                      <span>{cartList[key].products_total_price}원</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.orderer}>
            <div className={styles.title}>
              <h3>주문자 정보</h3>
            </div>
            <div className={styles.orderer_info}>
              <div className={styles.info}>
                <span>보내는 분</span>
                <div>{user_id}</div>
              </div>
              <div className={styles.info}>
                <span>휴대폰</span>
                <div>010-xxxx-xxxx</div>
              </div>
              <div className={styles.info}>
                <span>이메일</span>
                <div>
                  chlehdnjs@gmail.com
                  <p>
                    이메일을 통해 주문처리과정을 보내드립니다. <br />
                    정보변경은 마이컬리{'>'}개인정보 수정 메뉴에서 가능합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.delivery}>
            <div className={styles.title}>
              <h3>배송 정보</h3>
            </div>
            <div className={styles.delivery_info}>
              <div className={styles.info}>
                <span>배송지</span>
                <div>{user_address}</div>
              </div>
              <div className={styles.info}>
                <span>상세 정보</span>
                <div>{user_address_detail}</div>
                <button className={styles.addressEditBtn}>수정</button>
              </div>
            </div>
          </div>

          <div className={styles.paymentWrapper}>
            <div className={styles.paymentLeftTab}>
              <div className={styles.coupon}>
                <div className={styles.title}>
                  <h3>쿠폰/적립금</h3>
                </div>
                <div className={styles.coupon_info}>
                  <div className={styles.info}>
                    <span>쿠폰 적용</span>
                    <div className={styles.coupon}>
                      <div className={styles.couponList}>
                        <div className={styles.couponBtnWrapper}>
                          <button className={styles.couponBtn}>
                            사용가능 쿠폰0장 / 전체 0장
                            <span className={styles.couponFlipBtn}></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      borderTop: '1px solid #f4f4f4',
                      paddingTop: '20px',
                    }}
                    className={styles.info}
                  >
                    <span>적립금 적용</span>
                    <div className={styles.emoney}>
                      <div className={styles.emoneyWrapper}>
                        <div className={styles.emoneyDisplay}>
                          <input
                            data-testid='input-box'
                            disabled=''
                            placeholder='0'
                            type='text'
                            height='44'
                            value='0'
                          />
                        </div>
                        <button className={styles.emoneyUsingBtn}>
                          <span>모두사용</span>
                        </button>
                      </div>
                      <div className={styles.emoneyNotice}>
                        사용가능 적립금
                        <strong> 0</strong>원
                      </div>
                      <p className={styles.emoneyNotice}>
                        적립금 내역:마이컬리&gt;적립금
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.payment}>
                <div className={styles.title}>
                  <h3>결제 수단</h3>
                </div>
                <div className={styles.payment_info}>
                  <div style={{ paddingTop: '20px' }} className={styles.info}>
                    <span>결제수단 선택</span>
                    <div className={styles.paymentType}>
                      <button className={styles.kakaopayBtn}>
                        <img
                          className={styles.kakaopayImage}
                          src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik03LjUxNSAyLjhDMy4zNjUgMi44IDAgNS40NDUgMCA4LjcwN2MwIDEuOTM4IDEuMTg3IDMuNjU3IDMuMDIxIDQuNzM0LS4xOTEuNzY4LS42ODQgMi43NDItLjc1IDIuOTU3LS4wODMuMjY2LS4xMDMgMS4wNDYuNzAyLjUxMi42MzQtLjQyIDIuNDc5LTEuNyAzLjU3LTIuMzQ4LjMxOC4wMzMuNjQyLjA1MS45NzIuMDUxIDQuMTUgMCA3LjUxNS0yLjY0NCA3LjUxNS01LjkwNiAwLTMuMjYyLTMuMzY1LTUuOTA3LTcuNTE1LTUuOTA3TTIxLjA0OCA0LjExM2MxLjUxNy0xLjMxMyAzLjQ2OC0xLjUwOCA0Ljg5My0uNTg1IDEuNzA3IDEuMTA2IDIuMTY4IDIuNzU0IDIuMTY4IDQuODkyIDAgMi40LTEuMTE1IDMuOTY4LTEuNjQyIDQuNDYtLjUyNi40OTMtMS42NzMgMS4yOTItMi44OCAxLjI5MkgyMS40MnYzLjc4NGgtMi45MTFWMy4yODJoMi4xMDZzLjI2LjU0OC40MzMuODN6bTEuOTUxIDEuMTUzYy0uNjk3IDAtMS4xNTMuMTc3LTEuNTMzLjQ3N3Y2LjMwNmgxLjEzOGMuNTU4IDAgMi41NDctLjUwNyAyLjU0Ny0zLjM4MyAwLS42NzctLjA5LTEuMzg1LS4yNzgtMS45LS4zNTctLjk3Ny0xLjI0Ny0xLjUtMS44NzQtMS41ek0zMy44MTcgMy4wNDZjMi4wODUgMCAyLjk0Mi43MTggMy40NDggMS4zNTQuNDgxLjYwNC44NjIgMS40OTcuODYyIDIuOHY2LjY4aC0yLjI2di0uOTU0cy0uNDQyLjQyLTEuMzc5LjgzMWMtLjk4LjQzLTIuNjUzLjg3Ny00LjA0MS0uMTg0LTEuMzk3LTEuMDY4LTEuMi0zLjQ3MS0uODUyLTQuMTU0LjQ4LS45MzggMS4zNjMtMS45NjggMy43MTYtMS45NjhoMi4wMjl2LS45MDhjMC0uNTU0LS41ODMtMS4xMDctMS43My0xLjEwNy0xLjI4IDAtMS44MzMuMTkyLTIuODE3LjYzNWwtLjk5Ni0xLjk0M3MxLjQ5Ni0xLjA4MiA0LjAyLTEuMDgyem0xLjQ3NyA2LjI1aC0xLjQxNWMtLjU5OSAwLTEuOTYxLjIxNi0xLjk2MSAxLjQ3NyAwIDEuMjgzIDEuMDkgMS4yNiAxLjQ0OCAxLjIzIDEuMDg5LS4wOTEgMS45MzgtLjc5NCAxLjkzOC0uNzk0bC0uMDEtMS45MTN6TTQ3LjA2MSAzLjA0NmwtMi4yOTEgOC4xMTEtMi41NC04LjExLTIuODQ5LjgyczMuNSA5LjM4MyAzLjYyNCA5Ljc4M2MuMTIzLjQtLjAwNS44NTgtLjI4IDEuMzIyLS4zNzEuNjMtMS44MjYgMi4wMy0xLjgyNiAyLjAzbDEuODc4IDEuNjYzcy44NTctLjY4OCAxLjc0NS0xLjc1NWMuNzQzLS44OTIgMS42MzYtMi44MyAxLjkzOC0zLjU3Ny44NTktMi4xMTkgMy40Mi05LjQ2NiAzLjQyLTkuNDY2bC0yLjgxOS0uODJ6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo='
                          alt='카카오페이'
                        />
                      </button>
                      <div className={styles.otherpay}>
                        <button className={styles.ohterpayBtn}>신용카드</button>
                        <button className={styles.ohterpayBtn}>간편결제</button>
                        <button className={styles.ohterpayBtn}>휴대폰</button>
                      </div>
                    </div>
                  </div>
                  <ul class={styles.paymentTypeNotice}>
                    <li>
                      ※ 카카오페이, 토스, 네이버페이, 페이코 결제 시, 결제하신
                      수단으로만 환불되는 점 양해부탁드립니다.
                      <br />
                    </li>
                    <li>
                      ※ 고객님은 안전거래를 위해 현금 등으로 결제시 저희
                      쇼핑몰에서 가입한 토스 페이먼츠의 구매안전(에스크로)
                      서비스를 이용하실 수 있습니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.paymentRightTab}>
              <div className={styles.paymentPriceWrapper}>
                <div className={styles.paymentPrice}>
                  <div className={styles.paymentTitle}>
                    <h3>결제 금액</h3>
                  </div>
                  <div className={styles.paymentDetail}>
                    <div className={styles.paymentDetailList}>
                      <div>주문금액</div>
                      <div>
                        {Object.keys(cartList)
                          .map((key) => parseInt(cartList[key].payment_price))
                          .reduce((acc, cur, idx) => {
                            return (acc += cur);
                          })
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </div>
                    </div>
                    <div className={styles.paymentDetailList_secondForm}>
                      <div>상품금액</div>
                      <div>
                        {Object.keys(cartList)
                          .map((key) =>
                            parseInt(cartList[key].cart_total_price)
                          )
                          .reduce((acc, cur, idx) => {
                            return (acc += cur);
                          })
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </div>
                    </div>
                    <div className={styles.paymentDetailList_secondForm}>
                      <div>상품할인금액</div>
                      <div>
                        -
                        {Object.keys(cartList)
                          .map((key) =>
                            parseInt(cartList[key].total_cart_discount_price)
                          )
                          .reduce((acc, cur, idx) => {
                            return (acc += cur);
                          })
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </div>
                    </div>
                    <div className={styles.paymentDetailList}>
                      <div>쿠폰할인</div>
                      <div>0 원</div>
                    </div>
                    <div className={styles.paymentDetailList}>
                      <div>적립금사용</div>
                      <div>0 원</div>
                    </div>
                    <div
                      className={`${styles.paymentDetailList} ${styles.paymentTotalPrice}`}
                    >
                      최종결제금액
                      <div className={styles.paymentPriceNumber}>
                        {Object.keys(cartList)
                          .map((key) =>
                            parseInt(cartList[key].cart_total_price)
                          )
                          .reduce((acc, cur, idx) => {
                            return (acc += cur);
                          })
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </div>
                    </div>
                    <div className={styles.paymentNotice}>
                      <span>적립</span>
                      <div>구매시 돈원(돈%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.agreement}>
            <div className={styles.title}>
              <h3>개인정보 수집/제공</h3>
            </div>
            <div className={styles.agreementList}>
              <label className={styles.agreementCheckAllLabel}>
                <input
                  id='terms-agree-personal-info'
                  type='checkbox'
                  className={styles.agreementLabelInput}
                />
                <img
                  src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgc3Ryb2tlPSIjREREIj4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjY5LjAwMDAwMCwgLTEwOTAuMDAwMDAwKSB0cmFuc2xhdGUoMTAwLjAwMDAwMCwgOTM2LjAwMDAwMCkgdHJhbnNsYXRlKDU1My4wMDAwMDAsIDE0Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNi4wMDAwMDAsIDEyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMS41Ii8+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik03IDEyLjY2N0wxMC4zODUgMTYgMTggOC41Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K'
                  alt='agreement-term-check-button'
                  className={styles.agreementCheckBtn}
                />
                <span className={styles.agreementCheckAll}>
                  결제 진행 필수 전체 동의
                </span>
              </label>

              <div className={styles.agreementTerms}>
                <p className={styles.agreementTerm}>
                  <label className={styles.agreementLabel}>
                    <input
                      id='terms-agree-personal-info'
                      type='checkbox'
                      className={styles.agreementLabelInput}
                    />
                    <img
                      src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik03IDEyLjY2NyAxMC4zODUgMTYgMTggOC41IiBzdHJva2U9IiNEREQiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K'
                      alt='agreement-term-check-button'
                      className={styles.agreementCheckBtn}
                    />
                  </label>
                  <span>(필수) 개인정보 수집'이용 및 처리 동의</span>
                </p>
                <p className={styles.agreementTerm}>
                  <label className={styles.agreementLabel}>
                    <input
                      id='terms-agree-personal-info'
                      type='checkbox'
                      className={styles.agreementLabelInput}
                    />
                    <img
                      src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik03IDEyLjY2NyAxMC4zODUgMTYgMTggOC41IiBzdHJva2U9IiNEREQiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K'
                      alt='agreement-term-check-button'
                      className={styles.agreementCheckBtn}
                    />
                  </label>
                  <span>(필수) 개인정보 제3자 제공 동의</span>
                </p>
                <p className={styles.agreementTerm}>
                  <label className={styles.agreementLabel}>
                    <input
                      id='terms-agree-personal-info'
                      type='checkbox'
                      className={styles.agreementLabelInput}
                    />
                    <img
                      src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik03IDEyLjY2NyAxMC4zODUgMTYgMTggOC41IiBzdHJva2U9IiNEREQiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K'
                      alt='agreement-term-check-button'
                      className={styles.agreementCheckBtn}
                    />
                  </label>
                  <span>(필수) 전자지급 결제대행 서비스 이용약관 동의</span>
                </p>
              </div>
            </div>
            <p className={styles.agreementNotice}>
              마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가
              판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.
              <br />
              마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서
              통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질,
              교환/환불 등 의무와 책임을 부담하지 않습니다.
            </p>
          </div>
          <div className={styles.checkoutBtnWrapper}>
            <button className={styles.checkoutBtn} onClick={() => onCheckOut()}>
              <span>
                {Object.keys(cartList)
                  .map((key) => parseInt(cartList[key].payment_price))
                  .reduce((acc, cur, idx) => {
                    return (acc += cur);
                  })
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원 결제하기
              </span>
            </button>
            <p>
              [주문완료] 상태일 경우에만 주문 취소 가능합니다.
              <br />
              미성년자가 결제 시 법정대리인이 그 거래를 취소할 수 있습니다.
              <br />
              배송 불가 시, 결제수단으로 환불됩니다. 일부 또는 전체 상품이 품절
              등의 사유로 배송 되지 못할 경우, 신속하게 환불해 드리겠습니다.
              <br />
              카카오페이, 토스, 네이버페이, 페이코 결제 시, 결제하신 수단으로만
              환불됩니다.
              <br />
            </p>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default CheckoutPage;
