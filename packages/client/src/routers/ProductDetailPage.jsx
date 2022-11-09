import React from "react";
import styles from "../css/ProductDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import DetailInfoList from "../components/detailInfoList";
import ProductDescTab from "../components/product/productDescTab";
import ProductInfoTab from "../components/product/productInfoTab";
import ProductReviewTab from "../components/product/productReviewTab";
import ProductQnATab from "../components/product/productQnATab";
import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import Modal from "../components/modal";
import { useDispatch, useSelector } from "react-redux";
import { SET_CART_INFO, SELECTED_PRODUCT } from "../reducers/cartData";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { product_view_seq } = useParams();
  const [productInfo, setProductInfo] = useState();
  const [detailInfoList, setDetailInfoList] = useState([]);
  const [buyCount, setBuyCount] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [productWish, setProductWish] = useState(0);
  const [prodSelectBtn, setProdSelectBtn] = useState(false);
  const [qaNum, setQaNum] = useState();
  const [reviewNum, setReviewNum] = useState();

  const desc = useRef();
  const info = useRef();
  const review = useRef();
  const qna = useRef();
  const prodInfoRef = useRef();
  const dispatch = useDispatch();

  let { user_seq } = useSelector((state) => {
    return state.userData;
  });
  let { cart_list } = useSelector((state) => {
    return state.cartData;
  });

  const goBox = (idx) => {
    let box = [desc, info, review, qna][idx];
    box.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    let currentY = box.current.offsetTop + 105;
    console.log(currentY);
    // window.scrollY(currentY);
    // console.log(desc.current.offsetTop - 106);
  };

  useEffect(() => {
    axios
      .get("/api/product/view/data/" + product_view_seq)
      .then((res) => {
        console.log("1111", res.data.responseData[0]);
        setProductInfo(res.data.responseData[0]);
        setProductWish(res.data.responseData[0].is_wish);
        setQaNum(res.data.responseData[0].qa_count[0][0].qa_count);
        setReviewNum(res.data.responseData[0].review_count[0][0].review_count);
        setDetailInfoList([
          { key: "판매자", value: res.data.responseData[0].vender },
          {
            key: "포장 타입",
            value: [
              res.data.responseData[0].packaging_type,
              res.data.responseData[0].packaging_type_detail,
            ],
          },
          { key: "판매단위", value: res.data.responseData[0].sales_unit },
          { key: "중량/용량", value: res.data.responseData[0].sales_weight },
          {
            key: "상품 원산지",
            value: res.data.responseData[0].product_origin,
          },
          {
            key: "알레르기 정보",
            value: res.data.responseData[0].allergy_info,
          },
          {
            key: "유통기한",
            value: res.data.responseData[0].expiration_date,
          },
          { key: "안내사항", value: res.data.responseData[0].notification },
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [ScrollY, setScrollY] = useState(0); //ScrollY : 상품 정보 height값 (고정)
  const [show, setShow] = useState(false);

  const logic = () => {
    setScrollY(prodInfoRef.current.offsetHeight);
    if (ScrollY !== 0) {
      //처음 ref세팅이 늦어서 if조건 걸기
      if (window.scrollY > ScrollY - 300) {
        setShow(true);
      } else {
        setShow(false);
        setProdSelectBtn(false);
      }
    }
  };

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logic);
    }
    watchScroll();

    return () => {
      window.removeEventListener("scroll", logic);
    };
  });

  const navigateLogin = () => {
    return navigate("/login");
  };

  const onGgimBtn = () => {
    if (
      localStorage.getItem("accessToken") === null ||
      localStorage.getItem("accessToken") === ""
    ) {
      setModalOpen(true);
      setModalMessage("로그인하셔야 본 서비스를 이용하실 수 있습니다.");
    } else if (productWish === 1) {
      axios
        .delete("/api/product/wish/del/" + productInfo.wish_item_seq)
        .then((res) => {
          console.log(res);
          setProductWish(0);
        });
    } else if (productWish === 0) {
      axios
        .post("/api/product/wish/add", {
          user_seq: user_seq,
          product_seq: productInfo.product_seq,
          product_view_seq: productInfo.product_view_seq,
          category_seq: productInfo.category_seq,
        })
        .then((res) => {
          console.log(res);
          setProductWish(1);
        });
    }

    return;
  };

  const onCartClick = () => {
    axios
      .post("/api/cart/add", {
        user_seq: user_seq,
        product_seq: productInfo.product_seq,
        product_view_seq: productInfo.product_view_seq,
        products_buy_count: buyCount,
        total_price: parseInt(productInfo.product_price) * buyCount, //물품 총 가격
        total_cart_discount_price:
          parseInt(productInfo.discount_price) * buyCount, //카트 물품 총 할인 가격
        total_accumulate_price:
          parseInt(productInfo.accumulate_price) * buyCount, //적립 가능 가격
      })
      .then((res) => {
        console.log(res);

        axios
          .get("/api/cart/list", { params: { user_seq: user_seq } })
          .then((res) => {
            if (has_product(cart_list, productInfo.product_seq) !== -1) {
              console.log("이미 존재하는 상품입니다.");
              dispatch(
                SELECTED_PRODUCT({
                  stat: "OLD",
                  product_img: productInfo.imgList[0][0].product_img,
                  product_seq: productInfo.product_seq,
                  product_view_title: productInfo.product_view_title,
                })
              );
            } else {
              console.log("새로운 상품 추가하겠습니다");
              dispatch(
                SELECTED_PRODUCT({
                  stat: "NEW",
                  product_img: productInfo.imgList[0][0].product_img,
                  product_seq: productInfo.product_seq,
                  product_view_title: productInfo.product_view_title,
                })
              );
            }
            dispatch(SET_CART_INFO(res.data));
          });
      });
  };
  const has_product = (cartList, product_seq) => {
    let p_seq = cartList.findIndex((a) => a.product_seq === product_seq);
    return p_seq;
  };

  if (productInfo == null) {
    return <div></div>;
  }

  return (
    <>
      <MainHeader />
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          title={modalMessage}
          callBackfn={navigateLogin}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.topContainer} ref={prodInfoRef}>
          <div>
            <img
              className={styles.productImg}
              src={productInfo.imgList[0][0].product_img}
              alt=""
            />
          </div>
          <div className={styles.toprightContainer}>
            <div className={styles.deliv}>샛별배송</div>
            <div className={styles.productName}>
              {productInfo.product_view_title}
              <button className={styles.shareBtn}></button>
            </div>

            <p className={styles.titleDesc}>{productInfo.product_view_desc}</p>

            <div className={styles.productPrice}>
              {productInfo.is_discount === "1" && (
                <span style={{ color: "#FA622F" }}>
                  {productInfo.discount_rate}%
                </span>
              )}
              {productInfo.is_discount === "1" ? (
                <>
                  {" " +
                    parseInt(productInfo.product_discount_price).toLocaleString(
                      "ko-kr"
                    )}
                  <span className={styles.won}>원</span>

                  <p className={styles.originPrice}>
                    {parseInt(productInfo.product_price).toLocaleString(
                      "ko-kr"
                    )}
                    원
                  </p>
                </>
              ) : (
                <>
                  {parseInt(productInfo.product_price).toLocaleString("ko-kr")}
                  <span className={styles.won}>원</span>
                </>
              )}
            </div>

            {localStorage.getItem("accessToken") === null ||
            localStorage.getItem("accessToken") === "" ? (
              <p className={styles.juck}>로그인 후, 적립 혜택이 제공됩니다.</p>
            ) : (
              <p className={styles.juck}>
                개당{" "}
                {parseInt(
                  productInfo.accumulate_price * buyCount
                ).toLocaleString("ko-kr")}
                원 적립
              </p>
            )}

            {productInfo.is_discount && (
              <button className={styles.cpnDownload}>
                카드 쿠폰 다운로드<img className={styles.downloadImg}></img>
              </button>
            )}
            <dl className={styles.dlContainer}>
              <dt>배송</dt>
              <dd>
                <p>샛별배송</p>
                <p>
                  23시 전 주문 시 내일 아침 7시 전 도착
                  <br />
                  대구·부산·울산 샛별배송 운영시간 별도 확인
                </p>
              </dd>
            </dl>
            {detailInfoList.map((item, idx) => {
              return <DetailInfoList key={idx} item={item} />;
            })}

            <dl className={styles.dlContainer}>
              <dt>구매수량</dt>
              <dd>
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
              </dd>
            </dl>
            <div className={styles.priceDiv}>
              <div>
                <span className={styles.totalPriceTitle}>총 상품금액: </span>
                <span className={styles.totalPrice}>
                  {productInfo.is_discount === "1" // 상품 할인이 있으면 1 없으면 0
                    ? parseInt(
                        buyCount * productInfo.product_discount_price
                      ).toLocaleString("ko-kr")
                    : parseInt(
                        buyCount * productInfo.product_price
                      ).toLocaleString("ko-kr")}
                </span>
                <span className={styles.won2}>원</span>
              </div>
              <div>
                <span className={styles.yellowJuck}>적립</span>

                {localStorage.getItem("accessToken") === null ||
                localStorage.getItem("accessToken") === "" ? (
                  <span>로그인 후, 적립 혜택 제공</span>
                ) : (
                  <span>
                    구매 시{" "}
                    {parseInt(
                      productInfo.accumulate_price * buyCount
                    ).toLocaleString("ko-kr")}
                    원 적립
                  </span>
                )}
              </div>
            </div>
            <div className={styles.btnDiv}>
              <span className={styles.ggimBtn} onClick={onGgimBtn}>
                <img
                  className={productWish === 1 ? styles.ggimOn : styles.ggimOff}
                ></img>
              </span>
              <span className={styles.alarmBtn}>
                <img className={styles.disAlarmImg}></img>
              </span>
              <button className={styles.jangbaBtn} onClick={onCartClick}>
                장바구니 담기
              </button>
            </div>
          </div>
        </div>

        <div className={styles.nav}>
          <div onClick={() => goBox(0)} className={styles.div}>
            상품설명
          </div>

          <div onClick={() => goBox(1)} className={styles.div}>
            상세정보
          </div>
          <div onClick={() => goBox(2)} className={styles.div}>
            후기 ({reviewNum})
          </div>
          <div onClick={() => goBox(3)} className={styles.div}>
            문의
          </div>
        </div>

        <div
          className={
            `${styles.fixedDiv}` +
            " " +
            (show === true ? "" : `${styles.hidden}`)
          }
        >
          <div className={styles.relDiv}>
            <button
              className={prodSelectBtn ? styles.fixedBtn2 : styles.fixedBtn1}
              onClick={() => setProdSelectBtn(!prodSelectBtn)}
            >
              <span className={styles.prodSelect}>상품 선택</span>
              <span
                className={prodSelectBtn ? styles.arrowImg2 : styles.arrowImg1}
              ></span>
            </button>
            {prodSelectBtn && (
              <div>
                <div className={styles.flexDiv}>
                  <div>{productInfo.product_view_title}</div>
                  <div className={styles.flexDiv2}>
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
                    <div>
                      {productInfo.is_discount === "1" ? (
                        <>
                          <span className={styles.originPrice2}>
                            {parseInt(productInfo.product_price).toLocaleString(
                              "ko-kr"
                            )}
                            원
                          </span>
                          {" " +
                            parseInt(
                              productInfo.product_discount_price
                            ).toLocaleString("ko-kr")}
                          <span className={styles.won3}>원</span>
                        </>
                      ) : (
                        <>
                          {parseInt(productInfo.product_price).toLocaleString(
                            "ko-kr"
                          )}
                          <span className={styles.won3}>원</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.priceDiv}>
                  <div>
                    <span className={styles.totalPriceTitle}>
                      총 상품금액:{" "}
                    </span>
                    <span className={styles.totalPrice}>
                      {productInfo.is_discount === "1" // 상품 할인이 있으면 1 없으면 0
                        ? parseInt(
                            buyCount * productInfo.product_discount_price
                          ).toLocaleString("ko-kr")
                        : parseInt(
                            buyCount * productInfo.product_price
                          ).toLocaleString("ko-kr")}
                    </span>
                    <span className={styles.won2}>원</span>
                  </div>
                  <div>
                    <span className={styles.yellowJuck}>적립</span>
                    {localStorage.getItem("accessToken") === null ||
                    localStorage.getItem("accessToken") === "" ? (
                      <span>로그인 후, 적립 혜택 제공</span>
                    ) : (
                      <span>
                        구매 시{" "}
                        {parseInt(
                          productInfo.accumulate_price * buyCount
                        ).toLocaleString("ko-kr")}
                        원 적립
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.flexEnd}>
                  <div className={styles.btnDiv2}>
                    <span className={styles.ggimBtn} onClick={onGgimBtn}>
                      <img
                        className={
                          productWish === 1 ? styles.ggimOn : styles.ggimOff
                        }
                      ></img>
                    </span>
                    <span className={styles.alarmBtn}>
                      <img className={styles.disAlarmImg}></img>
                    </span>
                    <button className={styles.jangbaBtn2} onClick={onCartClick}>
                      장바구니 담기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div ref={desc}>
          <ProductDescTab image={productInfo.imgList[0]} />
        </div>

        <div ref={info}>
          <ProductInfoTab image={productInfo.imgList[0]} />
        </div>
        <div ref={review}>
          <ProductReviewTab
            reviewNum={reviewNum}
            product_view_seq={productInfo.product_view_seq}
          />
        </div>
        <div ref={qna}>
          <ProductQnATab
            qaNum={qaNum}
            product_view_seq={productInfo.product_view_seq}
          />
        </div>
      </div>
      <MainFooter />
    </>
  );
}
