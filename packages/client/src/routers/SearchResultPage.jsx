import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import CardProduct from "../components/cardProduct";
import styles from "../css/SearchResultPage.module.css";

import qs from "query-string";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

export default function SearchResultPage() {
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const searchParams = location.search;
  const query = qs.parse(searchParams);

  //url경로에 직접 입력한 경우
  useEffect(() => {
    if (data === null || data === "") {
      axios
        .get("/api/product/view/search", {
          params: { product_name: query.keyword },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          // console.log(e);
        });
    }
    /*버튼 클릭으로 검색한 경우
    같은 페이지로 navigate시 리렌더링이 안돼서 keyword변경 시 렌더링 추가.
    */
    setData(location.state);
  }, [query.keyword]);

  return (
    <>
      <MainHeader />
      <div className={styles.resultD}>
        '<span className={styles.resultS}>{query.keyword}</span>'에 대한
        검색결과
      </div>
      <section className={styles.searchProductSec}>
        <div className={styles.searchProductView}>
          {data !== null &&
            data.responseData.map((item, idx) => {
              return <CardProduct key={idx} item={item} opt={0} />;
            })}
        </div>
      </section>
      <MainFooter />
    </>
  );
}
