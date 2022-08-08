import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/SignupInfo.module.css';

const SignupInfo = ({ submit, addInfo, data }) => {
  const [radio_add, setRadio_add] = useState('');
  const [radio_gender, setRadio_gender] = useState('0');
  const [inValid, setInValid] = useState('');
  const [yearValid, setYearValid] = useState();
  const [monthValid, setMonthValid] = useState();
  const yearRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const idRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const password_ConfirmRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const birthRef = useRef();
  const additionRef = useRef();

  // user_id: 'albert',
  // user_password: '1234',
  // user_name: 'albert',
  // user_email: '1234567@naver.com',
  // user_phone: '010-1111-1111',
  // zip_code: '',
  // address: '서울특별시 서울구 서울동',
  // address_detail: '',
  // user_birth: '20010101',
  // gender: '0',
  // reffer_id: '',
  // join_event_name: '',
  const [info, setInfo] = useState({
    ...data,
    user_id: 'choi',
    user_password: '1111',
  });

  useEffect(() => {
    if (submit == true) {
      addInfo({
        user_id: idRef.current.value,
        user_password: passwordRef.current.value,
        user_name: nameRef.current.value,
        user_email: emailRef.current.value,
        user_phone: phoneRef.current.value,
        zip_code: '',
        address: '서울특별시 서울구 서울동',
        address_detail: '',
        user_birth:
          yearRef.current.value + monthRef.current.value + dayRef.current.value,
        gender: '0',
        reffer_id: '',
        join_event_name: '',
      });
    }
    console.log({
      user_id: idRef.current.value,
      user_password: passwordRef.current.value,
      user_name: nameRef.current.value,
      user_email: emailRef.current.value,
      user_phone: phoneRef.current.value,
      zip_code: '',
      address: '',
      address_detail: '',
      user_birth:
        yearRef.current.value + monthRef.current.value + dayRef.current.value,
      gender: '',
      reffer_id: '',
      join_event_name: '',
    });
  }, [submit]);
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
      <div className={styles.lists}>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>
              아이디
              <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
            </label>
          </div>
          <div className={styles.form}>
            <div className={styles.inputbox}>
              <input
                data-testid='input-box'
                placeholder='아이디를 입력해주세요'
                type='text'
                required=''
                className={styles.input}
                ref={idRef}
              />
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button}>
              <span>중복확인</span>
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>
              비밀번호
              <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
            </label>
          </div>
          <div className={styles.form}>
            <div className={styles.inputbox}>
              <input
                data-testid='input-box'
                placeholder='비밀번호를 입력해주세요'
                type='text'
                required=''
                className={styles.input}
                ref={passwordRef}
              />
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} style={{ display: 'none' }}>
              <span></span>
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>
              비밀번호확인
              <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
            </label>
          </div>
          <div className={styles.form}>
            <div className={styles.inputbox}>
              <input
                data-testid='input-box'
                placeholder='비밀번호를 입력해주세요'
                type='text'
                required=''
                className={styles.input}
                ref={password_ConfirmRef}
              />
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} style={{ display: 'none' }}>
              <span></span>
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>
              이름
              <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
            </label>
          </div>
          <div className={styles.form}>
            <div className={styles.inputbox}>
              <input
                data-testid='input-box'
                placeholder='이름을 입력해주세요'
                type='text'
                required=''
                className={styles.input}
                ref={nameRef}
              />
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} style={{ display: 'none' }}>
              <span></span>
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>
              이메일
              <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
            </label>
          </div>
          <div className={styles.form}>
            <div className={styles.inputbox}>
              <input
                data-testid='input-box'
                placeholder='예:marketkurly@kurly.com'
                type='text'
                required=''
                className={styles.input}
                ref={emailRef}
              />
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button}>
              <span>중복확인</span>
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>
              휴대폰
              <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
            </label>
          </div>
          <div className={styles.form}>
            <div className={styles.inputbox}>
              <input
                data-testid='input-box'
                placeholder='숫자만 입력해주세요'
                type='text'
                required=''
                className={styles.input}
                ref={phoneRef}
              />
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button}>
              <span>인증번호받기</span>
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>
              주소
              <span style={{ color: 'rgb(238, 106, 123)' }}>*</span>
            </label>
          </div>
          <div className={styles.form}>
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
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} style={{ display: 'none' }}>
              <span></span>
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>성별</label>
          </div>
          <div className={styles.form}>
            <div className={styles.inputbox}>
              <div className={`${styles.input} ${styles.radiobox}`}>
                <label htmlFor='gender-man'>
                  <input
                    type='radio'
                    value='1'
                    checked={radio_gender == '1' ? true : false}
                    onChange={changeRadio}
                  />
                  <span>남자</span>
                </label>
                <label htmlFor='gender-woman'>
                  <input
                    type='radio'
                    value='2'
                    checked={radio_gender == '2' ? true : false}
                    onChange={changeRadio}
                  />
                  <span>여자</span>
                </label>
                <label htmlFor='gender-none'>
                  <input
                    type='radio'
                    value='0'
                    checked={radio_gender == '0' ? true : false}
                    onChange={changeRadio}
                  />
                  <span>선택안함</span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} style={{ display: 'none' }}>
              <span></span>
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>생년월일</label>
          </div>
          <div className={styles.form}>
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
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} style={{ display: 'none' }}>
              <span></span>
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.labelbox}>
            <label className={styles.label}>추가사항</label>
          </div>
          <div className={styles.form}>
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
                  가입 이후는 수정이 불가능 합니다. <br></br>대소문자 및
                  띄어쓰기에 유의해주세요.
                </span>
              </div>
            )}
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} style={{ display: 'none' }}>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupInfo;
