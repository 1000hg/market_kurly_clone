import React from "react";
import styles from "../css/ProductDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import DetailInfoList from "../components/detailInfoList";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { product_view_seq } = useParams();
  const [productInfo, setProductInfo] = useState();
  const [detailInfoList, setDetailInfoList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/product/view/product/" + product_view_seq)
      .then((res) => {
        setProductInfo(res.data.responseData[0]);
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

  return (
    <>
      <div className={styles.topContainer}>
        <div>
          <img
            className={styles.productImg}
            src="https://m.doremicat.co.kr/web/upload/NNEditor/20220824/611ffa3a19887c026d1c0adfa2a67d44.jpg"
            alt=""
          />
        </div>
        <div className={styles.toprightContainer}>
          <div className={styles.deliv}>샛별배송</div>
          <div className={styles.productName}>
            [평창수] 생수 (2L X 6개){" "}
            <button className={styles.shareBtn}></button>
          </div>

          <p className={styles.titleDesc}>평창의 청량함을 담은</p>
          <div className={styles.productPrice}>
            3,900<span className={styles.won}>원</span>
          </div>
          <p className={styles.juck}>로그인 후, 적립 혜택이 제공됩니다.</p>
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
                <button className={styles.countBtn}>-</button>
                <div className={styles.count}>1</div>
                <button className={styles.countBtn}>+</button>
              </div>
            </dd>
          </dl>
          <div className={styles.priceDiv}>
            <div>
              <span className={styles.totalPriceTitle}>총 상품금액: </span>
              <span className={styles.totalPrice}>3,900</span>
              <span className={styles.won2}>원</span>
            </div>
            <div>
              <span className={styles.yellowJuck}>적립</span>
              <span>로그인 후, 적립 혜택 제공</span>
            </div>
          </div>
          <div className={styles.btnDiv}>
            <span className={styles.ggimBtn}>
              <img className={styles.ggimImg}></img>
            </span>
            <span className={styles.alarmBtn}>
              <img className={styles.disAlarmImg}></img>
            </span>
            <button className={styles.jangbaBtn}>장바구니 담기</button>
          </div>
        </div>
      </div>
    </>
  );
}
