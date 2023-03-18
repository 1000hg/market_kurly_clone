import MainHeader from "../components/mainHeader";
import MainFooter from "../components/mainFooter";
import CategoryContents from "../components/categoryContents";
import LeftSideBar from "../components/leftSideBar";
import { useEffect, useState } from "react";
import styles from "../css/CategoryContents.module.css";
import axios from "axios";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import GetCategoryList from "../services/category_list";
import qs from "query-string";
import PagingBtn from "../components/product/pagingBtn";

export default function CategoryProductPage({ mykurlyService }) {
  const [item, setItem] = useState();
  const [totalCount, setTotalCount] = useState(null);
  const { category_seq } = useParams();
  const location = useLocation();
  const [childCategorylist, setChildCategorylist] = useState([]);
  const categoryList =
    sessionStorage.getItem("ctl") == null
      ? GetCategoryList()
      : JSON.parse(sessionStorage.getItem("ctl"));
  const [ctitle, setCtitle] = useState("");
  const [isClicked, setIsClicked] = useState([]);
  const [chuchun, setChuchun] = useState(false);
  const [sortArray, setSortArrays] = useState([]);
  const navigate = useNavigate();
  const searchParams = location.search;
  const query = qs.parse(searchParams);
  const [pageNum, setPageNum] = useState(1);

  const paramHandler = () => {
    let params;
    if (query.brand === null || query.brand === undefined) {
      params = {
        category_seq: category_seq,
        page: query.page,
        sort_type: query.sort_type,
      };
    } else {
      params = {
        category_seq: category_seq,
        page: query.page,
        sort_type: query.sort_type,
        brand: query.brand,
      };
    }
    console.log("params: ", params);
    return params;
  };

  const onClickSortType = async (idx) => {
    let temp = Array.from({ length: 6 }, () => false);
    temp[idx] = true;
    setSortArrays(temp);
    console.log("sortArray: ", sortArray);
    let brandCheck = query.brand ? true : false;
    /*
    if (location.pathname.includes("collections")) {
      // if (query.sort_type === null || query.sort_type === undefined) {
      //   navigate(`/collections/market-newproduct?page=1&sort_type=0`);
      // } else {
      //   navigate(`/collections/market-newproduct?page=1&sort_type=${idx}`);
      //   axios
      //     .get("/api/product/view/findCategory", {
      //       params: {
      //         page: query.page,
      //         sort_type: idx,
      //       },
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //       setItem(res.data.responseData.data);
      //     });
      // }
      axios
        .get("/api/product/view/findCategory", {
          params: {
            page: query.page,
            sort_type: idx,
          },
        })
        .then((res) => {
          console.log(res.data);
          setItem(res.data.responseData.data);
          setTotalCount(res.data.responseData.length);
        });
    } else {*/
    if (query.sort_type === null || query.sort_type === undefined) {
      navigate(`/categories/${category_seq}?page=1&sort_type=5`);
    } else if (brandCheck) {
      navigate(
        `/categories/${category_seq}?page=1&sort_type=${idx}&brand=${query.brand}`
      );
      axios
        .get("/api/product/view/findCategory", {
          params: paramHandler(),
        })
        .then((res) => {
          console.log("sort_type brand: ", res.data);
          setItem(res.data.responseData.data);
          setTotalCount(res.data.responseData.length);
        });
    } else {
      navigate(`/categories/${category_seq}?page=1&sort_type=${idx}`);
      axios
        .get("/api/product/view/findCategory", {
          params: paramHandler(),
        })
        .then((res) => {
          console.log("sort_type : ", res.data);
          setItem(res.data.responseData.data);
          setTotalCount(res.data.responseData.length);
        });
    }
    // }
  };

  const makeParams = (type, value) => {
    console.log(query);
  };

  const findParentCategory = (seq) => {
    let checkSeq = categoryList.find((element) => {
      return element.category_seq == seq;
    });
    if (checkSeq.parent_id !== 0) {
      return checkSeq.parent_id; // 자식의 경우 부모카테고리 ID 반환
    } else {
      return seq;
    }
  };

  const findCategoryName = (seq) => {
    let checkSeq = categoryList.find((element) => {
      return element.category_seq == seq;
    });
    return checkSeq.category_name;
  };

  const onClickCategory = (idx) => {
    let temp = Array.from(
      { length: childCategorylist.length + 1 },
      () => false
    );
    temp[idx] = true;
    setIsClicked(temp);
    //childRef.current.updatePageNum();
  };
  // useEffect(() => {
  //   console.log("product_view_seq : " + product_view_seq);
  //   console.log("page : " + pageNum);
  //   axios
  //     .post("/api/review/data/", {
  //       product_view_seq: product_view_seq,
  //       page: pageNum,
  //     })
  //     .then((res) => {
  //       console.log(res.data.responseData);
  //       setItem(res.data.responseData);
  //     })
  //     .catch((e) => console.log(e));
  // }, [pageNum]);

  useEffect(() => {
    if (sessionStorage.getItem("ctl") != null) {
      let seq = findParentCategory(category_seq);
      axios.get("/api/category/childData?categoryIdx=" + seq).then((res) => {
        console.log(res.data.responseData);
        setChildCategorylist(res.data.responseData);
        setCtitle(findCategoryName(seq));
        setIsClicked(
          Array.from({ length: res.data.responseData.length + 1 }, () => false)
        );
      });
    }
  }, [category_seq]);

  useEffect(() => {
    if (query.sort_type === null || query.sort_type === undefined) {
      navigate(`/categories/${category_seq}?page=${pageNum}&sort_type=5`);
    } else {
      navigate(
        `/categories/${category_seq}?page=${pageNum}&sort_type=${query.sort_type}`
      );
    }
  }, [pageNum]);

  useEffect(() => {
    console.log("category_seq: ", category_seq);
    console.log("query = ", query);
    axios
      .get("/api/product/view/findCategory", {
        // if(query == null || query === undefined){
        params: paramHandler(),
      })
      .then((res) => {
        console.log("length : ", res.data);
        setItem(res.data.responseData.data);
        setTotalCount(res.data.responseData.length);
        let defaultArr = Array.from({ length: 6 }, () => false);
        if (query.sort_type === null || query.sort_type === undefined) {
          defaultArr[5] = true;
        } else {
          defaultArr[query.sort_type] = true;
        }
        setSortArrays(defaultArr);
      });
  }, [category_seq, query.page, query.brand]);

  if (item == null) {
    return <div></div>;
  }
  return (
    <>
      <MainHeader />
      <img
        className={styles.banner}
        src="https://product-image.kurly.com/category/banner/pc/95a82daf-98e0-4adf-b82b-3d0b46af462f.jpg"
      ></img>

      <div className={styles.subMenu}>
        <p className={styles.sbTitle}>{ctitle}</p>
        <ul className={styles.categoryList}>
          <li>
            <Link
              to={`/categories/${findParentCategory(
                category_seq
              )}?page=1&sort_type=5`}
              onClick={() => {
                onClickCategory(0);
                makeParams(0, 0);
              }}
              className={
                isClicked[0] || findParentCategory(category_seq) == category_seq
                  ? styles.clicked
                  : ""
              }
            >
              전체보기
            </Link>
          </li>
          {childCategorylist.map((value, idx) => {
            // if (value.category_seq == category_seq) {
            //   console.log(tempIdx);
            //   tempIdx = idx + 1;
            //   console.log("inner tempIdx = ", tempIdx);
            //   console.log("inner idx = ", idx);
            // }
            return (
              <li key={value.category_seq}>
                <Link
                  to={`/categories/${value.category_seq}?page=1&sort_type=5`}
                  onClick={() => {
                    onClickCategory(idx + 1);
                  }}
                  className={
                    isClicked[idx + 1] || value.category_seq == category_seq
                      ? styles.clicked
                      : ""
                  }
                >
                  {value.category_name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.mainContainer}>
        <LeftSideBar category_seq={category_seq} />
        <section className={styles.mainProductSec}>
          <ul className={styles.listOrder}>
            <li className={styles.fontBold}>총 {totalCount}건</li>
            <li
              onClick={() => onClickSortType(3)}
              className={`${styles.chuchun} ${
                sortArray[3] == true ? styles.fontBold : ""
              }`}
            >
              높은 가격순
            </li>
            <li
              onClick={() => onClickSortType(2)}
              className={`${styles.chuchun} ${
                sortArray[2] == true ? styles.fontBold : ""
              }`}
            >
              낮은 가격순
            </li>
            <li
              onClick={() => onClickSortType(4)}
              className={`${styles.chuchun} ${
                sortArray[4] == true ? styles.fontBold : ""
              }`}
            >
              혜택순
            </li>
            <li
              onClick={() => onClickSortType(1)}
              className={`${styles.chuchun} ${
                sortArray[1] == true ? styles.fontBold : ""
              }`}
            >
              판매량순
            </li>
            <li
              onClick={() => onClickSortType(0)}
              className={`${styles.chuchun} ${
                sortArray[0] == true ? styles.fontBold : ""
              }`}
            >
              신상품순
            </li>
            <li
              onClick={() => onClickSortType(5)}
              className={`${styles.chuchun} ${
                sortArray[5] == true ? styles.fontBold : ""
              }`}
            >
              추천순
              <svg
                onMouseOver={() => setChuchun(true)}
                onMouseLeave={() => setChuchun(false)}
                className={styles.chuchunSvg}
                width="14"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.9932 0.700195C8.73506 0.700195 10.3116 1.40557 11.4528 2.54565C12.5943 3.68594 13.3002 5.26111 13.3002 7.0002C13.3002 8.73928 12.5943 10.3145 11.4528 11.4547C10.3116 12.5948 8.73506 13.3002 6.9932 13.3002C5.25512 13.3002 3.68233 12.595 2.54387 11.4554C1.40457 10.315 0.700195 8.73952 0.700195 7.0002C0.700195 5.26087 1.40457 3.68541 2.54387 2.54497C3.68233 1.40537 5.25512 0.700195 6.9932 0.700195Z"
                  stroke="#ccc"
                  strokeWidth="1.4"
                ></path>
                <path
                  d="M4.5 5.21081H5.77027C5.81351 4.55135 6.26216 4.12973 6.95946 4.12973C7.64054 4.12973 8.09459 4.53514 8.09459 5.0973C8.09459 5.58784 7.90383 5.86944 7.35576 6.22524L7.1973 6.32432C6.45135 6.76216 6.13784 7.24865 6.18649 8.05946L6.19189 8.42703H7.44595V8.11892C7.44595 7.58378 7.64595 7.30811 8.35405 6.89189C9.08919 6.45405 9.5 5.87568 9.5 5.04865C9.5 3.85405 8.51081 3 7.02973 3C5.42432 3 4.54324 3.92973 4.5 5.21081ZM6.87838 11.0054C6.33784 11.0054 5.98108 10.6649 5.98108 10.1459C5.98108 9.62162 6.33784 9.28108 6.87838 9.28108C7.42973 9.28108 7.77568 9.62162 7.77568 10.1459C7.77568 10.6649 7.42973 11.0054 6.87838 11.0054Z"
                  fill="#ccc"
                ></path>
              </svg>
              <div
                className={
                  `${styles.chuchunNoti} ` +
                  (chuchun ? `${styles.displayB}` : "")
                }
              >
                소비자 인기도(판매량, 판매금액, 조회수 등), 상품 출시일, 수요
                적합성, 상품 운영상 필요 등을 종합적으로 고려한 순서입니다.
              </div>
            </li>
          </ul>
          <CategoryContents item={item} mykurlyService={mykurlyService} />
          <PagingBtn
            totalNum={totalCount}
            pageNum={pageNum}
            limit={7}
            setPageNum={setPageNum}
          />
        </section>
      </div>

      <MainFooter />
    </>
  );
}
