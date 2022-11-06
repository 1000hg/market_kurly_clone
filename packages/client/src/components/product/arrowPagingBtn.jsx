import styles from "../../css/product/PagingBtn.module.css";

export default function ArrowPagingBtn({ qaNum, pageNum, limit, setPageNum }) {
  const numPages = Math.ceil(qaNum / limit);
  return (
    <div>
      <div className={styles.btnContainer}>
        <button
          className={styles.aPagingBtn}
          onClick={() => setPageNum(pageNum - 1)}
          disabled={pageNum === 1}
        >
          &lt;
        </button>
        <button
          className={styles.aPagingBtn}
          onClick={() => setPageNum(pageNum + 1)}
          disabled={pageNum === numPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
