import styles from "../../css/product/ProductDescTab.module.css";

export default function ProductDescTab({ image }) {
  return (
    <div>
      <div>
        {image.length > 1 && (
          <img
            className={styles.productDescImg}
            src={image[1].product_img}
          ></img>
        )}
      </div>
    </div>
  );
}
