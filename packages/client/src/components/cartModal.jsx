import { useEffect, useState } from "react";
import styles from "../css/CartModal.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CART_INFO,
  SELECTED_PRODUCT,
  SET_GCART_INFO,
} from "../reducers/cartData";

export default function CartModal({
  clickedItem,
  setModalOpen,
  callBackfn,
  mykurlyService,
}) {
  const [buyCount, setBuyCount] = useState(1);
  const dispatch = useDispatch();
  let { user_seq } = useSelector((state) => {
    return state.userData;
  });
  let { cart_list } = useSelector((state) => {
    return state.cartData;
  });
  const token = useSelector((state) => state.loginToken.accessToken);

  const setSelProduct = (stat) => {
    if (stat === 0) {
      dispatch(
        SELECTED_PRODUCT({
          stat: "OLD",
          product_img: clickedItem.imgList[0][0].product_img,
          product_seq: clickedItem.product_seq,
          product_view_title: clickedItem.product_view_title,
        })
      );
    } else if (stat === 1) {
      dispatch(
        SELECTED_PRODUCT({
          stat: "NEW",
          product_img: clickedItem.imgList[0][0].product_img,
          product_seq: clickedItem.product_seq,
          product_view_title: clickedItem.product_view_title,
        })
      );
    }
  };

  const closeModal = (e) => {
    e.preventDefault();

    if (callBackfn !== undefined) {
      callBackfn();
    }
    setModalOpen(false);
  };

  useEffect(() => {
    console.log(clickedItem);
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow:hidden;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const onCartClick = () => {
    let l_guest_seq = localStorage.getItem("guest_seq");

    if (
      localStorage.getItem("accessToken") === null ||
      localStorage.getItem("accessToken") === ""
    ) {
      axios
        .post("/api/guest/add", {
          guest_seq: l_guest_seq,
          product_seq: clickedItem.product_seq,
          product_view_seq: clickedItem.product_view_seq,
          product_buy_count: buyCount,
        })
        .then((res) => {
          if (l_guest_seq === null || l_guest_seq === "") {
            localStorage.setItem("guest_seq", res.data.guest_seq);
            l_guest_seq = res.data.guest_seq;
          }

          axios
            .get("/api/guest/list", { params: { guest_seq: l_guest_seq } })
            .then((res) => {
              if (has_product(cart_list, clickedItem.product_seq) !== -1) {
                console.log("이미 존재하는 상품입니다.");
                setSelProduct(0);
              } else {
                console.log("새로운 상품 추가하겠습니다");
                setSelProduct(1);
              }
              dispatch(SET_GCART_INFO(res.data));
              setModalOpen(false);
            });
        });
    } else {
      const data = {
        user_seq: user_seq,
        product_seq: clickedItem.product_seq,
        product_view_seq: clickedItem.product_view_seq,
        products_buy_count: buyCount,
        total_price: parseInt(clickedItem.product_price) * buyCount, //물품 총 가격
        total_discount_price: parseInt(clickedItem.discount_price) * buyCount, //카트 물품 총 할인 가격
        total_accumulate_price:
          parseInt(clickedItem.accumulate_price) * buyCount, //적립 가능 가격
      };
      mykurlyService.addCart(token, data).then((res) => {
        mykurlyService.getCartList(token, user_seq).then((res) => {
          if (has_product(cart_list, clickedItem.product_seq) !== -1) {
            console.log("이미 존재하는 상품입니다.");
            setSelProduct(0);
          } else {
            console.log("새로운 상품 추가하겠습니다");
            setSelProduct(1);
          }
          dispatch(SET_CART_INFO(res));
          setModalOpen(false);
        });
      });
    }
  };
  const has_product = (cartList, product_seq) => {
    let p_seq = cartList.findIndex((a) => a.product_seq === product_seq);
    return p_seq;
  };

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <div>
          <div>
            <div className={styles.productTitle}>
              {clickedItem.product_view_title}
            </div>
            {clickedItem.is_accumulate === "0" && (
              <div className={styles.juck}>적립제외상품</div>
            )}
            <div className={styles.flex_b}>
              <div className={styles.discountPrice}>
                {clickedItem.is_discount === "1" ? (
                  <>
                    {parseInt(
                      clickedItem.product_discount_price
                    ).toLocaleString("ko-kr")}
                    <span className={styles.won3}>원</span>
                    <span className={styles.originPrice2}>
                      {" " +
                        parseInt(clickedItem.product_price).toLocaleString(
                          "ko-kr"
                        )}
                      원
                    </span>
                  </>
                ) : (
                  <>
                    {parseInt(clickedItem.product_price).toLocaleString(
                      "ko-kr"
                    )}
                    <span className={styles.won3}>원</span>
                  </>
                )}
              </div>
              <div className={styles.countDiv}>
                <button
                  onClick={() =>
                    buyCount > 1 ? setBuyCount(buyCount - 1) : null
                  }
                  className={styles.countBtn}
                >
                  -
                </button>
                <div className={styles.count}>{buyCount}</div>
                <button
                  onClick={() => setBuyCount(buyCount + 1)}
                  className={styles.countBtn}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className={styles.priceDiv}>
            <div className={styles.flex_b}>
              <div className={styles.hapgae}>합계 : </div>
              <div className={styles.totalPrice}>
                {clickedItem.is_discount === "1" // 상품 할인이 있으면 1 없으면 0
                  ? parseInt(
                      buyCount * clickedItem.product_discount_price
                    ).toLocaleString("ko-kr")
                  : parseInt(
                      buyCount * clickedItem.product_price
                    ).toLocaleString("ko-kr")}
                <span className={styles.won2}>원</span>
              </div>
            </div>
            <div className={styles.yellowJuckDiv}>
              <span className={styles.yellowJuck}>적립</span>
              {localStorage.getItem("accessToken") === null ||
              localStorage.getItem("accessToken") === "" ? (
                <span>로그인 후, 적립 혜택 제공</span>
              ) : (
                <span>
                  구매 시{" "}
                  {parseInt(
                    clickedItem.accumulate_price * buyCount
                  ).toLocaleString("ko-kr")}
                  원 적립
                </span>
              )}
            </div>
          </div>

          <div className={styles.flexEnd}>
            <div className={styles.btnDiv2}>
              <button className={styles.cancelBtn} onClick={closeModal}>
                취소
              </button>
              <button className={styles.jangbaBtn2} onClick={onCartClick}>
                장바구니 담기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
