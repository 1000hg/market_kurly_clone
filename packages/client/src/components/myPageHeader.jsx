import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../css/mykurly/MypageHeader.module.css';

const MypageHeader = (props) => {
  const user_name = useSelector((state) => state.userData.user_name);
  return (
    <div className={styles.container}>
      <div className={styles.contentbox}>
        <div className={styles.content_first}>
          <div className={styles.miniHeader}>
            <div className={styles.welcome}>웰컴</div>
            <div className={styles.user_name}>
              <strong>{user_name}님</strong>
            </div>
          </div>
          <div className={styles.pbox}>
            <p>적립 5%</p>
            <p>최초 1회 무료배송</p>
          </div>
          <div className={styles.buttonbox}>
            <button>전체등급 보기</button>
            <button>다음 달 예상등급 보기</button>
          </div>
        </div>
        <div className={styles.content}>
          <a href='/mypage/emoney'>
            <div className={styles.title}>
              적립금<span className={styles.arrow}></span>
            </div>
            <div className={styles.space}></div>
            <div className={styles.contents_wrapper}>
              <div className={styles.contents}>0원</div>
              <div className={styles.hidden_text}>소멸 예정 0원</div>
            </div>
          </a>
        </div>
        <div className={styles.content}>
          <a href='/mypage/coupon'>
            <div className={styles.title}>
              쿠폰<span className={styles.arrow}></span>
            </div>
            <div className={styles.space}></div>
            <div className={styles.contents_wrapper}>
              <div className={styles.contents}>0개</div>
              <div className={styles.hidden_text}></div>
            </div>
          </a>
        </div>
        <div className={styles.content}>
          <a href='/mypage'>
            <div className={styles.title}>
              컬리 퍼플 박스<span className={styles.arrow}></span>
            </div>
            <div className={styles.space}></div>
            <div className={styles.contents_wrapper}>
              <div className={styles.contents}>알아보기</div>
              <div className={styles.hidden_text}></div>
            </div>
          </a>
        </div>
        <div className={styles.content}>
          <a href='/mypage'>
            <div className={styles.title}>
              컬리패스<span className={styles.arrow}></span>
            </div>
            <div className={styles.space}></div>
            <div className={styles.contents_wrapper}>
              <div className={styles.contents}>알아보기</div>
              <div className={styles.hidden_text}></div>
            </div>
          </a>
        </div>
      </div>
      <div className={styles.adv}>
        <a
          href='https://www.kurly.com/shop/main/html.php?htmid=event/kurly.htm&amp;name=friend'
          class='css-1khmcew eyulecr1'
        >
          <img
            src='https://img-cf.kurly.com/shop/data/skin/designgj/img/banner/87be10a8b7a30ef20427d24a00671607.jpg'
            alt='마이 컬리 배너 WELCOME'
          />
        </a>
      </div>
    </div>
  );
};

export default MypageHeader;
