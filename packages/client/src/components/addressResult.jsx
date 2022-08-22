import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/AddressResult.module.css';

const AddressResult = () => {
  const { state } = useLocation();
  const address = state;
  const navigate = useNavigate();
  const extraAddressRef = useRef();

  const onSearch = () => {
    navigate('/address/shipping-address');
  };
  const onSubmit = () => {
    if (extraAddressRef.current.value == '') {
      console.log('모달창');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <strong>
          <span>낮배송 </span>
          지역입니다.
          <p>오늘 주문하면 다음 날 바로 도착해요. (일요일 휴무)</p>
        </strong>
      </div>
      <div className={styles.address}>
        <p>{address}</p>
        <button onClick={onSearch}>
          <span>
            <img
              src='https://res.kurly.com/pc/service/common/2006/ico_search.svg'
              alt=''
            />
            재검색
          </span>
        </button>
      </div>
      <div className={styles.extraAddress}>
        <div>
          <input
            id='addressDetail'
            name='addressDetail'
            placeholder='나머지 주소를 입력해 주세요'
            type='text'
            height='44'
            ref={extraAddressRef}
          />
        </div>
      </div>
      <div className={styles.notice}>
        <p>
          ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.<br></br>
          로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
        </p>
      </div>
      <button className={styles.submit} onClick={onSubmit}>
        <span>저장</span>
      </button>
    </div>
  );
};

export default AddressResult;
