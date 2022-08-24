import { useLocation, useNavigate } from "react-router-dom";
import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import axios from "axios";
import styles from "../css/FindIdConfirmPage.module.css";
import ConfirmModal from "../components/signupModal";
import { useState } from "react";

export default function FindIdConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state.name;
  const joinDate = location.state.create_dtm;
  const email = location.state.email;
  const id = location.state.user_id;
  const tab = location.state.tab;
  const [modalOpen, setModalOpen] = useState(false);

  const findPwdPage = (e) => {
    e.preventDefault();
    navigate("/login/findPwd");
  };
  const getIdTotalList = (e) => {
    e.preventDefault();
    axios
      .post("/api/verify/email/id", { user_name: name, user_email: email })
      .then((res) => {
        setModalOpen(true);
      })
      .catch((e) => {
        alert("다시 확인");
      });
  };
  return (
    <>
      <MainHeader />
      <div className={styles.divContent}>
        <div className={styles.cnt1}>고객님의 마켓컬리 계정을 찾았습니다.</div>
        <p className={styles.cnt2}> 아이디 확인 후 로그인해 주세요.</p>

        <div className={styles.cntMargin}>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0Y1RjVGNSIgY3g9IjIwIiBjeT0iMjAiIHI9IjIwIi8+CiAgICAgICAgPHBhdGggZD0iTTIwIDE5YzQuNjUzIDAgOC41IDMuNDc2IDguNSA3LjcyIDAgLjQzLS4zNDYuNzgtLjc3My43OEgxMi4yNzNhLjc3Ni43NzYgMCAwIDEtLjc3My0uNzhjMC00LjI4NSAzLjgyNC03LjcyIDguNS03Ljcyem0wLTguNWEzLjQgMy40IDAgMSAxIDAgNi44IDMuNCAzLjQgMCAwIDEgMC02Ljh6IiBzdHJva2U9IiNDQ0MiIGZpbGw9IiNDQ0MiLz4KICAgIDwvZz4KPC9zdmc+Cg=="
            alt="user"
          />
          <div className={styles.divUserCnt}>
            <div className={styles.userCnt}>{id}</div>
            <div className={styles.joinDate}>
              가입일 {joinDate.substr(0, 10).replaceAll("-", ".")}
            </div>
          </div>
        </div>
        {tab == 0 ? (
          <button onClick={findPwdPage} className={styles.allId}>
            비밀번호 찾기
          </button>
        ) : (
          <button onClick={getIdTotalList} className={styles.allId}>
            아이디 전체보기
          </button>
        )}
        <button onClick={() => navigate("/login")} className={styles.login}>
          로그인
        </button>
        {modalOpen ? (
          <ConfirmModal
            setModalOpen={setModalOpen}
            title={
              "가입하신 이메일로 아이디가 발송되었습니다.\n메일을 받지 못하셨다면 스팸함을 확인해 보세요.\n\n*휴대폰 인증으로 아이디 찾기 시에도 전체 아이디 확인이 가능해요."
            }
          />
        ) : null}
      </div>
      <MainFooter />
    </>
  );
}
