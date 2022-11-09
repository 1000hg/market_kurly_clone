import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styles from '../css/MainNavbar2.module.css';
import { menuItems } from '../menuItems';
import MenuItems from './menuItems';
import axios from 'axios';
import qs from 'query-string';
import { SELECTED_PRODUCT_DEL, ADD_CART } from '../reducers/cartData';

function MainNavbar2() {
  const [addressN, setAddressN] = useState(false); //비로그인시
  const [addressY, setAddressY] = useState(false); //로그인시
  const [productName, setProductName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.search;
  const dispatch = useDispatch();
  const query = qs.parse(searchParams);
  const [cartClicked, setCartClicked] = useState(false);

  let { address, address_detail } = useSelector((state) => {
    return state.userData;
  });

  let { cart_count, cart_add, cart_btn } = useSelector((state) => {
    return state.cartData;
  });

  const searchOnClick = (e) => {
    e.preventDefault();
    axios
      .get('/api/product/view/search', {
        params: { product_name: productName },
      })
      .then((res) => {
        navigate('/product/search?keyword=' + productName, {
          state: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //상품 검색
  const onChangeSearch = (e) => {
    setProductName(e.target.value);
  };

  useEffect(() => {
    //비로그인의 경우 5초 후 배송지 모달창 없어짐
    if (location.pathname === '/') {
      setAddressN(true);
      let adr = setTimeout(() => setAddressN(false), 5000);
      return () => {
        clearTimeout(adr);
      };
    }
  }, [location.pathname]);

  useEffect(() => {
    let addCart;
    if (cart_btn === true) {
      setCartClicked(true);
      addCart = setTimeout(() => {
        setCartClicked(false);
        dispatch(SELECTED_PRODUCT_DEL());
      }, 3000);
      return () => {
        clearTimeout(addCart);
      };
    }
  }, [cart_btn]);

  //search="검색어"인 경우 input태그에 검색어 남겨두기
  useEffect(() => {
    if (location.pathname === '/product/search') {
      setProductName(query.keyword);
    }
  }, [query.keyword]);
  return (
    <div className={styles.nv_area}>
      <nav>
        <ul className={`menus ${styles.mns}`}>
          {menuItems.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            );
          })}
          <li>
            <form className={`d-flex ${styles.search_frm}`} role='search'>
              <input
                className={'form-control me-2 ' + `${styles.bdrNone}`}
                type='search'
                placeholder='검색어를 입력해주세요.'
                aria-label='Search'
                style={{ marginLeft: '1rem' }}
                value={productName}
                onChange={onChangeSearch}
              />
              <input
                onClick={searchOnClick}
                type='image'
                src='https://res.kurly.com/pc/service/common/1908/ico_search_x2.png'
              />
            </form>
          </li>
          <li
            onMouseEnter={() => {
              setAddressN(true);
              setAddressY(true);
            }}
            onMouseLeave={() => {
              setAddressN(false);
              setAddressY(false);
            }}
            style={{ position: 'relative' }}
          >
            <a className={styles.iconItm}>
              <svg
                style={{ width: '2rem', height: '2rem' }}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 384 512'
              >
                <path d='M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z' />
              </svg>
              {localStorage.getItem('accessToken') === null ||
              localStorage.getItem('accessToken') === '' ? (
                <>
                  {addressN && (
                    <div className={styles.adrDiv}>
                      <div className={styles.triangle}></div>
                      <div className={styles.address}>
                        <p className={styles.adrP}>
                          <span style={{ color: '#5F0080' }}>
                            배송지를 등록
                          </span>
                          하고
                        </p>
                        <p className={styles.adrP}>
                          구매 가능한 상품을 확인하세요!
                        </p>
                        <div className={styles.btnDiv}>
                          <Link to='/login'>
                            <button className={styles.adrLgBtn}>로그인</button>
                          </Link>
                          <button className={styles.adrFindAdrBtn}>
                            주소 검색
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {addressY && (
                    <div className={styles.adrDiv}>
                      <div className={styles.triangle}></div>
                      <div className={styles.address}>
                        <p>
                          {address} {address_detail}
                        </p>

                        <p className={styles.sp}>샛별배송</p>

                        <div className={styles.btnDiv}>
                          <button className={styles.adrChgBtn}>
                            배송지 변경
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </a>
          </li>
          <li>
            <a className={styles.iconItm}>
              <svg
                style={{ width: '2rem', height: '2rem' }}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
              >
                <path d='M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z' />
              </svg>
            </a>
          </li>
          <li>
            <div className={styles.cartDiv} onClick={() => navigate('/cart')}>
              <a className={styles.iconItm}>
                <svg
                  style={{ width: '2rem', height: '2rem' }}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 576 512'
                >
                  <path d='M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z' />
                </svg>
              </a>
              {cart_count > 0 && (
                <span className={styles.cartCnt}>{cart_count}</span>
              )}
              {cartClicked && (
                <div className={styles.adrDiv}>
                  <div className={styles.triangle}></div>
                  <div className={styles.cartPop}>
                    <div className={styles.flex}>
                      <div className={styles.popImg}>
                        <img
                          style={{ width: '100%' }}
                          src={cart_add.product_img}
                        />
                      </div>
                      <div>
                        <div className={styles.popTitle}>
                          {cart_add.product_view_title}
                        </div>
                        <div className={styles.popMsg}>
                          장바구니에 상품을 담았습니다.
                          <br />
                          {cart_add.stat === 'OLD' &&
                            '이미 담은 상품의 수량을 추가했습니다.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavbar2;
