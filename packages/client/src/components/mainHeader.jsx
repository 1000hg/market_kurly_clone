import styles from "../css/MainHeader.module.css";
import MainNavbar2 from "./mainNavbar2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_CART_INFO } from "../reducers/cartData";
import { DELETE_USER_INFO } from "../reducers/userData";
import { DELETE_TOKEN } from "../reducers/authToken";
import setAuthorizationToken from "../services/setAuthorizationToken";
import axios from "axios";

function MainHeader() {
  const [topBnr, setTopBnr] = useState(true); //최상단 배너 X버튼 클릭 시 제거 스위치.
  const [myKurlyShown, setMyKurlyShown] = useState(false);
  const [custSvc, setCustSvc] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user_name } = useSelector((state) => {
    return state.userData;
  });

  const onLogOut = () => {
    axios
      .get("/api/auth/logout")
      .then((res) => {
        console.log(res);
        localStorage.removeItem("accessToken");
        dispatch(DELETE_CART_INFO());
        dispatch(DELETE_USER_INFO());
        dispatch(DELETE_TOKEN());
        setAuthorizationToken();
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <header>
        {sessionStorage.getItem("topbnr") == null ? (
          <div>
            <a className={"text-center " + `${styles.aTopBnr}`}>
              <span>
                지금 가입하고 인기상품 <b>100원</b>에 받아가세요!
              </span>
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
          <div className={styles.myKurly_menu}>
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
                <div
                  onMouseEnter={() => setMyKurlyShown(true)}
                  onMouseLeave={() => setMyKurlyShown(false)}
                >
                  <Link to="/mypage/order" className={styles.welLink}>
                    <div className={"dropdown-toggle " + `${styles.tpSz}`}>
                      <span className={styles.welcome}>웰컴</span>
                      <span>{user_name}님 </span>
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHJlY3QgZmlsbD0iI0ZBNjIyRiIgZmlsbC1ydWxlPSJub256ZXJvIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHJ4PSI3Ii8+CiAgICAgICAgPHBhdGggZD0iTTguMzg1IDEwdi0uMDA2TDUuNjQ1IDYuMjFWMTBoLTEuNlY0aDEuNmwyLjc0IDMuNzg4VjRoMS42djZoLTEuNnoiIGZpbGw9IiNGRkYiLz4KICAgIDwvZz4KPC9zdmc+Cg=="
                        alt="New"
                        className={styles.nImg}
                      ></img>
                    </div>
                  </Link>
                  {myKurlyShown && (
                    <div className={styles.drpdwn_mycurly}>
                      <div className={styles.list}>
                        <Link to="/mypage/order">
                          <div className={styles.drpdwnItem_mycurly}>
                            주문 내역
                          </div>
                        </Link>
                        <Link to="/mypage/gift">
                          <div className={styles.drpdwnItem_mycurly}>
                            선물 내역
                          </div>
                        </Link>
                        <Link to="/mypage/mypick">
                          <div className={styles.drpdwnItem_mycurly}>
                            찜한 상품
                          </div>
                        </Link>
                        <Link to="/mypage/destination">
                          <div className={styles.drpdwnItem_mycurly}>
                            배송지 관리
                          </div>
                        </Link>
                        <Link to="/mypage/review">
                          <div className={styles.drpdwnItem_mycurly}>
                            상품 후기
                          </div>
                        </Link>
                        <Link to="/mypage/inquiry">
                          <div className={styles.drpdwnItem_mycurly}>
                            상품 문의
                          </div>
                        </Link>
                        <Link to="/mypage/emoney">
                          <div className={styles.drpdwnItem_mycurly}>
                            적립금
                          </div>
                        </Link>
                        <Link to="/mypage/coupon">
                          <div className={styles.drpdwnItem_mycurly}>쿠폰</div>
                        </Link>
                        <Link to="/mypage/infoedit">
                          <div className={styles.drpdwnItem_mycurly}>
                            개인 정보 수정
                          </div>
                        </Link>
                        <div
                          className={styles.drpdwnItem_mycurly}
                          onClick={onLogOut}
                        >
                          로그아웃
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <span className={styles.midBar}>|</span>
              <li
                className="nav-item menu"
                onMouseEnter={() => setCustSvc(true)}
                onMouseLeave={() => setCustSvc(false)}
              >
                <Link to="/mycurly/order-history" className={styles.welLink}>
                  <span className={"dropdown-toggle " + `${styles.tpSz}`}>
                    고객센터
                  </span>
                </Link>
                {custSvc && (
                  <div className={styles.drpdwn_cstsvc}>
                    <div className={styles.list}>
                      <Link to="/mycurly/order-history">
                        <div className={styles.drpdwnItem_mycurly}>
                          공지사항
                        </div>
                      </Link>
                      <div className={styles.drpdwnItem_mycurly}>
                        자주하는 질문
                      </div>
                      <div className={styles.drpdwnItem_mycurly}>1:1 문의</div>
                      <div className={styles.drpdwnItem_mycurly}>
                        대량주문 문의
                      </div>
                      <div className={styles.drpdwnItem_mycurly}>상품 제안</div>
                    </div>
                  </div>
                )}
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
