import MenuItems from "./MenuItems";
import styles from "../css/Dropdown.module.css";
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? `${styles.dropdown_submenu}` : '';
  return (
    <ul
      className={`dropdown ${styles.drdwn} ${dropdownClass} ${
        dropdown ? `${styles.show}` : ''
      }`}
    >
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;
