import React from 'react';
import MainFooter from '../../components/mainFooter';
import MainHeader from '../../components/mainHeader';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import styles from '../../css/mykurly/MyPickPage.module.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const MyPickPage = ({ mykurlyService }) => {
  const token = useSelector((state) => state.loginToken.accessToken);
  const user_seq = useSelector((state) => state.userData.user_seq);
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    mykurlyService
      .getWishList(token, user_seq)
      .then((e) => setWishList([...wishList, e.wishList]));
    console.log(wishList);
  }, [mykurlyService]);

  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'mypick'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <div className={styles.title}>
                <h2>찜한 상품(0)</h2>
                <span>찜한 상품은 최대 200개까지 저장됩니다.</span>
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.content}>
              <div className={styles.warning}>
                <div>
                  <img src='https://res.kurly.com/pc/service/pick/icon-empty-like.svg' />
                  <p>찜한 상품이 없습니다.</p>
                  <button type='button' width='150' height='44' radius='3'>
                    <span className={styles.best_items}>베스트 상품 보기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default MyPickPage;
