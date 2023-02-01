// import styled from "styled-components";
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import styles from "../css/MainFooter.module.css";

function MainFooter() {
  return (
    <footer>
      <hr style={{ color: "rgba(206, 206, 206, 0.7)" }} />
      <div className={"container " + `${styles.displayIn}`}>
        <div className="row">
          <div className="col-sm-12 col-lg-6 py-3">
            <div className="row ps-4">
              <h2 className="fw-bold" style={{ fontSize: "20px" }}>
                고객행복센터
              </h2>
            </div>
            <div className="row">
              <div className="col-5">
                <h2 className="text-center fw-bold">1644-1107</h2>
              </div>
              <div className="col-7 p-0">
                <div className="row fw-bold">365고객센터</div>
                <div className={"row " + `${styles.grayClr}`}>
                  오전 7시- 오후7시
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-5 d-flex justify-content-center align-items-center">
                <a className={styles.tit}>카카오톡 문의</a>
              </div>
              <div className="col-7 p-0">
                <div className="row fw-bold">365고객센터</div>
                <div className={"row " + `${styles.grayClr}`}>
                  오전 7시- 오후7시
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-5 d-flex justify-content-center align-items-center">
                <a className={styles.tit}>1:1 문의</a>
              </div>
              <div className="col-7 p-0">
                <div className="row fw-bold">24시간 접수 가능</div>
                <div className={"row " + `${styles.grayClr}`}>
                  고객센터 운영시간에 순차적으로 답변해드리겠습니다.
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-5 d-flex justify-content-center align-items-center">
                <a className={styles.tit}>대량주문 문의</a>
              </div>
              <div className="col-7 p-0">
                <div className={"row " + `${styles.grayClr}` + " mt-3"}>
                  비회원의 경우 메일로 문의 바랍니다.
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 pt-4">
            <div className="row">
              <ul className={`${styles.ulist}` + " p-0"}>
                <li>
                  <a className="link me-1">컬리소개</a>
                </li>
                <li>
                  <a className="link me-1">컬리소개영상</a>
                </li>
                <li>
                  <a className="link me-1">인재채용</a>
                </li>
                <li>
                  <a className="link me-1">이용약관</a>
                </li>
                <li>
                  <a className="link me-1 fw-bold">개인정보처리방침</a>
                </li>
                <li>
                  <a className="link me-1">이용안내</a>
                </li>
              </ul>
            </div>

            <div
              className={"row " + `${styles.grayClr}` + " py-3"}
              style={{ fontSize: "12px" }}
            >
              법인명 (상호) : 주식회사 컬리 I 사업자등록번호 : 261-81-23567
              <a className={styles.aCnts} href="#">
                사업자정보 확인
              </a>
              <br />
              통신판매업 : 제 2018-서울강남-01646 호 I 개인정보보호책임자:이원준
              <br />
              주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동) I 대표이사 :
              김슬아
              <br />
              입점문의 :
              <a className={`${styles.aCnts} ` + `${styles.curlyClr}`} href="#">
                입점문의하기
              </a>
              I 마케팅제휴 :
              <a className={`${styles.aCnts} ` + `${styles.curlyClr}`} href="#">
                business@kurlycorp.com
              </a>
              <br />
              채용문의 :
              <a className={`${styles.aCnts} ` + `${styles.curlyClr}`} href="#">
                recruit@kurlycorp.com
              </a>
              <br />
              팩스 : 070 - 7500 - 6098 I 이메일 :
              <a className={`${styles.aCnts} ` + `${styles.curlyClr}`} href="#">
                help@kurlycorp.com
              </a>
              <br />
              대량주문 문의 :
              <a className={`${styles.aCnts} ` + `${styles.curlyClr}`} href="#">
                kurlygift@kurlycorp.com
              </a>
              <br />
            </div>

            <div className="row pt-4">
              <ul>
                <li>
                  <a
                    href="https://instagram.com/marketkurly"
                    className={styles.linkSns}
                    target="_blank"
                  >
                    <img
                      src="https://res.kurly.com/pc/ico/1810/ico_instagram.png"
                      alt="마켓컬리 인스타그램 바로가기"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/marketkurly"
                    className={styles.linkSns}
                    target="_blank"
                  >
                    <img
                      src="https://res.kurly.com/pc/ico/1810/ico_fb.png"
                      alt="마켓컬리 페이스북 바로가기"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="http://blog.naver.com/marketkurly"
                    className={styles.linkSns}
                    target="_blank"
                  >
                    <img
                      src="https://res.kurly.com/pc/ico/1810/ico_blog.png"
                      alt="마켓컬리 네이버블로그 바로가기"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://m.post.naver.com/marketkurly"
                    className={styles.linkSns}
                    target="_blank"
                  >
                    <img
                      src="https://res.kurly.com/pc/ico/1810/ico_naverpost.png"
                      alt="마켓컬리 유튜브 바로가기"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCfpdjL5pl-1qKT7Xp4UQzQg"
                    className={`${styles.linkSns}` + " lst"}
                    target="_blank"
                  >
                    <img
                      src="https://res.kurly.com/pc/ico/1810/ico_youtube.png"
                      alt="마켓컬리 유튜브 바로가기"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="row pt-4"
          style={{ borderTop: "1px solid rgba(206, 206, 206, 0.5)" }}
        >
          <div className="col-sm-6 col-lg-4 p-0">
            <a className={styles.authIcon} href="#" target="_blank">
              <img
                src="https://res.kurly.com/kurly/logo/isms_220310.png"
                alt="isms 로고"
                className={styles.btmlogo}
              />
              <p className={styles.btmtxt}>
                [인증범위] 마켓컬리 쇼핑몰 서비스 개발·운영
                <br />
                (심사받지 않은 물리적 인프라 제외)
                <br />
                [유효기간] 2022.01.19 ~ 2025.01.18
              </p>
            </a>
          </div>
          <div className="col-sm-6 col-lg-3 p-0">
            <a className={styles.authIcon} href="#" target="_blank">
              <img
                src="https://res.kurly.com/pc/ico/2001/logo_eprivacyplus.png"
                alt="eprivacy plus 로고"
                className={styles.btmlogo}
              />
              <p className={styles.btmtxt}>
                개인정보보호 우수 웹사이트 ·<br />
                개인정보처리시스템 인증 (ePRIVACY PLUS)
              </p>
            </a>
          </div>
          <div className="col-sm-12 col-lg-5 p-0">
            <a className={styles.authIcon} href="#" target="_blank">
              <img
                src="https://res.kurly.com/pc/service/main/2009/logo_payments.png"
                alt="payments 로고"
                style={{ width: "102px", height: "34px" }}
              />
              <p className={styles.btmtxt}>
                고객님의 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서
                가입한
                <br />
                토스 페이먼츠 구매안전(에스크로) 서비스를 이용하실 수 있습니다.
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className={`${styles.btminfo}` + " py-4 text-center"}>
        마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가
        판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.
        <br />
        마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의
        당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와
        책임을 부담하지 않습니다.
        <br />
        <b>KURLY CORP.ALL RIGHTS RESERVED</b>
      </div>
    </footer>
  );
}

export default MainFooter;
