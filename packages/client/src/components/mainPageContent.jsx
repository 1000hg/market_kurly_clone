import styles from "../css/MainPageContent.module.css";
import CardProduct from "./cardProduct";
import { useState, useEffect } from "react";
import axios from "axios";

function MainPageContent() {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: result } = await axios.get("http://localhost:8080/product/view/list");
      setItemList(result.responseData[0]);
    })();
  }, []);
  return (
    <>
      <div className="container-fluid" style={{ padding: 0 }}>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className={"carousel-item active " + `${styles.bnrCrs}`}>
              <a
                href="#"
                style={{
                  backgroundImage: `url(
                    "https://img-cf.kurly.com/banner/main/pc/img/9d46a2e1-ec96-4000-8639-85758eccee84"
                  )`,
                }}
              ></a>
            </div>
            <div className={"carousel-item " + `${styles.bnrCrs}`}>
              <a
                href="#"
                style={{
                  backgroundImage: `url('https://img-cf.kurly.com/banner/main/pc/img/fbcf176c-3e62-4b44-87a9-b0904abcd979')`,
                }}
              ></a>
            </div>
            <div className={"carousel-item " + `${styles.bnrCrs}`}>
              <a
                href="#"
                style={{
                  backgroundImage: `url('https://img-cf.kurly.com/banner/main/pc/img/9d4c161a-bd67-456a-a7a6-0f0244b5da94')`,
                }}
              ></a>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <p className={styles.sbTitle}>이 상품 어때요?</p>
      <section className="container">
        <div className={`row justify-content-around`}>
          {itemList.map((item, idx) => {
            return <CardProduct item={item} />;
          })}
         
        </div>
      </section>
    </>
  );
}

export default MainPageContent;
