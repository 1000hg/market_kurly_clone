import React from "react";
import { useEffect } from "react";
import styles from "../css/Modal.module.css";

const Modal = ({ setModalOpen, title, option, callBackfn }) => {
  console.log(option);
  const closeModal = (e) => {
    e.preventDefault();

    if (callBackfn !== undefined) {
      callBackfn();
    }
    setModalOpen(false);
  };
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow:hidden;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  if (option === undefined || option === "") {
    return (
      <div className={styles.container}>
        <div className={styles.popup}>
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.footer}>
              <button className={styles.button} onClick={closeModal}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (option === "rCfm") {
    return (
      <div className={styles.rmodalBg}>
        <div className={styles.rmodal}>
          <div className={styles.rmodalText}>{title}</div>
          <div className={styles.rmodalDiv}>
            <button className={styles.rmodalButton} onClick={closeModal}>
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
