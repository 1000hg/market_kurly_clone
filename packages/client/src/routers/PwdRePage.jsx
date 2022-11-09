import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/PwdRePage.module.css";
import ConfirmModal from "../components/modal";
import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";

export default function PwdRePage() {
  const [enrollPwd, setEnrollPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [rqFirst, setRqFirst] = useState(3);
  const [rqSecond, setRqSecond] = useState(3);
  const [rqThird, setRqThird] = useState(3);
  const [rqFourth, setRqFourth] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const navigate = useNavigate();
  const verifyEnrollRef = useRef(null);
  const verifyConfirmRef = useRef(null);
  const location = useLocation();
  const id = location.state.user_id;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .put("/api/user/resetpw", { user_id: id, user_password: confirmPwd })
      .then((res) => {
        console.log(res);
        setModalTitle("비밀번호 변경이 완료되었습니다.");
        setModalOpen(true);
      })
      .catch((e) => {
        alert("다시 확인");
      });
  };
  const onClearBtn = (value) => {
    if (value === "enroll") {
      setEnrollPwd("");
      setRqFirst(1);
      setRqSecond(1);
      setRqThird(2);
    } else if (value === "confirm") {
      setConfirmPwd("");
      setRqFourth(1);
    }
  };
  const onEnrollChangeHandler = (e) => {
    setEnrollPwd(e.currentTarget.value);
    const pwdCheck1 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{0,}$/; //영,숫,특
    const pwdCheck2 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{0,}$/; //영,숫
    const pwdCheck3 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-]).{0,}$/; //영,특
    const pwdCheck4 = /^(?=.*[!@#$%^*+=-])(?=.*[0-9]).{0,}$/; //숫, 특
    const pwdSpace = /[\s]/g;
    const pwdCheck5 = /(\d)\1\1/;

    let pwd = verifyEnrollRef.current.value;
    if (pwd.length < 10) {
      //pwd 10자 이상 입력
      setRqFirst(1);
    } else {
      setRqFirst(2);
    }
    if (
      //pwd 영문/숫자/특수문자(공백 제외)만 허용, 2개 이상 조합
      (pwdCheck1.test(pwd) ||
        pwdCheck2.test(pwd) ||
        pwdCheck3.test(pwd) ||
        pwdCheck4.test(pwd)) &&
      !pwdSpace.test(pwd)
    ) {
      setRqSecond(2);
    } else {
      setRqSecond(1);
    }
    if (pwdCheck5.test(pwd)) {
      setRqThird(1);
    } else {
      setRqThird(2);
    }

    if (
      //등록과 확인의 값이 같고 확인쪽에 비번이 입력되어있을 때
      verifyEnrollRef.current.value === verifyConfirmRef.current.value &&
      verifyConfirmRef.current.value != ""
    ) {
      setRqFourth(2);

      //등록과 확인의 값이 다른데 확인쪽에 비번이 입력되어있을 때
    } else if (verifyConfirmRef.current.value != "") setRqFourth(1);
  };
  const onConfirmChangeHandler = (e) => {
    setConfirmPwd(e.currentTarget.value);

    if (
      verifyConfirmRef.current.value === verifyEnrollRef.current.value &&
      verifyEnrollRef.current.value != ""
    ) {
      setRqFourth(2);
    } else setRqFourth(1);
  };

  const onFocusHandler = (e) => {
    if (e.currentTarget.id === "newPwd") {
      if (
        enrollPwd === "" &&
        rqFirst === 3 &&
        rqSecond === 3 &&
        rqThird === 3
      ) {
        //최초에만 동작
        setRqFirst(0);
        setRqSecond(0);
        setRqThird(0);
      }
    } else {
      //reNewPwd
      if (confirmPwd === "" && rqFourth === 3) {
        setRqFourth(0);
      }
    }
  };
  const onEnBlurHandler = (e) => {
    onEnrollChangeHandler(e);
  };

  const onConBlurHandler = (e) => {
    onConfirmChangeHandler(e);
  };
  return (
    <div>
      <MainHeader />
      <div className={styles.divContent}>
        <div className={styles.findTitle}>비밀번호 찾기</div>
        <form className={styles.inputForm} onSubmit={onSubmitHandler}>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="newPwd">
              새 비밀번호 등록
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={onEnBlurHandler}
                onFocus={onFocusHandler}
                onChange={onEnrollChangeHandler}
                className={styles.inputContent}
                type="password"
                id="newPwd"
                placeholder="새 비밀번호를 입력해 주세요"
                value={enrollPwd}
                maxLength="16"
                ref={verifyEnrollRef}
              />
              <button
                type="button"
                onClick={() => {
                  onClearBtn("enroll");
                }}
                className={enrollPwd === "" ? styles.delBtnNone : styles.delBtn}
              ></button>
            </div>

            <p
              className={
                rqFirst == 0
                  ? styles.pRqContent0
                  : rqFirst == 1
                  ? styles.pRqContent1
                  : rqFirst == 2
                  ? styles.pRqContent2
                  : styles.hidden
              }
            >
              10자 이상 입력
            </p>
            <p
              className={
                rqSecond == 0
                  ? styles.pRqContent0
                  : rqSecond == 1
                  ? styles.pRqContent1
                  : rqSecond == 2
                  ? styles.pRqContent2
                  : styles.hidden
              }
            >
              영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
            </p>
            <p
              className={
                rqThird == 0
                  ? styles.pRqContent0
                  : rqThird == 1
                  ? styles.pRqContent1
                  : rqThird == 2
                  ? styles.pRqContent2
                  : styles.hidden
              }
            >
              동일한 숫자 3개 이상 연속 사용 불가
            </p>
          </div>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="reNewPwd">
              새 비밀번호 확인
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={onConBlurHandler}
                onFocus={onFocusHandler}
                onChange={onConfirmChangeHandler}
                className={styles.inputContent}
                type="password"
                id="reNewPwd"
                placeholder="새 비밀번호를 한 번 더 입력해 주세요"
                value={confirmPwd}
                maxLength="16"
                ref={verifyConfirmRef}
              />
              <button
                type="button"
                onClick={() => {
                  onClearBtn("confirm");
                }}
                className={confirmPwd === "" ? styles.hidden : styles.delBtn}
              ></button>
            </div>
            <p
              className={
                rqFourth == 0
                  ? styles.pRqContent0
                  : rqFourth == 1
                  ? styles.pRqContent1
                  : rqFourth == 2
                  ? styles.pRqContent2
                  : styles.hidden
              }
            >
              동일한 비밀번호를 입력해주세요
            </p>
          </div>
          <button
            className={
              rqFirst === 2 && rqSecond === 2 && rqThird === 2 && rqFourth === 2
                ? `${styles.submitBtn}`
                : `${styles.submitBtnDis}`
            }
            disabled={
              rqFirst === 2 && rqSecond === 2 && rqThird === 2 && rqFourth === 2
                ? false
                : true
            }
          >
            확인
          </button>
        </form>
      </div>
      {modalOpen ? (
        <ConfirmModal
          setModalOpen={setModalOpen}
          option={"rCfm"}
          title={modalTitle}
          callBackfn={() => navigate("/login")}
        />
      ) : null}
      <MainFooter />
    </div>
  );
}
