import styles from "../css/MainHeader.module.css";
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import MainNavbar from "./mainNavbar";
import MainNavbar2 from "./mainNavbar2";
import { Link } from "react-router-dom";
import { useState } from "react";

function MainHeader() {
  const [topbnr, setTopbnr] = useState(true);
  return (
    <header>
      {topbnr ? (
        <div>
          <a
            className="text-center"
            style={{
              color: "white",
              backgroundColor: "#5f0080",
              height: "42px",
              display: "block",
            }}
          >
            지금 가입하고 인기상품 <b>100원</b>에 받아가세요!
            <img
              src="https://res.kurly.com/pc/ico/1908/ico_arrow_fff_84x84.png"
              style={{ width: "42px", height: "42px" }}
            />
            <button
              onClick={() => setTopbnr(false)}
              className={styles.btnTopBnr}
              style={{ float: "right" }}
            ></button>
          </a>
        </div>
      ) : null}
      <div
        className="container-fluid"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <a href="#">
            <img
              style={{ width: "120px" }}
              src="https://res.kurly.com/pc/service/common/2011/delivery_210801.png"
              alt="샛별, 택배 배송안내"
            />
          </a>
        </div>
        <div>
          <ul className="nav">
            <li className="nav-item menu">
              <Link
                to="/signup"
                className={"nav-link active " + `${styles.tpSz}`}
                href="#"
                style={{ color: "#5f0080" }}
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
        <div style={{ maxHeight: "130px" }}>
          <Link to="/">
            <img
              className={
                "img-responsive " + `${styles.mainLogo}` + " w-25 mb-4"
              }
              src="https://res.kurly.com/images/marketkurly/logo/logo_x2.png"
              alt="마켓컬리 로고"
              style={{ maxHeight: "130px", maxWidth: "160px" }}
            />
          </Link>
        </div>
      </div>
      {/* <MainNavbar /> */}
      <MainNavbar2 />
    </header>
  );
}

export default MainHeader;
