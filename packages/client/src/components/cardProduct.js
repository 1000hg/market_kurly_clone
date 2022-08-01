import styles from "../css/CardProduct.module.css";

function CardProduct({ item }) {
  return (
    <div className="col-xxl-3 col-md-6" styles={{ margin: "0 auto" }}>
      <div className={`card ${styles.crd}`}>
        <div className={styles.crdBg}>
          <img
            src="https://cdn.pixabay.com/photo/2014/12/11/02/55/cereals-563796_960_720.jpg"
            className="card-img-top"
            alt="..."
            style={{ objectFit: "fill" }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">{item.content}</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
