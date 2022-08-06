import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/info_add_form.module.css';

const Info_add_form = ({ name, option, form_msg, required }) => {
  const [radio_add, setRadio_add] = useState('');
  const [radio_gender, setRadio_gender] = useState('NONE');
  const [inValid, setInValid] = useState('');
  const [yearValid, setYearValid] = useState();
  const [monthValid, setMonthValid] = useState();
  const yearRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  /* 생년월일 숫자만 입력 */
  const checkNumber = (e) => {
    const keyCode = e.keyCode;
    const isValidKey =
      (keyCode >= 48 && keyCode <= 57) || // 숫자 키
      (keyCode >= 96 && keyCode <= 105) || // 키패드 숫자
      keyCode == 37 || // 왼쪽 방향키
      keyCode == 39 || // 오른쪽 방향키
      keyCode == 8 || // 스페이스
      keyCode == 9;
    if (!isValidKey) {
      e.preventDefault();
      return false;
    }
  };

  const handleChange = (e) => {
    /* 생년월일 유효성 검사 */
    if (yearRef.current.value == '') {
      /* 년도 미기입시 */
      if (monthRef.current.value != '' || dayRef.current.value != '') {
        setInValid('태어난 년도 4자리를 정확하게 입력해주세요.');
        return;
      } else if (monthRef.current.value == '' && dayRef.current.value == '') {
        setInValid('');
        return;
      }
    }
    if (e.currentTarget.id == 'year') {
      /*  년도 유효성 검사 */
      const isValid =
        e.currentTarget.value >= 1922 && e.currentTarget.value <= 2007;
      if (isValid) {
        setInValid('태어난 월을 정확하게 입력해주세요.');
        setYearValid(true);
      } else {
        setInValid('태어난 년도 4자리를 정확하게 입력해주세요.');
        setYearValid(false);
      }
    }
    if (e.currentTarget.id == 'month' && yearValid == true) {
      /* 월 유효성 검사 */
      const isValid = e.currentTarget.value >= 1 && e.currentTarget.value <= 12;
      if (isValid) {
        setInValid('태어난 일을 정확하게 입력해주세요.');
        setMonthValid(true);
      } else {
        setInValid('태어난 월을 정확하게 입력해주세요.');
        setMonthValid(false);
      }
    }
    if (
      e.currentTarget.id == 'day' &&
      yearValid == true &&
      monthValid == true
    ) {
      /* 일 유효성 검사 */
      const isValid = e.currentTarget.value >= 1 && e.currentTarget.value <= 31;
      if (isValid) {
        setInValid('');
      } else {
        setInValid('태어난 일을 정확하게 입력해주세요.');
      }
    }
  };

  const changeRadio = (e) => {
    if (e.target.value == 'RECOMMENDER' || e.target.value == 'EVENT') {
      setRadio_add(e.target.value);
    } else {
      setRadio_gender(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelbox}>
        <label className={styles.label}>
          {name}
          {required && (
            <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
          )}{' '}
        </label>
      </div>
      <div className={styles.form}>
        <div className={styles.inputbox}>
          {form_msg && (
            <input
              data-testid='input-box'
              placeholder={form_msg}
              type='text'
              required=''
              className={styles.input}
            />
          )}
          {name == '주소' && (
            <div className={styles.inputbox}>
              <button className={styles.address_btn}>
                <input
                  className={styles.search_icon}
                  type='image'
                  src='https://res.kurly.com/pc/service/cart/2007/ico_search.svg'
                />
                <span>주소 검색</span>
              </button>
            </div>
          )}
          {name == '성별' && (
            <div className={styles.inputbox}>
              <div className={`${styles.input} ${styles.radiobox}`}>
                <label htmlFor='gender-man'>
                  <input
                    type='radio'
                    value='MALE'
                    checked={radio_gender == 'MALE' ? true : false}
                    onChange={changeRadio}
                  />
                  <span>남자</span>
                </label>
                <label htmlFor='gender-woman'>
                  <input
                    type='radio'
                    value='FEMALE'
                    checked={radio_gender == 'FEMALE' ? true : false}
                    onChange={changeRadio}
                  />
                  <span>여자</span>
                </label>
                <label htmlFor='gender-none'>
                  <input
                    type='radio'
                    value='NONE'
                    checked={radio_gender == 'NONE' ? true : false}
                    onChange={changeRadio}
                  />
                  <span>선택안함</span>
                </label>
              </div>
              <div className={styles.notice}></div>
            </div>
          )}
          {name == '생년월일' && (
            <div className={styles.inputbox}>
              <div className={`${styles.input} ${styles.input_birth}`}>
                <div>
                  <input
                    id='year'
                    type='text'
                    placeholder='YYYY'
                    maxLength='4'
                    onKeyUp={checkNumber}
                    onChange={handleChange}
                    ref={yearRef}
                  />
                </div>
                <span>/</span>
                <div>
                  <input
                    id='month'
                    type='text'
                    placeholder='MM'
                    maxLength='2'
                    onKeyUp={checkNumber}
                    onChange={handleChange}
                    ref={monthRef}
                  />
                </div>
                <span>/</span>
                <div>
                  <input
                    id='day'
                    type='text'
                    placeholder='DD'
                    maxLength='2'
                    onKeyUp={checkNumber}
                    onChange={handleChange}
                    ref={dayRef}
                  />
                </div>
              </div>
              <div style={{ padding: '10px 0px' }}>
                <p className={styles.invalid}>{inValid}</p>
              </div>
              <div className={styles.notice}></div>
            </div>
          )}
          {name == '추가사항' && (
            <div className={styles.inputbox}>
              <div
                className={`${styles.input} ${styles.radiobox} ${styles.radiobox_add}`}
              >
                <form className={styles.additional}>
                  <label htmlFor='recommender'>
                    <input
                      type='radio'
                      checked={radio_add == 'RECOMMENDER' ? true : false}
                      value='RECOMMENDER'
                      onChange={changeRadio}
                    />
                    <span>추천인 아이디</span>
                  </label>
                  <label htmlFor='event'>
                    <input
                      type='radio'
                      checked={radio_add == 'EVENT' ? true : false}
                      value='EVENT'
                      onChange={changeRadio}
                    />
                    <span>참여 이벤트명</span>
                  </label>
                </form>
              </div>
            </div>
          )}
        </div>
        {radio_add && (
          <div className={styles.extraInput}>
            <input
              data-testid='input-box'
              placeholder={
                radio_add == 'EVENT'
                  ? '참여 이벤트명을 입력해주세요.'
                  : '추천인 아이디를 입력해주세요'
              }
              type='text'
              required=''
              className={styles.input}
            />
            <span className={styles.extraNotice}>
              추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.
              <br></br>
              가입 이후는 수정이 불가능 합니다. <br></br>대소문자 및 띄어쓰기에
              유의해주세요.
            </span>
          </div>
        )}
      </div>
      {option == 'button' && (
        <div className={styles.buttonbox}>
          <button className={styles.button}>
            <span>중복확인</span>
          </button>
        </div>
      )}
      {option == 'verify' && (
        <div className={styles.buttonbox}>
          <button className={styles.button}>
            <span>인증번호받기</span>
          </button>
        </div>
      )}

      {!option && (
        <div className={styles.buttonbox}>
          <button className={styles.button} style={{ display: 'none' }}>
            <span></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Info_add_form;
