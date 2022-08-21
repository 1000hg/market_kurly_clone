import { useLocation, useNavigate } from "react-router-dom";
import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import styles from "../css/FindIdConfirmPage.module.css";

export default function FindIdConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.user_id;
  const joinDate = location.state.create_dtm;
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
        <button className={styles.allId}>아이디 전체보기</button>
        <button onClick={() => navigate("/login")} className={styles.login}>
          로그인
        </button>
      </div>
      <MainFooter />
    </>
  );
}
