import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import styles from "../css/FindPage.module.css";
import ConfirmModal from "../components/modal";

export default function FindPwdPage() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <MainHeader />
      <div className={styles.divContent}>
        <div className={styles.findTitle}>비밀번호 찾기</div>
        <button
          className={
            tab === 0
              ? `${styles.findBtn} ` + `${styles.clickFocus}`
              : `${styles.findBtn}`
          }
          onClick={() => setTab(0)}
        >
          휴대폰 인증
        </button>
        <button
          className={
            tab === 1
              ? `${styles.findBtn} ` + `${styles.clickFocus}`
              : `${styles.findBtn}`
          }
          onClick={() => setTab(1)}
        >
          이메일 인증
        </button>
        <TabContent tab={tab} />
      </div>
      <MainFooter />
    </>
  );
}

function TabContent({ tab }) {
  //input control
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  //modal control
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  //validation control
  const [rqFirst, setRqFirst] = useState(false);
  const [rqSecond, setRqSecond] = useState(false);
  const [verify, setVerify] = useState(false); //인증번호 입력창 스위치
  const [verifyCd, setVerifyCd] = useState("");
  const [rqVerify, setRqVerify] = useState(false);
  const [verifyIdContent, setVerifyIdContent] = useState(
    "가입 시 등록한 아이디를 입력해 주세요."
  );
  const [verifyPhoneContent, setVerifyPhoneContent] = useState(
    "가입 시 등록한 휴대폰 번호를 입력해 주세요."
  );
  const [verifyCdContent, setVerifyCdContent] =
    useState("인증번호를 입력해주세요");
  const verifyCdRef = useRef(null);
  const verifyIdRef = useRef(null);
  const verifyPhoneRef = useRef(null);
  useEffect(() => {
    setId("");
    setPhone("");
    setEmail("");
    setVerifyCd("");
    setRqFirst(false);
    setRqSecond(false);
    setVerify(false);
    setRqVerify(false);
  }, [tab]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (tab === 0) {
      axios
        .post("/api/verify/sms", { user_id: id, user_phone: phone })
        .then((res) => {
          console.log(res);
          setVerify(true);
          setModalTitle(
            "인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해 주세요.\n\n카카오톡이 설치된 경우 카카오 알림톡으로 발송됩니다."
          );
          setModalOpen(true);
        })
        .catch((e) => {
          alert("다시 확인");
        });
    } else if (tab === 1) {
      axios
        .post("/api/verify/email/pw", { user_id: id, user_email: email })
        .then((res) => {
          console.log(res);
          res.data.email = email; //서버에서 넘어오나?

          return navigate("/login/pwdReMail", {
            state: res.data,
          });
        })
        .catch((e) => {
          alert("다시 확인");
        });
    }
  };

  const onPhoneChangeHandler = (e) => {
    setPhone(e.currentTarget.value);

    if (verifyPhoneRef.current.value === "") {
      setVerifyPhoneContent("가입 시 등록한 휴대폰 번호를 입력해 주세요.");
      setRqSecond(true);
    } else if (verifyPhoneRef.current.value.length < 10) {
      setVerifyPhoneContent("휴대폰 번호를 정확히 입력해 주세요.");
    } else {
      setVerifyPhoneContent("");
      setRqSecond(false);
    }
  };
  const onIdChangeHandler = (e) => {
    setId(e.currentTarget.value);

    if (verifyIdRef.current.value === "") {
      setVerifyIdContent("가입 시 등록한 아이디를 입력해 주세요.");
      setRqFirst(true);
    } else {
      setVerifyIdContent("");
      setRqFirst(false);
    }
  };
  const onCdChangeHandler = (e) => {
    setVerifyCd(e.currentTarget.value);

    if (verifyCdRef.current.value === "") {
      setVerifyCdContent("인증번호를 입력해주세요");
      setRqVerify(false);
    } else if (verifyCdRef.current.value.length < 7) {
      setVerifyCdContent("7자리를 입력해주세요");
    } else {
      setVerifyCdContent("");
      setRqVerify(true);
    }
  };
  const onClearBtn = (value) => {
    if (value === "id") {
      setVerifyIdContent("가입 시 등록한 아이디를 입력해 주세요.");
      setId("");
      setRqFirst(true);
    } else if (value === "phone") {
      setVerifyPhoneContent("가입 시 등록한 휴대폰 번호를 입력해 주세요.");
      setPhone("");
      setRqSecond(true);
    } else if (value === "email") {
    }
  };
  const sendIdVerify = () => {
    //아이디 sms인증번호 입력 완료 후 확인버튼
    axios
      .post("/api/verify/sms/pw", {
        user_id: id,
        user_phone: phone,
        verify_code: verifyCd,
      })
      .then((res) => {
        console.log(res);
        res.data.tab = tab;
        return navigate("/login/findPwdConfirm", {
          state: res.data,
        });
      })
      .catch((e) => {
        alert("다시 확인");
      });
  };
  const inputFocus = () => {
    verifyCdRef.current.focus();
  };
  const onInit = (e) => {
    if (
      (id !== "" && phone !== "" && phone.length >= 10) ||
      (id !== "" && email !== "")
    ) {
      return true;
    } else {
      return false;
    }
  };
  if (tab === 0) {
    //휴대폰 인증

    return (
      <div>
        <form className={styles.inputForm} onSubmit={onSubmitHandler}>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="id">
              아이디
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={() =>
                  id === "" ? setRqFirst(true) : setRqFirst(false)
                }
                onChange={onIdChangeHandler}
                className={styles.inputContent}
                type="text"
                id="id"
                placeholder="아이디를 입력해주세요"
                value={id}
                ref={verifyIdRef}
              />
              <button
                type="button"
                onClick={() => {
                  onClearBtn("id");
                }}
                className={id === "" ? styles.delBtnNone : styles.delBtn}
              ></button>
            </div>
            {rqFirst && <p className={styles.required}>{verifyIdContent}</p>}
          </div>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="phone">
              휴대폰 번호
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={() =>
                  phone === "" ? setRqSecond(true) : setRqSecond(false)
                }
                onChange={onPhoneChangeHandler}
                className={styles.inputContent}
                type="tel"
                id="phone"
                placeholder="휴대폰 번호를 입력해주세요"
                value={phone}
                maxLength="11"
                ref={verifyPhoneRef}
              />
              <button
                type="button"
                onClick={() => {
                  onClearBtn("phone");
                }}
                className={phone === "" ? styles.hidden : styles.delBtn}
              ></button>
            </div>
            {rqSecond && (
              <p className={styles.required}>{verifyPhoneContent}</p>
            )}
          </div>

          {verify && (
            <div className={styles.divInput}>
              <label className={styles.inputTitle} htmlFor="verifyCd">
                인증번호
              </label>
              <div className={styles.relDiv}>
                <input
                  onChange={onCdChangeHandler}
                  className={styles.inputCdCnt}
                  type="text"
                  id="verifyCd"
                  placeholder="인증번호 7자리"
                  ref={verifyCdRef}
                />
                <button onClick={onSubmitHandler} className={styles.reSendBtn}>
                  재발송
                </button>
                <p className={styles.required}>{verifyCdContent}</p>
              </div>
            </div>
          )}

          {verify ? (
            <button
              onClick={sendIdVerify}
              className={
                rqVerify ? `${styles.submitBtn}` : `${styles.submitBtnDis}`
              }
              disabled={rqVerify ? false : true}
            >
              확인
            </button>
          ) : (
            <button
              className={
                !rqFirst && !rqSecond && onInit()
                  ? `${styles.submitBtn}`
                  : `${styles.submitBtnDis}`
              }
              disabled={!rqFirst && !rqSecond && onInit() ? false : true}
            >
              인증번호 받기
            </button>
          )}
        </form>
        {modalOpen && (
          <ConfirmModal
            title={modalTitle}
            setModalOpen={setModalOpen}
            callBackfn={inputFocus}
          />
        )}
      </div>
    );
  } else if (tab === 1) {
    //이메일 인증
    return (
      <div>
        <form className={styles.inputForm} onSubmit={onSubmitHandler}>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="id">
              아이디
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={() =>
                  id === "" ? setRqFirst(true) : setRqFirst(false)
                }
                onChange={(e) => setId(e.currentTarget.value)}
                className={styles.inputContent}
                type="text"
                id="id"
                placeholder="아이디를 입력해주세요"
                value={id}
              />
              <button
                type="button"
                onClick={() => setId("")}
                className={id === "" ? styles.hidden : styles.delBtn}
              ></button>
            </div>
            <p className={rqFirst ? `${styles.required}` : `${styles.hidden}`}>
              가입 시 등록한 아이디를 입력해 주세요.
            </p>
          </div>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="phone">
              이메일
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={() =>
                  email === "" ? setRqSecond(true) : setRqSecond(false)
                }
                onChange={(e) => setEmail(e.currentTarget.value)}
                className={styles.inputContent}
                type="email"
                id="email"
                placeholder="이메일을 입력해주세요"
                value={email}
              />
              <button
                type="button"
                onClick={() => setEmail("")}
                className={email === "" ? styles.delBtnNone : styles.delBtn}
              ></button>
            </div>
            <p className={rqSecond ? `${styles.required}` : `${styles.hidden}`}>
              가입 시 등록한 이메일을 입력해 주세요.
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
    );
  }
}
