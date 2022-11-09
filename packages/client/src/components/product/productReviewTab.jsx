import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../../css/product/ProductReviewTab.module.css";
import PagingBtn from "./pagingBtn.jsx";

export default function ProductReviewTab({ reviewNum, product_view_seq }) {
  const [isClicked, setIsClicked] = useState(
    Array.from({ length: 7 }, () => false)
  );

  const [pageNum, setPageNum] = useState(1);
  const [item, setItem] = useState();

  const onClickTable = (idx) => {
    let copy = [...isClicked];
    if (copy[idx] === true) {
      copy[idx] = !copy[idx];
      setIsClicked(copy);
    } else {
      let temp = Array.from({ length: 7 }, () => false);
      temp[idx] = !temp[idx];
      setIsClicked(temp);
    }
  };

  useEffect(() => {
    console.log("product_view_seq : " + product_view_seq);
    console.log("page : " + pageNum);
    axios
      .post("/api/review/data/", {
        product_view_seq: product_view_seq,
        page: pageNum,
      })
      .then((res) => {
        console.log(res.data.responseData);
        setItem(res.data.responseData);
      })
      .catch((e) => console.log(e));
  }, [pageNum]);

  if (item == null) {
    return <div></div>;
  }
  return (
    <>
      <div>
        <p className={styles.prodReviewH}>PRODUCT REVIEW</p>
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
        <div className={styles.prodRevSelDiv}>
          <select className={styles.prodViewSelect}>
            <option>최근등록순</option>
            <option>좋아요많은순</option>
          </select>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tNum}>번호</th>
              <th className={styles.tTitle}>제목</th>
              <th className={styles.tRating}></th>
              <th className={styles.tWriter}>작성자</th>
              <th className={styles.tDate}>작성일</th>
              <th className={styles.tHelp}>도움</th>
            </tr>
          </thead>
          <tbody>
            {item.map((item, idx) => {
              return (
                <>
                  <tr
                    className={`${styles.hoverE} ${styles.whiteSpace}`}
                    onClick={() => onClickTable(idx)}
                  >
                    <td>{item.review_seq}</td>
                    <td>{item.title}</td>
                    <td>{item.등급}</td>
                    <td>{item.작성자}</td>

                    <td>{item.update_dtm.substring(0, 10)}</td>
                    <td>{item.like}</td>
                  </tr>
                  {isClicked[idx] && (
                    <tr>
                      <td className={styles.alignLeft} colSpan={6}>
                        {item.content}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <PagingBtn
        reviewNum={reviewNum}
        pageNum={pageNum}
        limit={7}
        setPageNum={setPageNum}
      />
    </>
  );
}
