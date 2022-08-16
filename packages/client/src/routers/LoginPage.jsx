import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import styles from "../css/LoginPage.module.css"
import setAuthorizationToken from "../services/setAuthorizationToken";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {SET_TOKEN} from "../store"
import axios from "axios";
import { useNavigate } from "react-router-dom";


function LoginPage({authService}) {
  const [seCheck, setSeCheck] = useState(true);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const[loginErr, setLoginErr] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let a = useSelector((state)=>{return state.loginToken
  // })
  

  const onSubmitHandler = (e) =>{
    e.preventDefault();
    
    axios.post('/api/auth/login',{"user_id":id, "user_password":pwd})
    .then((res) => {
      setLoginErr(false);
      //console.log(res);
      const token = res.data.token;
      //console.log(token);
      localStorage.setItem('jwtToken',token);
      setAuthorizationToken(token);
      dispatch(SET_TOKEN(token));
      
      return navigate('/');
    })
    .catch(e => {console.log(e);
    setLoginErr(true);})

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
  
  }

  function Modal(){
    const onLoginFailed = (e) =>{
      e.preventDefault();
      setLoginErr(false);
    }
    return(
      <div className={styles.modalBg}>
        <div className={styles.modal}>
          <div className={styles.modalText}>
            아이디, 비밀번호를 확인해주세요.
          </div>
          <div className={styles.modalDiv}>
            <button className={styles.modalButton} onClick={onLoginFailed}>
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${loginErr ? styles.scroll : ''}`}>
      {loginErr == true ? <Modal /> : null}
      <MainHeader />
      <div
        style={{
          width: '340px',
          padding: '90px 0px',
          letterSpacing: '-.6px',
          margin: '0 auto',
        }}
        className='text-center'
      >
        <h3
          style={{
            fontWeight: 800,
            fontSize: '20px',
            color: '#333',
            marginBottom: '30px',
          }}
        >
          로그인
        </h3>
        <form onSubmit={onSubmitHandler}>
          <input
            style={{
              height: '54px',
              width: '100%',
              borderRadius: '3px',
              backgroundColor: '#fff',
              fontSize: '14px',
              outline: 'none',
              border: '1px solid #ccc',
              margin: '4px',
              padding: '0 20px',
            }}
            onChange={(e) => setId(e.currentTarget.value)}
            type='text'
            placeholder='아이디를 입력해주세요'
          ></input>
          <br />
          <input
            style={{
              height: '54px',
              width: '100%',
              borderRadius: '3px',
              backgroundColor: '#fff',
              fontSize: '14px',
              outline: 'none',
              border: '1px solid #ccc',
              margin: '4px',
              padding: '0 20px',
            }}
            onChange={(e) => setPwd(e.currentTarget.value)}
            type='password'
            placeholder='비밀번호를 입력해주세요'
          ></input>

          <div className='d-flex' style={{ justifyContent: 'space-between' }}>
            <div>
              <input
                onClick={() => setSeCheck(!seCheck)}
                type='checkbox'
                id='secureCheck'
                name='secureCheck'
                checked={seCheck}
              />
              <label
                htmlFor='secureCheck'
                style={{ fontSize: '13px', color: '#333' }}
              >
                보안접속
              </label>
            </div>

            <div
              style={{ fontSize: '13px', color: '#333', marginBottom: '30px' }}
            >
              <a>아이디 찾기</a>I<a>비밀번호 찾기</a>
            </div>
          </div>
          <button
            style={{
              display: 'block',
              width: '100%',
              height: '54px',
              borderRadius: '3px',
              border: '1px solid #5f0081',
              backgroundColor: '#5f0080',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            로그인
          </button>
        </form>

        <button
          style={{
            width: '100%',
            height: '54px',
            borderRadius: '3px',
            border: '1px solid #5f0081',
            color: '#5f0081',
            cursor: 'pointer',
            backgroundColor: 'white',
            marginTop: '10px',
          }}
        >
          회원가입
        </button>
      </div>
      <MainFooter />
    </div>
  );
}

export default LoginPage;
