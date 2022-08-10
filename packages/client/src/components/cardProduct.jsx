import styles from "../css/CardProduct.module.css";

// function CardProduct({ item }) {
//   return (
//     <div className="col-xxl-3 col-md-6" styles={{ margin: "0 auto" }}>
//       <div className={`card ${styles.crd}`}>
//         <div className={styles.crdBg}>
//           <img
//             src="https://cdn.pixabay.com/photo/2014/12/11/02/55/cereals-563796_960_720.jpg"
//             className="card-img-top"
//             alt="..."
//             style={{ objectFit: "fill" }}
//           />
//         </div>
//         <div className="card-body">
//           <h5 className="card-title">{item.title}</h5>
//           <p className="card-text">{item.content}</p>
//           <a href="#" className="btn btn-primary">
//             Go somewhere
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

function CardProduct({item}) {
  return (
    <div className="col-xxl-3 col-md-3" styles={{ margin: "0 auto" }}>
      <div className={styles.crd}>
        <div className={styles.crdBg}>
          <img
            src="https://cdn.pixabay.com/photo/2014/12/11/02/55/cereals-563796_960_720.jpg"
            className="card-img-top"
            alt="..."
            style={{ objectFit: "fill" }}
          />
          <div className={styles.cpnBg}>
            <span className={styles.dcntCpn}>+20%쿠폰</span>
          </div>
          <div className={styles.crtBg}>
            <button className={styles.crtBtn}><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA0NSA0NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBmaWxsPSIjMkEwMDM4IiBvcGFjaXR5PSIuNSIgY3g9IjIyLjUiIGN5PSIyMi41IiByPSIyMi41Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEuMDMgMTQuMzgpIiBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgICAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjEuNCIgZD0ibTIwLjQ2IDIuOTEtMi4xNyA5LjIzSDUuODdMMy43MSAyLjkxeiIvPgogICAgICAgICAgICA8Y2lyY2xlIHN0cm9rZS13aWR0aD0iMS4yIiBjeD0iMTYuMzUiIGN5PSIxNi44NiIgcj0iMS43Ii8+CiAgICAgICAgICAgIDxjaXJjbGUgc3Ryb2tlLXdpZHRoPSIxLjIiIGN4PSI3LjgyIiBjeT0iMTYuODYiIHI9IjEuNyIvPgogICAgICAgICAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjEuNCIgZD0iTTAgMGgzLjAybDEuNDEgNS45OCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="/></button>
          </div>
        </div>
        <div className="card-body">
          <span>샛별배송</span>
          <h5 className={styles.crdTitle}>{item.product_view_title}</h5>
          {item.discount_rate === ""? 
          <><span className={styles.dcntPrice}>{parseInt(item.product_price).toLocaleString('ko-kr')} 원</span>
          <p className={styles.crdSummary}>{item.product_view_desc}</p></>:
          <><span className={styles.dcntRate}>{item.discount_rate}</span>
          <span className={styles.dcntPrice}>{parseInt(item.discount_price).toLocaleString('ko-kr')} 원</span>
          <p className={styles.cancelPrice}>{parseInt(item.product_price).toLocaleString('ko-kr')} 원</p>
          <p className={styles.crdSummary}>{item.product_view_desc}</p></>
          }
          
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
