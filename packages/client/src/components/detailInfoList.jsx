import styles from "../css/ProductDetailPage.module.css";

export default function detailInfoList({ item }) {
  if (item.value !== null && item.value !== "") {
    console.log(item.value.length);
    if (Array.isArray(item.value)) {
      return (
        <>
          <dl className={styles.dlContainer}>
            <dt>{item.key}</dt>
            <dd>
              <p>{item.value[0]}</p>
              <p>{item.value[1]}</p>
            </dd>
          </dl>
        </>
      );
    } else {
      return (
        <>
          <dl className={styles.dlContainer}>
            <dt>{item.key}</dt>
            <dd>
              <p>{item.value}</p>
            </dd>
          </dl>
        </>
      );
    }
  }
  /* <dl className={styles.dlContainer}>
        <dt>포장타임</dt>
        <dd>
          <p>상온(종이포장)</p>
          <p>택배배송은 에코 포장이 스티로폼으로 대체됩니다.</p>
        </dd>
      </dl>
      <dl className={styles.dlContainer}>
        <dt>판매단위</dt>
        <dd>
          <p>1박스</p>
        </dd>
      </dl>
      <dl className={styles.dlContainer}>
        <dt>중량/용량</dt>
        <dd>
          <p>2L X 6병입</p>
        </dd>
      </dl>
      <dl className={styles.dlContainer}>
        <dt>안내사항</dt>
        <dd>
          <p>- 생수/탄산수의 1일 구매 최대 용량은 36리터 혹은 3개까지입니다.</p>
          <p>
            - 용량 혹은 수량 초과 상품은 배송 되지 않을 수 있으며, 배송 되지
            않은 상품은 익일(주말/공휴일제외) 환불 해 드리겠습니다.
          </p>
          <p>
            - 본 정책은 배송 매니저님의 안전과 건강을 위해 시행하게 되었습니다.
            고객님의 양해를 부탁 드립니다.
          </p>
        </dd>
      </dl> */
}
