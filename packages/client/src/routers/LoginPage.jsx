import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import styles from "../css/LoginPage.module.css";
import setAuthorizationToken from "../services/setAuthorizationToken";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOKEN } from "../reducers/authToken";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SET_USER_INFO } from "../reducers/userData";
import Modal from "../components/modal";

function LoginPage({ authService }) {
  const [seCheck, setSeCheck] = useState(true);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post("/api/auth/login", { user_id: id, user_password: pwd })
      .then((res) => {
        setModalOpen(false);
        //console.log(res);
        const token = res.data.token;
        //console.log(token);
        localStorage.setItem("accessToken", token);
        setAuthorizationToken(token);
        dispatch(SET_TOKEN(token));
        const userData = res.data.isValidUser;
        dispatch(SET_USER_INFO(userData));
        console.log(userData);

        return navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setModalOpen(true);
      });

    // authService.signIn({user_id:id, user_password:pwd})
    // .then((data)=> {
    //   if(data.rsltCd == "E"){
    //     setLoginErr(true)
    //   }else{
    //     setLoginErr(false);
    //     // console.log(data);
    //     const token = data.token;
    //     localStorage.setItem('jwtToken',token);

    //     axios.post('/api/auth/login',{"user_id":id, "user_password":pwd})
    //     .then(res => {
    //     console.log(res);
    //     setAuthorizationToken(token); //헤더에 Autorization : 토큰
    //     })

    //     // console.log(token);
    //     dispatch(SET_TOKEN(token));
    //     return navigate('/');
    //   }

    // })

    // axios({
    //   method:'POST',
    //   url:'/api/auth/login',
    //   body:{"user_id":id, "user_password":pwd}
    // }).then(res => console.log(res))
  };

  return (
    <div>
      {modalOpen == true ? (
        <Modal
          setModalOpen={setModalOpen}
          title={"아이디, 비밀번호를 확인해주세요."}
          option={"rCfm"}
        />
      ) : null}
      <MainHeader />
      <div className={"text-center " + `${styles.lgContent}`}>
        <h3 className={styles.lgTitle}>로그인</h3>
        <form onSubmit={onSubmitHandler}>
          <input
            className={styles.idInput}
            onChange={(e) => setId(e.currentTarget.value)}
            type="text"
            placeholder="아이디를 입력해주세요"
          ></input>
          <br />
          <input
            className={styles.pwdInput}
            onChange={(e) => setPwd(e.currentTarget.value)}
            type="password"
            placeholder="비밀번호를 입력해주세요"
          ></input>

          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div>
              <input
                onClick={() => setSeCheck(!seCheck)}
                type="checkbox"
                id="secureCheck"
                name="secureCheck"
                checked={seCheck}
              />
              <label
                htmlFor="secureCheck"
                style={{ fontSize: "13px", color: "#333" }}
              >
                보안접속
              </label>
            </div>

            <div className={styles.divFind}>
              <Link to="/login/findId">아이디 찾기</Link>I
              <Link to="/login/findPwd">비밀번호 찾기</Link>
            </div>
          </div>
          <button className={styles.lgBtn}>로그인</button>
        </form>

        <button onClick={() => navigate("/signup")} className={styles.snupBtn}>
          회원가입
        </button>
      </div>
      <MainFooter />
    </div>
  );
}

export default LoginPage;
