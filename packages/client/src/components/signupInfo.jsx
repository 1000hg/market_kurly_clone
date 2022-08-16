import React, { useState, useRef, useEffect } from 'react';
import styles from '../css/SignupInfo.module.css';

const SignupInfo = ({ submit, addInfo, data, checkId, checkEmail }) => {
  const [radio_add, setRadio_add] = useState('');
  const [radio_gender, setRadio_gender] = useState('0');
  const [birthValid, setBirthValid] = useState('');
  const [yearValid, setYearValid] = useState();
  const [monthValid, setMonthValid] = useState();
  const [idValid, setIdValid] = useState();
  const [pwValid, setPwValid] = useState();
  const [pwCheckValid, setPwCheckValid] = useState();
  const [nameValid, setNameValid] = useState();
  const [emailValid, setEmailValid] = useState();
  const [phoneValid, setPhoneValid] = useState();
  const [addressValid, setAddressValid] = useState();
  const yearRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const idRef = useRef();
  const nameRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const [info, setInfo] = useState({
    ...data,
    user_id: 'choi',
    user_password: '1111',
  });
  const submitId = () => {
    const info = {
      user_id: idRef.current.value,
    };
    checkId(info);
  };
  const submitEmail = () => {
    const info = {
      user_mail: emailRef.current.value,
    };
    checkEmail(info);
  };
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

  const checkBirth = (e) => {
    /* 생년월일 유효성 검사 */
    if (yearRef.current.value == '') {
      /* 년도 미기입시 */
      if (monthRef.current.value != '' || dayRef.current.value != '') {
        setBirthValid('태어난 년도 4자리를 정확하게 입력해주세요.');
        return;
      } else if (monthRef.current.value == '' && dayRef.current.value == '') {
        setBirthValid('');
        return;
      }
    }
    if (e.currentTarget.id == 'year') {
      /*  년도 유효성 검사 */
      const isValid =
        e.currentTarget.value >= 1922 && e.currentTarget.value <= 2007;
      if (isValid) {
        setBirthValid('태어난 월을 정확하게 입력해주세요.');
        setYearValid(true);
      } else {
        setBirthValid('태어난 년도 4자리를 정확하게 입력해주세요.');
        setYearValid(false);
      }
    }
    if (e.currentTarget.id == 'month' && yearValid == true) {
      /* 월 유효성 검사 */
      const isValid = e.currentTarget.value >= 1 && e.currentTarget.value <= 12;
      if (isValid) {
        setBirthValid('태어난 일을 정확하게 입력해주세요.');
        setMonthValid(true);
      } else {
        setBirthValid('태어난 월을 정확하게 입력해주세요.');
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
        setBirthValid('');
      } else {
        setBirthValid('태어난 일을 정확하게 입력해주세요.');
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
  const handleOnInput = (event) => {
    if (event.currentTarget.id == 'ID') {
      const idRegex = /^[a-zA-Z0-9]+$/;
      if (
        event.currentTarget.value.length < 6 ||
        !idRegex.test(event.currentTarget.value)
      ) {
        setIdValid(false);
      } else {
        setIdValid(true);
      }
    }
    if (event.currentTarget.id == 'PW') {
      if (event.currentTarget.value.length < 10) {
        setPwValid('LENGTH');
      } else {
        const pwRegex = /^(?=.*?[a-zA-Z])(?=.*?[0-9#?!@$ %^&*-]).{10,}$/;
        if (!pwRegex.test(event.currentTarget.value)) {
          setPwValid(false);
        } else {
          setPwValid(true);
        }
      }
    }
    if (event.currentTarget.id == 'PWCHECK') {
      if (event.currentTarget.value != pwRef.current.value) {
        setPwCheckValid(false);
      } else {
        setPwCheckValid(true);
      }
    }
    if (event.currentTarget.id == 'NAME') {
      const nameRegex = /^[가-힣a-zA-Z0-9]+$/;
      if (!nameRegex.test(event.currentTarget.value)) {
        setNameValid(false);
      } else {
        setNameValid(true);
      }
    }
    if (event.currentTarget.id == 'EMAIL') {
      const emailRegex =
        /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
      if (!emailRegex.test(event.currentTarget.value)) {
        setEmailValid(false);
      } else {
        setEmailValid(true);
      }
    }
    if (event.currentTarget.id == 'PHONE') {
      const phoneRegex = /^[0-9]+$/;
      if (!phoneRegex.test(event.currentTarget.value)) {
        setPhoneValid(false);
      } else {
        setPhoneValid(true);
      }
    }
  };

  useEffect(() => {
    if (submit == true) {
      addInfo({
        user_id: idRef.current.value,
        user_password: pwRef.current.value,
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
      console.log({
        user_id: idRef.current.value,
        user_password: pwRef.current.value,
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
    }
  }, [submit]);
  /* 생년월일 숫자만 입력 */

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
                id='ID'
                data-testid='input-box'
                placeholder='아이디를 입력해주세요'
                type='text'
                className={styles.input}
                ref={idRef}
                onChange={handleOnInput}
              />
              {idValid == false && (
                <div className={styles.inValid}>
                  <p>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} onClick={submitId}>
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
                id='PW'
                data-testid='input-box'
                placeholder='비밀번호를 입력해주세요'
                type='password'
                className={styles.input}
                ref={pwRef}
                onChange={handleOnInput}
              />
              {pwValid == 'LENGTH' && (
                <div className={styles.inValid}>
                  <p>최소 10자 이상 입력</p>
                </div>
              )}
              {pwValid == false && (
                <div className={styles.inValid}>
                  <p>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                </div>
              )}
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
                id='PWCHECK'
                data-testid='input-box'
                placeholder='비밀번호를 입력해주세요'
                type='password'
                className={styles.input}
                ref={pwCheckRef}
                onChange={handleOnInput}
              />
              {pwCheckValid == false && (
                <div className={styles.inValid}>
                  <p>동일한 비밀번호를 입력</p>
                </div>
              )}
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
                id='NAME'
                data-testid='input-box'
                placeholder='이름을 입력해주세요'
                type='text'
                className={styles.input}
                ref={nameRef}
                onChange={handleOnInput}
              />
              {nameValid == false && (
                <div className={styles.inValid}>
                  <p>이름을 입력해 주세요.</p>
                </div>
              )}
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
                id='EMAIL'
                data-testid='input-box'
                placeholder='예:marketkurly@kurly.com'
                type='text'
                className={styles.input}
                ref={emailRef}
                onChange={handleOnInput}
              />
              {emailValid == false && (
                <div className={styles.inValid}>
                  <p>이메일 형식으로 입력해 주세요.</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} onClick={submitEmail}>
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
                id='PHONE'
                data-testid='input-box'
                placeholder='숫자만 입력해주세요'
                type='text'
                className={styles.input}
                ref={phoneRef}
                onChange={handleOnInput}
              />
              {phoneValid == false && (
                <div className={styles.inValid}>
                  <p>휴대폰 번호를 입력해 주세요.</p>
                </div>
              )}
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
              <button
                className={styles.address_btn}
                onClick={() =>
                  window.open(
                    'http://localhost:3000/address/shipping-address',
                    '주소검색',
                    'width=530, height=569, _blank'
                  )
                }
              >
                <input
                  id='ADDRESS'
                  className={styles.search_icon}
                  type='image'
                  src='https://res.kurly.com/pc/service/cart/2007/ico_search.svg'
                />
                <span>주소 검색</span>
              </button>
              <p>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
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
                    onChange={checkBirth}
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
                    onChange={checkBirth}
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
                    onChange={checkBirth}
                    ref={dayRef}
                  />
                </div>
              </div>
              {birthValid != '' && (
                <div className={styles.inValid}>
                  <p>{birthValid}</p>
                </div>
              )}
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
