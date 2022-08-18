import styles from "../css/MainHeader.module.css";
import MainNavbar2 from "./mainNavbar2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function MainHeader() {
  const [topBnr, setTopBnr] = useState(true); //최상단 배너 X버튼 클릭 시 제거 스위치.
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <>
      <header>
        {sessionStorage.getItem("topbnr") == null ? (
          <div>
            <a className={"text-center " + `${styles.aTopBnr}`}>
              지금 가입하고 인기상품 <b>100원</b>에 받아가세요!
              <img
                src="https://res.kurly.com/pc/ico/1908/ico_arrow_fff_84x84.png"
                className={styles.bnrImg}
              />
              <button
                onClick={() => {
                  sessionStorage.setItem("topbnr", "1");
                  setTopBnr(false);
                }}
                className={styles.btnTopBnr}
              ></button>
            </a>
          </div>
        ) : null}
        <div className={"container-fluid " + `${styles.btnCtn}`}>
          <div>
            <a href="#">
              <img
                className={styles.btnImg}
                src="https://res.kurly.com/pc/service/common/2011/delivery_210801.png"
                alt="샛별, 택배 배송안내"
              />
            </a>
          </div>
          <div>
            <ul className="nav">
              {localStorage.getItem("accessToken") === null ||
              localStorage.getItem("accessToken") === "" ? (
                <>
                  <li className="nav-item menu">
                    <Link
                      to="/signup"
                      className={
                        "nav-link active " +
                        `${styles.tpSz} ${styles.sgnUpTpSz}`
                      }
                      href="#"
                    >
                      회원가입
                    </Link>
                  </li>
                  <li className="nav-item menu">
                    <Link
                      to="/login"
                      className={"nav-link " + `${styles.tpSz}`}
                      href="#"
                    >
                      로그인
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <button onClick={onLogOut}>로그아웃</button>
                </>
              )}
              <li className="nav-item">
                <div className={`dropdown ${styles.drpdwn}`}>
                  <a
                    className={"nav-link dropdown-toggle " + `${styles.tpSz}`}
                    href="#"
                  >
                    고객센터
                  </a>
                  <div
                    className={`dropdown-menu ${styles.drpdwn_menu}`}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className={`dropdown-item ${styles.drp_itm}`} href="#">
                      공지사항
                    </a>
                    <a className={`dropdown-item ${styles.drp_itm}`} href="#">
                      자주하는 질문
                    </a>
                    <a className={`dropdown-item ${styles.drp_itm}`} href="#">
                      1:1 문의
                    </a>
                    <a className={`dropdown-item ${styles.drp_itm}`} href="#">
                      대량주문 문의
                    </a>
                    <a className={`dropdown-item ${styles.drp_itm}`} href="#">
                      상품 제안
                    </a>
                    <a className={`dropdown-item ${styles.drp_itm}`} href="#">
                      에코포장 피드백
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className={styles.divMainLogo}>
            <Link to="/">
              <img
                className={
                  "img-responsive " + `${styles.mainLogo}` + " w-25 mb-4"
                }
                src="https://res.kurly.com/images/marketkurly/logo/logo_x2.png"
                alt="마켓컬리 로고"
              />
            </Link>
          </div>
        </div>
        {/* <MainNavbar /> */}
      </header>
      <MainNavbar2 />
    </>
  );
}

export default MainHeader;
