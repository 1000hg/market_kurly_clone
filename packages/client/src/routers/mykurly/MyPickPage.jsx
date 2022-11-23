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
  const [wishList, setWishList] = useState([{}]);
  useEffect(() => {
    mykurlyService.getWishList(token, user_seq).then((e) => setWishList(e));
    console.log(wishList);
  }, [mykurlyService]);

  const deleteProductWish = (wish_item_seq) => {
    mykurlyService.deleteProductWish(token, wish_item_seq);
  };

  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'mypick'} />
          <div className={styles.contentbox}>
            <div className={styles.contentHeader}>
              <div className={styles.title}>
                <h2>찜한 상품(0)</h2>
                <span>찜한 상품은 최대 200개까지 저장됩니다.</span>
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.content}>
              {wishList.length === 0 ? (
                <div className={styles.warning}>
                  <div>
                    <img src='https://res.kurly.com/pc/service/pick/icon-empty-like.svg' />
                    <div>
                      <p>찜한 상품이 없습니다.</p>
                      <button type='button' width='150' height='44' radius='3'>
                        <span className={styles.best_items}>
                          베스트 상품 보기
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <ul className={styles.wishList} style={{ padding: '0' }}>
                  {Object.keys(wishList).map((key) => (
                    <li key={key}>
                      <div className={styles.product}>
                        <img
                          className={styles.productImage}
                          src={wishList[key].product_img}
                          alt='product_image'
                        />
                        <div className={styles.productContent}>
                          <div className={styles.productInfo}>
                            <div className={styles.productName}>
                              {wishList[key].product_name}
                            </div>
                            <div className={styles.productPrice}>
                              {wishList[key].product_price}원
                            </div>
                          </div>
                          <div className={styles.productBtns}>
                            <button
                              onClick={() =>
                                deleteProductWish(wishList[key].wish_item_seq)
                              }
                              className={styles.btnDelete}
                            >
                              <span>삭제</span>
                            </button>
                            <button className={styles.btnAddCart}>
                              <span>
                                <img
                                  src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTM2IDM2SDBWMGgzNnoiLz4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjE2NCA2LjU0NykiIHN0cm9rZT0iIzVmMDA4MCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjciPgogICAgICAgICAgICA8cGF0aCBkPSJtMjUuNjggMy42Ni0yLjcyIDExLjU3SDcuMzdMNC42NiAzLjY2eiIvPgogICAgICAgICAgICA8Y2lyY2xlIGN4PSIyMC41MiIgY3k9IjIwLjc4IiByPSIyLjE0Ii8+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjkuODEiIGN5PSIyMC43OCIgcj0iMi4xNCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMCAwaDMuOGwxLjc2IDcuNSIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=='
                                  alt=''
                                />
                                담기
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default MyPickPage;
