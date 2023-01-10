import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/CategoryMenu.module.css";
import { menuIcons } from "../menuIcons";

export default function CategoryMenu({ setNavMenu }) {
  const categoryList = JSON.parse(sessionStorage.getItem("ctl"));
  const [subCategory, setSubCategory] = useState([]);
  const [subWidth, setSubWidth] = useState("0");
  const [subOpa, setSubOpa] = useState(false);
  const menuItemsRef = useRef([]);
  const navigate = useNavigate();

  const onMouseOverHandler = (pseq) => {
    setSubCategory(categoryList.filter((element) => element.parent_id == pseq));
    menuItemsRef.current[pseq].src = menuIcons.active[pseq];
  };

  const onMouseLeaveHandler = (pseq) => {
    menuItemsRef.current[pseq].src = menuIcons.inactive[pseq];
  };
  return (
    <div
      className={styles.parentDiv}
      onMouseLeave={() => {
        setNavMenu(false);
        setSubWidth("0");
      }}
      onMouseOver={() => setSubWidth("266px")}
    >
      <div className={styles.mainDropdown}>
        <ul>
          {categoryList
            .filter((element) => element.parent_id == 0)
            .map((item, idx) => {
              return (
                <li
                  className={styles.menuItems}
                  key={idx}
                  onClick={() => navigate("/categories/" + item.category_seq)}
                  onMouseOver={() => {
                    onMouseOverHandler(item.category_seq);

                    setSubOpa(true);
                  }}
                  onMouseLeave={() => {
                    onMouseLeaveHandler(item.category_seq);
                    setSubOpa(false);
                  }}
                >
                  <div>
                    <img
                      className={styles.menuIcon}
                      src={menuIcons.inactive[`${item.category_seq}`]}
                      ref={(element) => {
                        menuItemsRef.current[item.category_seq] = element;
                      }}
                    />
                    <span> {item.category_name}</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div style={{ width: subWidth }} className={styles.subDropdown}>
        <ul>
          {subCategory.map((item, idx) => {
            return (
              <li
                key={idx}
                className={styles.subItems}
                onClick={() => navigate("/categories/" + item.category_seq)}
              >
                {item.category_name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
