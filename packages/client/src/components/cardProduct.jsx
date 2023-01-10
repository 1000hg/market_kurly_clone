import styles from "../css/CardProduct.module.css";
import { Buffer } from "buffer";

import { useNavigate } from "react-router-dom";

function CardProduct({ item, opt, setModalOpen, setClickedItem }) {
  const navigate = useNavigate();
  const onClick = () => {
    console.log(item.product_view_seq);
    return navigate("/product/detail/" + item.product_view_seq);
  };

  return (
    <div className={styles.crdContainer}>
      <div className={styles.crd}>
        <div
          style={{ width: opt.width, height: opt.height }}
          className={styles.crdBg}
        >
          <img
            onClick={onClick}
            className={styles.crdImg}
            src={
              item.imgList[0].length == 0
                ? null
                : item.imgList[0][0].product_img
            }
            style={{ objectFit: "fill" }}
          />
          <div className={styles.cpnBg}>
            <span className={styles.dcntCpn}>+20%쿠폰</span>
          </div>
          <div
            onClick={() => {
              setModalOpen(true);
              setClickedItem(item);
            }}
            className={styles.crtBg}
          >
            <button
              style={{ right: opt.rem + "rem" }}
              className={
                item.imgList[0].length == 0 ? styles.crtBtnNull : styles.crtBtn
              }
            >
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA0NSA0NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBmaWxsPSIjMkEwMDM4IiBvcGFjaXR5PSIuNSIgY3g9IjIyLjUiIGN5PSIyMi41IiByPSIyMi41Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEuMDMgMTQuMzgpIiBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgICAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjEuNCIgZD0ibTIwLjQ2IDIuOTEtMi4xNyA5LjIzSDUuODdMMy43MSAyLjkxeiIvPgogICAgICAgICAgICA8Y2lyY2xlIHN0cm9rZS13aWR0aD0iMS4yIiBjeD0iMTYuMzUiIGN5PSIxNi44NiIgcj0iMS43Ii8+CiAgICAgICAgICAgIDxjaXJjbGUgc3Ryb2tlLXdpZHRoPSIxLjIiIGN4PSI3LjgyIiBjeT0iMTYuODYiIHI9IjEuNyIvPgogICAgICAgICAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjEuNCIgZD0iTTAgMGgzLjAybDEuNDEgNS45OCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==" />
            </button>
          </div>
        </div>
        <div onClick={onClick} className={styles.cardBody}>
          <span>샛별배송</span>
          <h5 className={styles.crdTitle}>{item.product_view_title}</h5>
          {item.discount_rate === "" ? (
            <>
              <span className={styles.dcntPrice}>
                {parseInt(item.product_price).toLocaleString("ko-kr")} 원
              </span>
              <p className={styles.crdSummary}>{item.product_view_desc}</p>
            </>
          ) : (
            <>
              <span className={styles.dcntRate}>{item.discount_rate}%</span>
              <span className={styles.dcntPrice}>
                {parseInt(item.product_discount_price).toLocaleString("ko-kr")}{" "}
                원
              </span>
              <p className={styles.cancelPrice}>
                {parseInt(item.product_price).toLocaleString("ko-kr")} 원
              </p>
              <p className={styles.crdSummary}>{item.product_view_desc}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
