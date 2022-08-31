import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/PwdRePage.module.css";

export default function PwdRePage() {
  const [enrollPwd, setEnrollPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [rqFirst, setRqFirst] = useState(0);
  const [rqSecond, setRqSecond] = useState(0);
  const [rqThird, setRqThird] = useState(1);
  const [rqFourth, setRqFourth] = useState(false);

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
        // setVerify(true);
        // setModalTitle(
        //   "인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해 주세요.\n\n카카오톡이 설치된 경우 카카오 알림톡으로 발송됩니다."
        // );
        // setModalOpen(true);
      })
      .catch((e) => {
        alert("다시 확인");
      });
  };
  const onClearBtn = (value) => {
    if (value === "enroll") {
      setEnrollPwd("");
      setRqFirst(0);
      setRqSecond(0);
      setRqThird(1);
    } else if (value === "confirm") {
      setConfirmPwd("");
      setRqFourth(false);
    }
  };
  const onEnrollChangeHandler = (e) => {
    setEnrollPwd(e.currentTarget.value);

    if (verifyEnrollRef.current.value === "") {
      setRqSecond(true);
    }
  };
  const onConfirmChangeHandler = (e) => {
    setConfirmPwd(e.currentTarget.value);

    if (verifyConfirmRef.current.value === verifyEnrollRef.current.value) {
      setRqFourth(true);
    }
  };
  const onInit = (e) => {
    // if (
    //   (id !== "" && phone !== "" && phone.length >= 10) ||
    //   (id !== "" && email !== "")
    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  // const onBlurHandler=()=>{
  //   if(enrollPwd === ""){
  //     setRqFirst()setRqFirst(false)
  //   }
  // }

  return (
    <div>
      <div className={styles.divContent}>
        <div className={styles.findTitle}>비밀번호 찾기</div>
        <form className={styles.inputForm} onSubmit={onSubmitHandler}>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="newPwd">
              새 비밀번호 등록
            </label>
            <div className={styles.relDiv}>
              <input
                // onBlur={onBlurHandler}
                onFocus={() => {
                  setRqFirst(2);
                  setRqSecond(2);
                  setRqThird(2);
                }}
                onChange={onEnrollChangeHandler}
                className={styles.inputContent}
                type="text"
                id="newPwd"
                placeholder="새 비밀번호를 입력해 주세요"
                value={enrollPwd}
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
            <p>
              <span>X</span>10자 이상 입력
            </p>
            <p>
              <span>X</span>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상
              조합
            </p>
            <p>
              <span>X</span>동일한 숫자 3개 이상 연속 사용 불가
            </p>
          </div>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="reNewPwd">
              새 비밀번호 확인
            </label>
            <div className={styles.relDiv}>
              <input
                // onBlur={() =>
                //   confirmPwd === "" ? setRqSecond(true) : setRqSecond(false)
                // }
                onChange={onConfirmChangeHandler}
                className={styles.inputContent}
                type="tel"
                id="reNewPwd"
                placeholder="새 비밀번호를 한 번 더 입력해 주세요"
                value={confirmPwd}
                maxLength="11"
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
            <p>
              <span>X</span>동일한 비밀번호를 입력해주세요
            </p>
          </div>
          <button
            className={
              !rqFirst && !rqSecond && onInit()
                ? `${styles.submitBtn}`
                : `${styles.submitBtnDis}`
            }
            disabled={!rqFirst && !rqSecond && onInit() ? false : true}
          >
            확인
          </button>
        </form>
      </div>
    </div>
  );
}
