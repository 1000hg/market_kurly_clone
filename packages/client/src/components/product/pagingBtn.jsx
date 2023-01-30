import { useEffect, useImperativeHandle } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import styles from "../../css/product/PagingBtn.module.css";

const PagingBtn = ({ totalNum, pageNum, limit, setPageNum }) => {
  let numPages = Math.ceil(totalNum / limit);
  const [firstNum, setFirstNum] = useState(((pageNum - 1) / 10) * 10 + 1);
  const [lastNum, setLastNum] = useState(
    numPages < firstNum + 9 ? numPages : firstNum + 9
  );

  //카테고리 바꿀 떄 값 초기화
  useEffect(() => {
    setPageNum(1);
    setFirstNum(1);
    setLastNum(numPages < firstNum + 9 ? numPages : firstNum + 9);
  }, [totalNum]);

  const page = (option) => {
    if (option === "next") {
      setPageNum(pageNum + 1);
      setFirstNum(lastNum + 1);
      setLastNum(numPages < lastNum + 10 ? numPages : lastNum + 10);
    } else if (option === "pre") {
      setPageNum(pageNum - 1);
      setLastNum(firstNum - 1);
      setFirstNum(firstNum - 1 - 9);
    } else if (option === "first") {
      setPageNum(1);
      setFirstNum(1);
      setLastNum(numPages < 10 ? numPages : 10);
    } else if (option === "last") {
      setPageNum(numPages);
      setLastNum(numPages);
      setFirstNum(Math.floor((numPages - 1) / 10) * 10 + 1);
    }
  };

  return (
    <div>
      <div className={styles.btnContainer}>
        <button
          className={styles.pagingBtn}
          onClick={() => {
            page("first");
          }}
          disabled={pageNum === 1}
        >
          &lt;&lt;
        </button>
        <button
          className={styles.pagingBtn}
          onClick={() => {
            if (pageNum === firstNum) {
              page("pre");
            } else {
              setPageNum(pageNum - 1);
            }
          }}
          disabled={pageNum === 1}
        >
          &lt;
        </button>
        {Array(lastNum - firstNum + 1)
          .fill()
          .map((_, i) => {
            return (
              <button
                className={styles.pagingBtn}
                key={firstNum + i}
                onClick={() => {
                  setPageNum(firstNum + i);
                }}
                aria-current={pageNum === firstNum + i ? "page" : null}
                disabled={pageNum === firstNum + i}
              >
                {firstNum + i}
              </button>
            );
          })}
        <button
          className={styles.pagingBtn}
          onClick={() => {
            if (pageNum === lastNum) {
              page("next");
            } else {
              setPageNum(pageNum + 1);
            }
          }}
          disabled={pageNum === numPages}
        >
          &gt;
        </button>
        <button
          className={styles.pagingBtn}
          onClick={() => {
            page("last");
          }}
          disabled={pageNum === numPages}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};
export default PagingBtn;
