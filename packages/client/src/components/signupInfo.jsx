import React, { useState, useRef, useEffect } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import SignupModal from './signupModal';
import styles from '../css/SignupInfo.module.css';

const SignupInfo = ({ submit, setSubmit, authService }) => {
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  );
  const [data, setData] = useState({
    user_id: 'albert',
    user_password: '1234',
    user_name: 'albert',
    user_email: '1234567@naver.com',
    user_phone: '010-1111-1111',
    zip_code: '',
    address: '서울특별시 서울구 서울동',
    address_detail: '',
    user_birth: '20010101',
    gender: '0',
    reffer_id: '',
    join_event_name: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [radio_add, setRadio_add] = useState('');
  const [radio_gender, setRadio_gender] = useState('0');
  const [birthValid, setBirthValid] = useState('');
  const [yearValid, setYearValid] = useState();
  const [monthValid, setMonthValid] = useState();
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState();
  const [pwCheckValid, setPwCheckValid] = useState();
  const [nameValid, setNameValid] = useState();
  const [emailValid, setEmailValid] = useState();
  const [phoneValid, setPhoneValid] = useState();
  const [addressValid, setAddressValid] = useState(false);
  const [addressValue, setAddressValue] = useState();
  const [modalMessage, setModalMessage] = useState();
  const [zipCode, setZipCode] = useState();
  const yearRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const idRef = useRef();
  const nameRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const extraAddressRef = useRef('');
  const eventNameRef = useRef('');
  const refferIdRef = useRef('');
  const submitId = () => {
    const idRegex = /^[a-zA-Z0-9]+$/;
    if (
      idRef.current.value.length < 6 ||
      idRef.current.value.length > 16 ||
      !idRegex.test(idRef.current.value)
    ) {
      showModal();
      setModalMessage('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
    } else {
      const info = {
        user_id: idRef.current.value,
      };
      checkId(info);
    }
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
  const checkId = (info) => {
    const response = authService.signupIdCheck(info);
    response.then((data) => setIdValid(data));
    if (idValid == true) {
      showModal();
      setModalMessage('사용 할 수 있는 아이디 입니다');
    } else if (idValid == false) {
      showModal();
      setModalMessage('사용 불가능한 아이디 입니다');
    }
  };
  const checkEmail = (info) => {
    const response = authService.signupEmailCheck(info);
    response.then((data) => setEmailValid(data));
    if (idValid == true) {
      showModal();
      setModalMessage('사용 할 수 있는 이메일 입니다');
    } else if (idValid == false) {
      showModal();
      setModalMessage('사용 불가능한 이메일 입니다');
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
        idRef.current.value.length > 16 ||
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
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(fullAddress);
    setAddressValue(fullAddress);
    setAddressValid(true);
    setZipCode(data.zonecode);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete, popupKey: 'Address' });
  };
  const showModal = () => {
    setModalOpen(true);
    setSubmit(false);
  };

  useEffect(() => {
    if (submit == true) {
      if (idValid == false) {
        showModal();
        setModalMessage('아이디 중복 체크를 해주세요.');
      } else if (emailValid == false) {
        showModal();
        setModalMessage('이메일 중복 체크를 해주세요.');
      } else if (phoneValid == false) {
        showModal();
        setModalMessage('휴대폰 인증을 진행해 주세요.');
      } else if (pwValid == false) {
        showModal();
        setModalMessage('최소 10자 이상 입력');
      } else if (pwCheckValid == false) {
        showModal();
        setModalMessage('동일한 비밀번호를 입력');
      } else if (nameValid == false) {
        showModal();
        setModalMessage('이름을 입력해 주세요');
      } else if (addressValid == false) {
        showModal();
        setModalMessage('주소를 검색하여 입력해 주세요.');
      } else {
        setData({
          user_id: idRef.current.value,
          user_password: pwRef.current.value,
          user_name: nameRef.current.value,
          user_email: emailRef.current.value,
          user_phone: phoneRef.current.value,
          zip_code: zipCode,
          address: addressValue,
          address_detail: extraAddressRef.current.value,
          user_birth:
            yearRef.current.value +
            monthRef.current.value +
            dayRef.current.value,
          gender: radio_gender,
          reffer_id: refferIdRef.current.value,
          join_event_name: eventNameRef.current.value,
        });
        authService.postSignup(data);
        authService.signIn({
          user_id: idRef.current.value,
          user_password: pwRef.current.value,
        });
      }
    }
  }, [submit]);

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
              {addressValid == false && (
                <button className={styles.address_btn} onClick={handleClick}>
                  <input
                    id='ADDRESS'
                    className={styles.search_icon}
                    type='image'
                    src='https://res.kurly.com/pc/service/cart/2007/ico_search.svg'
                  />
                  <span>주소 검색</span>
                </button>
              )}
              <div className={styles.form}>
                {addressValid == true && (
                  <div className={styles.inputbox}>
                    <div className={styles.extraAddress_inputbox}>
                      <div>
                        <input
                          id='ADDRESS'
                          data-testid='input-box'
                          type='text'
                          className={styles.input}
                          readOnly
                          value={addressValue}
                        />
                      </div>
                      <div>
                        <input
                          id='EXTRA_ADDRESS'
                          data-testid='input-box'
                          type='text'
                          className={styles.input}
                          ref={extraAddressRef}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className={styles.address_p} style={{ fontWeight: '600' }}>
                택배배송
              </p>
              <p className={styles.address_p}>
                배송지에 따라 상품 정보가 달라질 수 있습니다.
              </p>
            </div>
          </div>
          {addressValid == true && (
            <div className={styles.buttonbox}>
              <button className={styles.button} onClick={handleClick}>
                <span>
                  <img
                    src='https://res.kurly.com/pc/service/cart/2007/ico_search.svg'
                    alt=''
                  />
                  재검색
                </span>
              </button>
            </div>
          )}
          {addressValid == false && (
            <div className={styles.buttonbox}>
              <button className={styles.button} style={{ display: 'none' }}>
                <span></span>
              </button>
            </div>
          )}
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
                  ref={radio_add == 'EVENT' ? eventNameRef : refferIdRef}
                  type='text'
                  className={styles.input}
                  onChange={handleOnInput}
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
      {modalOpen == true && (
        <SignupModal setModalOpen={setModalOpen} title={modalMessage} />
      )}
    </div>
  );
};

export default SignupInfo;
