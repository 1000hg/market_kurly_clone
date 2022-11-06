import { useState } from "react";
import styles from "../../css/product/PagingBtn.module.css";

export default function PagingBtn({ reviewNum, pageNum, limit, setPageNum }) {
  const numPages = Math.ceil(reviewNum / limit);
  const [firstNum, setFirstNum] = useState(((pageNum - 1) / 10) * 10 + 1);
  const [lastNum, setLastNum] = useState(
    numPages < firstNum + 9 ? numPages : firstNum + 9
  );

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
      setLastNum(10);
    } else if (option === "last") {
      setPageNum(numPages);
      setLastNum(numPages);
      setFirstNum(((lastNum - 1) / 10) * 10 + 2);
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
}
