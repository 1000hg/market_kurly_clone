import CardProduct from "../components/cardProduct";
import styles from "../css/CategoryContents.module.css";
import { useState, useEffect } from "react";
import CartModal from "./cartModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export default function CategoryContents({
  item,

  mykurlyService,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  // useEffect(() => {
  //   onClickSortType(query.sort_type);
  // }, [query.sort_type]);

  if (item == null) {
    return <div></div>;
  }
  return (
    <div>
      <div className={styles.mainProductView}>
        {item !== null &&
          item.map((item, idx) => {
            return (
              <CardProduct
                key={idx}
                item={item}
                setModalOpen={setModalOpen}
                setClickedItem={setClickedItem}
                opt={{ width: "250px", height: "320px" }}
              />
            );
          })}
      </div>
      {modalOpen == true && (
        <CartModal
          clickedItem={clickedItem}
          setModalOpen={setModalOpen}
          mykurlyService={mykurlyService}
        />
      )}
    </div>
  );
}
