import { useLocation } from "react-router-dom";
import styles from "../css/PwdRemailPage.module.css";

export default function PwdRemailPage() {
  const location = useLocation();
  const email = location.state.email;
  return (
    <div className={styles.mid}>
      <img className={styles.mailIcn}></img>
      <p className={styles.toptxt}>
        <span className={styles.font}>{email}</span>으로 <br />
        비밀번호 재설정 메일이 발송되었어요.
      </p>
      <p className={styles.bottomtxt}>
        5분 후에도 메일이 오지 않는다면 <br /> 스팸함을 확인해 주세요.
      </p>
    </div>
  );
}
