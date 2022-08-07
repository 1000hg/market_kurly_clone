import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
// import { useDispatch } from "react-redux";

function LoginPage() {
  // const dispatch = useDispatch();
  const [seCheck, setSeCheck] = useState(true);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log("id", id);
  //   console.log("pwd", pwd);
  //   let body = {
  //     id: id,
  //     pwd: pwd
  //   };

  //   dispatch(loginUser(body))
  //   .then(response=>{
  //     if(response.payload.loginSuccess){
  //       props.history.push('/')
  //     }else{
  //       alert('아이디 또는 비밀번호 오류입니다')
  //     }
  //   })
  //   Axios.post('/api/auth/login',body)
  //   .then(response => {

  //   })
  // };
  // useEffect(() => {
  //   axios.get("/api/auth/login").then((response) => {
  //     console.log(response);
  //   });
  // }, []);
  return (
    <>
      <MainHeader />
      <div
        style={{
          width: "340px",
          padding: "90px 0px",
          letterSpacing: "-.6px",
          margin: "0 auto",
        }}
        className="text-center"
      >
        <h3
          style={{
            fontWeight: 800,
            fontSize: "20px",
            color: "#333",
            marginBottom: "30px",
          }}
        >
          로그인
        </h3>
        <form onSubmit>
          <input
            style={{
              height: "54px",
              width: "100%",
              borderRadius: "3px",
              backgroundColor: "#fff",
              fontSize: "14px",
              outline: "none",
              border: "1px solid #ccc",
              margin: "4px",
              padding: "0 20px",
            }}
            onChange={(e) => setId(e.currentTarget.value)}
            type="text"
            placeholder="아이디를 입력해주세요"
          ></input>
          <br />
          <input
            style={{
              height: "54px",
              width: "100%",
              borderRadius: "3px",
              backgroundColor: "#fff",
              fontSize: "14px",
              outline: "none",
              border: "1px solid #ccc",
              margin: "4px",
              padding: "0 20px",
            }}
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

            <div
              style={{ fontSize: "13px", color: "#333", marginBottom: "30px" }}
            >
              <a>아이디 찾기</a>I<a>비밀번호 찾기</a>
            </div>
          </div>
          <button
            style={{
              display: "block",
              width: "100%",
              height: "54px",
              borderRadius: "3px",
              border: "1px solid #5f0081",
              backgroundColor: "#5f0080",
              cursor: "pointer",
              color: "white",
            }}
          >
            로그인
          </button>
        </form>

        <button
          style={{
            width: "100%",
            height: "54px",
            borderRadius: "3px",
            border: "1px solid #5f0081",
            color: "#5f0081",
            cursor: "pointer",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          회원가입
        </button>
      </div>
      <MainFooter />
    </>
  );
}
export default LoginPage;
