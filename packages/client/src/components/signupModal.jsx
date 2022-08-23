import React from 'react';
import styles from '../css/SignupModal.module.css';

const SignupModal = ({ setModalOpen, title }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

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
};

export default SignupModal;
