import styles from "../../css/product/ProductQnATab.module.css";
import ArrowPagingBtn from "./arrowPagingBtn";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductQnATab({ qaNum, product_view_seq }) {
  const [isClicked, setIsClicked] = useState(
    Array.from({ length: 10 }, () => false)
  );
  const [pageNum, setPageNum] = useState(1);
  const [item, setItem] = useState();
  const onClickTable = (idx) => {
    let copy = [...isClicked];
    if (copy[idx] === true) {
      copy[idx] = !copy[idx];
      setIsClicked(copy);
    } else {
      let temp = Array.from({ length: 10 }, () => false);
      temp[idx] = !temp[idx];
      setIsClicked(temp);
    }
  };

  useEffect(() => {
    axios
      .post("/api/qa/data/", {
        page: pageNum,
        product_view_seq: product_view_seq,
      })
      .then((res) => {
        setItem(res.data.responseData);
      })
      .catch((e) => console.log(e));
  }, [pageNum]);

  if (item == null) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        <p className={styles.prodReviewH}>PRODUCT Q&A</p>
        <ul className={styles.prodReviewUl}>
          <li>
            <p>
              상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른
              글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
            </p>
          </li>
          <li>
            <p>
              배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리 내
              1:1 문의에 남겨주세요.
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tTitle}>제목</th>
              <th className={styles.tWriter}>작성자</th>
              <th className={styles.tDate}>작성일</th>
              <th className={styles.tHelp}>답변상태</th>
            </tr>
          </thead>
          <tbody>
            {item.map((item, idx) => {
              return (
                <>
                  <tr onClick={() => onClickTable(idx)}>
                    <td className={styles.alignLeft}>{item.title}</td>

                    <td>{item.writer}</td>

                    <td>{item.update_dtm.substring(0, 10)}</td>
                    <td>{item.status === "0" ? "-" : "답변완료"}</td>
                  </tr>
                  {isClicked[idx] && (
                    <tr className={styles.whiteSpace}>
                      <td className={styles.alignLeft} colSpan={4}>
                        <div className={styles.divContainer}>
                          <div>
                            <span className={styles.icnSpan}>
                              <img className={styles.qIcon} />
                            </span>
                          </div>
                          <div>{item.질문}</div>
                        </div>
                        {item.답변 != "" && (
                          <>
                            <div className={styles.divContainer}>
                              <div>
                                <span className={styles.icnSpan}>
                                  <img className={styles.aIcon} />
                                </span>
                              </div>
                              <div>{item.답변}</div>
                            </div>
                            <div className={styles.answDate}>
                              {item.답변날짜}
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <ArrowPagingBtn
        qaNum={qaNum}
        pageNum={pageNum}
        limit={7}
        setPageNum={setPageNum}
      />
    </div>
  );
}
