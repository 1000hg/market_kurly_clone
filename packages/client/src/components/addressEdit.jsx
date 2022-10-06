import React from 'react';
import { useState } from 'react';
import styles from '../css/mykurly/AddressEdit.module.css';

const AddressEdit = ({ mykurlyService }) => {
  const [checked, setChecked] = useState(false);
  const [inputs, setInputs] = useState({
    addressDetail: '',
    receiver: '',
    phone: '',
  });
  const { addressDetail, receiver, phone } = inputs;
  const onCheck = () => {
    setChecked(!checked);
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <section className={styles.container}>
      <div className={styles.title}>배송지 수정</div>
      <div className={styles.wrapper}>
        <div>
          <p className={styles.address}>주소</p>
          <input
            className={styles.input}
            name='addressDetail'
            placeholder='나머지 주소를 입력해 주세요'
            type='text'
            height='44'
            onChange={handleChange}
            value={addressDetail}
          />
        </div>
        <div className={styles.field}>
          <p className={styles.p}>받으실 분</p>
          <input
            className={styles.input}
            name='receiver'
            placeholder='이름을 입력해주세요'
            type='text'
            height='44'
            onChange={handleChange}
            value={receiver}
          />
        </div>
        <div className={styles.field}>
          <p className={styles.p}>휴대폰</p>

          <input
            className={styles.input}
            name='phone'
            placeholder='번호를 입력해주세요'
            type='text'
            height='44'
            onChange={handleChange}
            value={phone}
          />
        </div>
        <div className={styles.label} onClick={onCheck}>
          <input type='checkbox' className={styles.checkbox} />
          <span
            className={checked == false ? styles.icon : styles.checked}
          ></span>
          기본 배송지로 저장
        </div>
        <button className={styles.save_btn}>저장</button>
        <button className={styles.delete_btn}>삭제</button>
      </div>
    </section>
  );
};

export default AddressEdit;
