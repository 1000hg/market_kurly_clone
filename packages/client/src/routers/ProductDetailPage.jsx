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
import { useSelector } from "react-redux";

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
  const desc = useRef();
  const info = useRef();
  const review = useRef();
  const qna = useRef();
  const prodInfoRef = useRef();

  let { user_seq } = useSelector((state) => {
    return state.userData;
  });

  const [reviewItem, setReviewItem] = useState([
    {
      번호: "공지",
      제목: "금주의 Best후기 안내",
      등급: "111",
      작성자: "MarketKurly",
      작성일: "2018-12-22",
      도움: 1,
      내용: " ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다",
    },
    {
      번호: "공지",
      제목: "금주의 Best후기 안내",
      등급: "111",
      작성자: "MarketKurly",
      작성일: "2018-12-22",
      도움: 1,
      내용: " ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다",
    },
    {
      번호: "공지",
      제목: "금주의 Best후기 안내",
      등급: "111",
      작성자: "MarketKurly",
      작성일: "2018-12-22",
      도움: 1,
      내용: " ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다",
    },
    {
      번호: "공지",
      제목: "금주의 Best후기 안내",
      등급: "111",
      작성자: "MarketKurly",
      작성일: "2018-12-22",
      도움: 1,
      내용: " ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다. ■ Best 후기 당첨자 안내 고객님 안녕하세요, 마켓컬리입니다",
    },
  ]);

  const [qnaItem, setQnAItem] = useState([
    {
      제목: "금주의 Best후기 안내",

      작성자: "MarketKurly",
      작성일: "2018-12-22",
      질문: "며칠전 2개 주문했는데 어쩌구 저쩌구\n오쩌구 저쩌구s ㅇㅇㅇㅇㅇㅇ ㄱㄱㄱㄱㄱㄴㅇㄹㄴㅇㄹㅇㄹㄴㅇㅎㄴ ㄴ별로에요.ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ뮤ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
      답변: "안녕하세요 고객님 많은 불편 느끼셨나요? 어쩔 수 없죠. 그냥 드세용 ㅎㅎ. 초록색 바나나는 후숙해서 드셔야 합니다. 몸 상해도 몰라용^^.",
      답변상태: "답변완료",
      답변날짜: "2022.09.12",
      잠금여부: 0,
    },
    {
      제목: "금주의 Best후기 아님",

      작성자: "MarketKurly",
      작성일: "2018-12-22",
      질문: "며칠전 2개 주문했는데 어쩌구 저쩌구오쩌구 저쩌구 ㅇㅇㅇㅇㅇㅇ ㄱㄱㄱㄱㄱㄴㅇㄹㄴㅇㄹㅇㄹㄴㅇㅎㄴ ㄴ별로에요.",
      답변: "",
      답변상태: "-",
      답변날짜: "",
      잠금여부: 0,
    },
    {
      제목: "금주의 Best후기 아님",

      작성자: "MarketKurly",
      작성일: "2018-12-22",
      질문: "며칠전 2개 주문했는데 어쩌구 저쩌구오쩌구 저쩌구 ㅇㅇㅇㅇㅇㅇ ㄱㄱㄱㄱㄱㄴㅇㄹㄴㅇㄹㅇㄹㄴㅇㅎㄴ ㄴ별로에요.",
      답변: "안녕하세요 고객님 많은 불편 느끼셨나요? 어쩔 수 없죠. 그냥 드세용 ㅎㅎ. 초록색 바나나는 후숙해서 드셔야 합니다. 몸 상해도 몰라용^^.",
      답변상태: "답변완료",
      답변날짜: "2022.09.12",
      잠금여부: 1,
    },
  ]);

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
        console.log(res.data.responseData[0]);
        setProductInfo(res.data.responseData[0]);
        setProductWish(res.data.responseData[0].is_wish);
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

  const logit = () => {
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
      window.addEventListener("scroll", logit);
    }
    watchScroll();

    return () => {
      window.removeEventListener("scroll", logit);
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
      setProductWish(0);
      // axios.delete('api/product/del/' + )
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

            <p className={styles.juck}>로그인 후, 적립 혜택이 제공됩니다.</p>

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
                <span>로그인 후, 적립 혜택 제공</span>
              </div>
            </div>
            <div className={styles.btnDiv}>
              <span className={styles.ggimBtn} onClick={onGgimBtn}>
                <img
                  className={productWish === 0 ? styles.ggimOff : styles.ggimOn}
                ></img>
              </span>
              <span className={styles.alarmBtn}>
                <img className={styles.disAlarmImg}></img>
              </span>
              <button className={styles.jangbaBtn}>장바구니 담기</button>
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
            후기 ({reviewItem.length})
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
                    <span>로그인 후, 적립 혜택 제공</span>
                  </div>
                </div>

                <div className={styles.flexEnd}>
                  <div className={styles.btnDiv2}>
                    <span className={styles.ggimBtn} onClick={onGgimBtn}>
                      <img
                        className={
                          productWish === 0 ? styles.ggimOff : styles.ggimOn
                        }
                      ></img>
                    </span>
                    <span className={styles.alarmBtn}>
                      <img className={styles.disAlarmImg}></img>
                    </span>
                    <button className={styles.jangbaBtn2}>장바구니 담기</button>
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
          <ProductReviewTab item={reviewItem} />
        </div>
        <div ref={qna}>
          <ProductQnATab item={qnaItem} />
        </div>
      </div>
      <MainFooter />
    </>
  );
}
