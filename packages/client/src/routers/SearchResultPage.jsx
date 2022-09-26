import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import CardProduct from "../components/cardProduct";

import qs from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

export default function SearchResultPage() {
  const [productName, setProductName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const searchParams = location.search;
  const query = qs.parse(searchParams);

  console.log("searchParams : ", searchParams);
  console.log("query : ", query);
  console.log("query.keyword : ", query.keyword);
  console.log("data : ", data);

  //url경로에 직접 입력한 경우
  useEffect(() => {
    if (data === null || data === "") {
      console.log(query);
      axios
        .get("/api/product/view/search", {
          params: { product_name: query.keyword },
        })
        .then((res) => {
          console.log("주소에 직접 입력 ::: ", res);
          navigate("/product/search?keyword=" + query.keyword, {
            state: res.data,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <>
      <MainHeader />
      {/* <section>
        <div>
          {data.map((item, idx) => {
            return <CardProduct key={idx} item={item} />;
          })}
        </div>
      </section> */}
      <MainFooter />
    </>
  );
}
