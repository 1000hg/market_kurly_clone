import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import styles from "../css/FindPage.module.css";

export default function FindIdPage() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <MainHeader />
      <div className={styles.divContent}>
        <div className={styles.findTitle}>아이디 찾기</div>
        <button
          className={
            tab == 0
              ? `${styles.findBtn} ` + `${styles.clickFocus}`
              : `${styles.findBtn}`
          }
          onClick={() => setTab(0)}
        >
          휴대폰 인증
        </button>
        <button
          className={
            tab == 1
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [rqFirst, setRqFirst] = useState(false);
  const [rqSecond, setRqSecond] = useState(false);
  const [verify, setVerify] = useState(false);
  const [verifyCd, setVerifyCd] = useState("");
  const [rqVerify, setRqVerify] = useState(false);
  const [verifyCdContent, serVerifyCdContent] =
    useState("인증번호를 입력해주세요");
  const verifyCdRef = useRef();
  useEffect(() => {
    setName("");
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

    if (tab == 0) {
      axios
        .post("/api/verify/sms", { user_name: name, user_phone: phone })
        .then((res) => {
          console.log(res);
          res.data.tab = tab;
          setVerify(true);
        })
        .catch((e) => {
          alert("다시 확인");
        });
    } else if (tab == 1) {
      axios
        .post("/api/verify/email", { user_name: name, user_email: email })
        .then((res) => {
          console.log(res);
          res.data.email = email;
          res.data.name = name;
          res.data.tab = tab;
          return navigate("/login/findIdConfirm", {
            state: res.data,
          });
        })
        .catch((e) => {
          alert("다시 확인");
        });
    }
  };
  const onCdChangeHandler = (e) => {
    setVerifyCd(e.currentTarget.value);

    if (verifyCdRef.current.value == "") {
      serVerifyCdContent("인증번호를 입력해주세요");
      setRqVerify(false);
    } else if (verifyCdRef.current.value.length < 7) {
      serVerifyCdContent("7자리를 입력해주세요");
    } else {
      serVerifyCdContent("");
      setRqVerify(true);
    }
  };

  const sendIdVerify = () => {
    axios
      .post("/api/verify/sms/id", {
        user_name: name,
        user_phone: phone,
        verify_code: verifyCd,
      })
      .then((res) => {
        console.log(res);
        return navigate("/login/findIdConfirm", {
          state: res.data,
        });
      })
      .catch((e) => {
        alert("다시 확인");
      });
  };

  const onInit = (e) => {
    if ((name != "" && phone != "") || (name != "" && email != "")) {
      return true;
    } else {
      return false;
    }
  };
  if (tab == 0) {
    //휴대폰 인증

    return (
      <div>
        <form className={styles.inputForm} onSubmit={onSubmitHandler}>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="name">
              이름
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={() =>
                  name == "" ? setRqFirst(true) : setRqFirst(false)
                }
                onChange={(e) => setName(e.currentTarget.value)}
                className={styles.inputContent}
                type="text"
                id="name"
                placeholder="이름을 입력해주세요"
                value={name}
              />
              <button
                type="button"
                onClick={() => setName("")}
                className={name == "" ? styles.delBtnNone : styles.delBtn}
              ></button>
            </div>
            <p className={rqFirst ? `${styles.required}` : `${styles.hidden}`}>
              가입 시 등록한 이름을 입력해 주세요.
            </p>
          </div>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="phone">
              휴대폰 번호
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={() =>
                  phone == "" ? setRqSecond(true) : setRqSecond(false)
                }
                onChange={(e) => setPhone(e.currentTarget.value)}
                className={styles.inputContent}
                type="tel"
                id="phone"
                placeholder="휴대폰 번호를 입력해주세요"
                value={phone}
              />
              <button
                type="button"
                onClick={() => setPhone("")}
                className={phone == "" ? styles.hidden : styles.delBtn}
              ></button>
            </div>
            {rqSecond && (
              <p className={styles.required}>
                가입 시 등록한 휴대폰 번호를 입력해 주세요.
              </p>
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
                  className={styles.inputContent}
                  type="text"
                  id="verifyCd"
                  placeholder="인증번호 7자리"
                  ref={verifyCdRef}
                  autoFocus
                />
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
      </div>
    );
  } else if (tab == 1) {
    //이메일 인증
    return (
      <div>
        <form className={styles.inputForm} onSubmit={onSubmitHandler}>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="name">
              이름
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={() =>
                  name == "" ? setRqFirst(true) : setRqFirst(false)
                }
                onChange={(e) => setName(e.currentTarget.value)}
                className={styles.inputContent}
                type="text"
                id="name"
                placeholder="이름을 입력해주세요"
                value={name}
              />
              <button
                type="button"
                onClick={() => setName("")}
                className={name == "" ? styles.hidden : styles.delBtn}
              ></button>
            </div>
            <p className={rqFirst ? `${styles.required}` : `${styles.hidden}`}>
              가입 시 등록한 이름을 입력해 주세요.
            </p>
          </div>
          <div className={styles.divInput}>
            <label className={styles.inputTitle} htmlFor="phone">
              이메일
            </label>
            <div className={styles.relDiv}>
              <input
                onBlur={() =>
                  email == "" ? setRqSecond(true) : setRqSecond(false)
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
                className={email == "" ? styles.delBtnNone : styles.delBtn}
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
