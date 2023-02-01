import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/LeftSideBar.module.css";

export default function LeftSideBar({
  category_seq,
  filterSelect,
  setFilterSelect,
}) {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [orderYn, setOrderYn] = useState(true);
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCatagoryData] = useState([]);
  const location = useLocation();

  const onBrandSelectHandler = (brandname) => {
    let copy = filterSelect;

    setFilterSelect(...copy, brandname);
  };

  const onCategorySelectHandler = (brandname) => {
    let copy = filterSelect;

    setFilterSelect(...copy, brandname);
  };

  //경로에서 카테고리가 바뀐 경우
  useEffect(() => {
    axios
      .get("/api/product/getProductBrand?category_seq=" + category_seq)
      .then((res) => {
        console.log("brand : ", res.data.responseData);
        setBrandData(res.data.responseData);
      })
      .catch((e) => console.log(e));
  }, [category_seq]);

  //경로가 collections를 포함하는 경우
  useEffect(() => {
    if (location.pathname.includes("collections")) {
      axios
        .get("/api//product/getProductCategory")
        .then((res) => {
          console.log(res.data.responseData);
          setCatagoryData(res.data.responseData);
        })
        .catch((e) => console.log(e));

      axios
        .get("/api/product/getProductBrand?category_seq=0")
        .then((res) => {
          console.log(res.data.responseData);
          setBrandData(res.data.responseData);
        })
        .catch((e) => console.log(e));
    }
  }, [location]);

  const orderClickHandler = (b) => {
    if (b) {
      setOrderYn(true);

      brandData.sort(function (a, b) {
        return a.brand > b.brand ? 1 : -1;
      });
      setBrandData(brandData);
    } else {
      setOrderYn(false);
      brandData.sort(function (a, b) {
        return b.brand_cnt - a.brand_cnt;
      });
      setBrandData(brandData);
    }
  };

  return (
    <div className={styles.leftBar}>
      <div className={styles.filter}>
        <span className={styles.boldName}>필터</span>
        <button className={styles.resetBtnN}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.78 3.96303C12.504 2.16973 10.4086 1 8.04 1C4.15192 1 1 4.15192 1 8.04C1 11.9281 4.15192 15.08 8.04 15.08C11.9281 15.08 15.08 11.9281 15.08 8.04"
              stroke="#ddd"
              strokeWidth="1.6"
              strokeLinecap="square"
              strokeLinejoin="round"
            ></path>
            <path
              d="M14.4933 1L14.4933 4.52H10.9733"
              stroke="#ddd"
              strokeWidth="1.6"
              strokeLinecap="square"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className={styles.resetContentN}>초기화</span>
        </button>
      </div>
      {location.pathname.includes("collections") && (
        <div>
          <button
            className={styles.listTitle}
            onClick={() => setIsOpen1(!isOpen1)}
          >
            <div className={styles.boldName}>카테고리</div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="#999"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrowEvent}
              style={
                isOpen1
                  ? { transform: "rotate(0deg)" }
                  : { transform: "rotate(180deg)" }
              }
            >
              <path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path>
            </svg>
          </button>
          <ul
            className={styles.filterList}
            style={
              isOpen1
                ? { maxHeight: "100vh", opacity: "1" }
                : { maxHeight: "0", opacity: "0" }
            }
          >
            {categoryData.map((item, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => onCategorySelectHandler(item.brand)}
                >
                  <div>
                    <button className={styles.checkBtn}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                          stroke="#ddd"
                        ></path>
                        <path
                          d="M7 12.6667L10.3846 16L18 8.5"
                          stroke="#ddd"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <span>{item.category_name}</span>
                    <span>{item.category_cnt}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div>
        <button
          className={styles.listTitle}
          onClick={() => setIsOpen2(!isOpen2)}
        >
          <div className={styles.boldName}>브랜드</div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="#999"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.arrowEvent}
            style={
              isOpen2
                ? { transform: "rotate(0deg)" }
                : { transform: "rotate(180deg)" }
            }
          >
            <path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path>
          </svg>
        </button>
        <ul
          className={styles.filterList}
          style={
            isOpen2
              ? { maxHeight: "100vh", opacity: "1" }
              : { maxHeight: "0", opacity: "0" }
          }
        >
          <ol className={styles.orderFilter}>
            <li>
              <button
                onClick={() => orderClickHandler(true)}
                className={orderYn ? `${styles.orderY}` : `${styles.orderN}`}
              >
                가나다 순
              </button>
            </li>
            <li>
              <button
                onClick={() => orderClickHandler(false)}
                className={orderYn ? `${styles.orderN}` : `${styles.orderY}`}
              >
                상품많은 순
              </button>
            </li>
          </ol>

          {brandData.map((item, idx) => {
            return (
              <li key={idx} onClick={() => onBrandSelectHandler(item.brand)}>
                <div>
                  <button className={styles.checkBtn}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                        stroke="#ddd"
                      ></path>
                      <path
                        d="M7 12.6667L10.3846 16L18 8.5"
                        stroke="#ddd"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <span>{item.brand}</span>
                  <span>{item.brand_cnt}</span>
                </div>
              </li>
            );
          })}

          {/* <li>
            <div>
              <button className={styles.checkBtn}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z"
                    stroke="#ddd"
                  ></path>
                  <path
                    d="M7 12.6667L10.3846 16L18 8.5"
                    stroke="#ddd"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <span>건어물상회</span>
              <span>3</span>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
