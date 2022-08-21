import axios from "axios";
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
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (tab == 1) {
      axios
        .post("/api/verify/email", { user_name: name, user_email: email })
        .then((res) => {
          console.log(res);
          return navigate("/login/findIdConfirm", { state: res.data });
        })
        .catch((e) => {
          alert("다시 확인");
        });
    }
  };
  if (tab == 0) {
    //휴대폰 인증
    return (
      <div>
        <form className={styles.inputForm} onSubmit={onSubmitHandler}>
          <div>
            <label className={styles.inputTitle} htmlFor="name">
              이름
            </label>
            <input
              onChange={(e) => setName(e.currentTarget.value)}
              className={styles.inputContent}
              type="text"
              id="name"
              placeholder="이름을 입력해주세요"
            />
            <p className={styles.required}>
              가입 시 등록한 이름을 입력해 주세요.
            </p>
          </div>
          <div>
            <label className={styles.inputTitle} htmlFor="phone">
              휴대폰 번호
            </label>
            <input
              className={styles.inputContent}
              type="number"
              id="phone"
              placeholder="이름을 입력해주세요"
            />
            <p className={styles.required}>
              가입 시 등록한 휴대폰 번호를 입력해 주세요.
            </p>
          </div>

          <button className={styles.submitBtn}>인증번호 받기</button>
        </form>
      </div>
    );
  } else if (tab == 1) {
    //이메일 인증
    return (
      <div>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="name">이름</label>
          <input
            onChange={(e) => setName(e.currentTarget.value)}
            type="text"
            id="name"
            placeholder="이름을 입력해주세요"
          />
          <label htmlFor="email">이메일</label>
          <input
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
          />
          <button>확인</button>
        </form>
      </div>
    );
  }
}
