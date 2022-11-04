import React, { useState, useEffect } from 'react';
import styles from '../css/CartPage.module.css';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ mykurlyService }) => {
  const token = useSelector((state) => state.loginToken.accessToken);
  const user_seq = useSelector((state) => state.userData.user_seq);
  const user_address = useSelector((state) => state.userData.address);
  const user_address_detail = useSelector(
    (state) => state.userData.address_detail
  );
  const [cartList, setCartList] = useState([{}]);
  const navigate = useNavigate();
  useEffect(() => {
    mykurlyService.getCartList(token, user_seq).then((e) => setCartList(e));
  }, [mykurlyService]);

  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <div className={styles.header}>장바구니</div>
        <div className={styles.body}>
          <div className={styles.leftside}>
            <div className={styles.allcheck}>
              <div className={styles.checkwrapper}>
                <div className={styles.label}>
                  <input type='checkbox' className={styles.checkbox} />
                  <img
                    src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Ni4wMDAwMDAsIC0xMDkwLjAwMDAwMCkgdHJhbnNsYXRlKDEwMC4wMDAwMDAsIDkzNi4wMDAwMDApIHRyYW5zbGF0ZSg2MC4wMDAwMDAsIDE0Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNi4wMDAwMDAsIDEyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgZmlsbD0iIzVGMDA4MCIvPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik03IDEyLjY2N0wxMC4zODUgMTYgMTggOC41Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K'
                    alt='checkbox'
                    className={styles.checkboxImage}
                  />
                  전체선택 (1/1)
                </div>
                <span className={styles.space}></span>
                <button className={styles.delete_btn}>선택삭제</button>
              </div>
            </div>
            <div className={styles.itemlist}>
              <div className={styles.category}>
                <div className={styles.productType}>
                  <div className={styles.typeTitle}>
                    <img
                      src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgzMHYzMEgweiIvPgogICAgICAgIDxnIHN0cm9rZT0iIzVFQzQ5RSIgc3Ryb2tlLXdpZHRoPSIxLjUiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTQuNjI3IDI1LjI1NWE3LjYyNyA3LjYyNyAwIDAgMCA3LjYyNi03LjYyN2MwLTIuODA4LTIuNTQyLTcuMTg0LTcuNjI2LTEzLjEyOEM5LjU0MiAxMC40NDQgNyAxNC44MiA3IDE3LjYyOGE3LjYyNyA3LjYyNyAwIDAgMCA3LjYyNyA3LjYyN3oiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICAgICAgICAgICAgPHBhdGggZD0iTTE0LjYyNyAyMC42NmEzLjgxMyAzLjgxMyAwIDAgMCAzLjgxMy0zLjgxMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K'
                      alt='product_type'
                    />
                    냉장 상품
                  </div>
                  <button className={styles.flipButton}>
                    <img
                      src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iN2EwMnFxZzNqYSIgZD0iTTExIDEyaDl2OSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCAwaDMwdjMwSDB6Ii8+CiAgICAgICAgPHVzZSBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE1LjUgMTYuNSkiIHhsaW5rOmhyZWY9IiM3YTAycXFnM2phIi8+CiAgICA8L2c+Cjwvc3ZnPgo='
                      alt='flip_button'
                    />
                  </button>
                </div>
                <ul style={{ padding: '0' }}>
                  {Object.keys(cartList).map(
                    (key) =>
                      cartList[key].packaging_type === '종이포장' && (
                        <li key={key}>
                          <div className={styles.product}>
                            <label>
                              <input
                                className={styles.productInput}
                                type='checkbox'
                                checked
                              />
                              <img
                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Ni4wMDAwMDAsIC0xMDkwLjAwMDAwMCkgdHJhbnNsYXRlKDEwMC4wMDAwMDAsIDkzNi4wMDAwMDApIHRyYW5zbGF0ZSg2MC4wMDAwMDAsIDE0Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNi4wMDAwMDAsIDEyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgZmlsbD0iIzVGMDA4MCIvPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik03IDEyLjY2N0wxMC4zODUgMTYgMTggOC41Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K'
                                alt='checkbox'
                                className={styles.checkboxImage}
                              />
                            </label>
                            <div className={styles.productImage}>
                              <img
                                src={cartList[key].product_img}
                                alt='product_image'
                              />
                            </div>
                            <div className={styles.productName}>
                              {cartList[key].product_name}
                            </div>
                            <div className={styles.productCount}>
                              <button className={styles.minus}>-</button>
                              <div className={styles.countNumber}>
                                {cartList[key].total_product_count}
                              </div>
                              <button className={styles.plus}>+</button>
                            </div>
                            <div className={styles.productPrice}>
                              <span>
                                {cartList[key].products_total_price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                원
                              </span>
                            </div>
                            <div className={styles.product_del}>
                              <button></button>
                            </div>
                          </div>
                        </li>
                      )
                  )}
                </ul>
                <div className={styles.productType}>
                  <div className={styles.typeTitle}>
                    <img
                      src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgzMHYzMEgweiIvPgogICAgICAgIDxwYXRoIGQ9Ik0xNS4wNDQgNGEuNzUuNzUgMCAwIDEgLjc0NC42NDhsLjAwNi4xMDJ2Mi42ODlsMS43Mi0xLjcyYS43NS43NSAwIDAgMSAuOTc3LS4wNzJsLjA4NC4wNzNhLjc1Ljc1IDAgMCAxIC4wNzIuOTc2bC0uMDcyLjA4NC0yLjc4IDIuNzgtLjAwMSA0LjM5IDMuODAyLTIuMTk0IDEuMDE4LTMuNzk4YS43NS43NSAwIDAgMSAxLjQ3LjI3OWwtLjAyLjEwOS0uNjMgMi4zNSAyLjMyOS0xLjM0NmEuNzUuNzUgMCAwIDEgLjgzNCAxLjI0M2wtLjA4NC4wNTctMi4zMjggMS4zNDQgMi4zNDguNjNhLjc1Ljc1IDAgMCAxIC41NS44MDlsLS4wMi4xMWEuNzUuNzUgMCAwIDEtLjgxLjU1bC0uMTA4LS4wMi0zLjc5OC0xLjAxOC0zLjgwMyAyLjE5NCAzLjgwMiAyLjE5NiAzLjc5OS0xLjAxOGEuNzUuNzUgMCAwIDEgLjQ5MyAxLjQxM2wtLjEwNS4wMzYtMi4zNS42MyAyLjMzIDEuMzQ0YS43NS43NSAwIDAgMS0uNjU5IDEuMzQ0bC0uMDkxLS4wNDQtMi4zMjgtMS4zNDQuNjI4IDIuMzQ4YS43NS43NSAwIDAgMS0uNDI1Ljg4MmwtLjEwNS4wMzdhLjc1Ljc1IDAgMCAxLS44ODItLjQyNmwtLjAzNy0uMTA1LTEuMDE3LTMuNzk3LTMuODAzLTIuMTk3djQuMzkxbDIuNzggMi43OGEuNzUuNzUgMCAwIDEtLjk3NiAxLjEzNGwtLjA4NC0uMDczLTEuNzItMS43MnYyLjY5YS43NS43NSAwIDAgMS0xLjQ5My4xMDJsLS4wMDctLjEwMnYtMi42ODhsLTEuNzIgMS43MThhLjc1Ljc1IDAgMCAxLS45NzYuMDczbC0uMDg0LS4wNzNhLjc1Ljc1IDAgMCAxLS4wNzMtLjk3NmwuMDczLS4wODQgMi43OC0yLjc4di00LjM5MWwtMy44MDEgMi4xOTUtMS4wMTggMy43OThhLjc1Ljc1IDAgMCAxLTEuNDctLjI3OWwuMDItLjEwOS42My0yLjM1LTIuMzI5IDEuMzQ2YS43NS43NSAwIDAgMS0uODM1LTEuMjQzbC4wODUtLjA1NyAyLjMyOC0xLjM0NC0yLjM0OC0uNjNhLjc1Ljc1IDAgMCAxLS41NTEtLjgwOWwuMDItLjExYS43NS43NSAwIDAgMSAuODEtLjU1bC4xMS4wMiAzLjc5NyAxLjAxOCAzLjgwMi0yLjE5NS0zLjgwMS0yLjE5NS0zLjc5OSAxLjAxOGEuNzUuNzUgMCAwIDEtLjQ5My0xLjQxM2wuMTA1LS4wMzYgMi4zNS0uNjMtMi4zMy0xLjM0NGEuNzUuNzUgMCAwIDEgLjY1OS0xLjM0NGwuMDkxLjA0NCAyLjMyOCAxLjM0NC0uNjI4LTIuMzQ4YS43NS43NSAwIDAgMSAuNDI1LS44ODJsLjEwNS0uMDM3YS43NS43NSAwIDAgMSAuODgyLjQyNmwuMDM3LjEwNSAxLjAxNyAzLjc5NyAzLjgwMiAyLjE5NnYtNC4zOWwtMi43OC0yLjc4YS43NS43NSAwIDAgMSAuOTc3LTEuMTM0bC4wODQuMDczIDEuNzIgMS43MTlWNC43NWEuNzUuNzUgMCAwIDEgLjc1LS43NXoiIGZpbGw9IiM2RkFGRjMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgogICAgPC9nPgo8L3N2Zz4K'
                      alt='product_type'
                    />
                    냉동 상품
                  </div>
                  <button className={styles.flipButton}>
                    <img
                      src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iN2EwMnFxZzNqYSIgZD0iTTExIDEyaDl2OSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCAwaDMwdjMwSDB6Ii8+CiAgICAgICAgPHVzZSBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE1LjUgMTYuNSkiIHhsaW5rOmhyZWY9IiM3YTAycXFnM2phIi8+CiAgICA8L2c+Cjwvc3ZnPgo='
                      alt='flip_button'
                    />
                  </button>
                </div>
                <ul style={{ padding: '0' }}>
                  {Object.keys(cartList).map(
                    (key) =>
                      cartList[key].packaging_type === '냉동 (종이포장)' && (
                        <li key={key}>
                          <div className={styles.product}>
                            <label>
                              <input
                                className={styles.productInput}
                                type='checkbox'
                                checked
                              />
                              <img
                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Ni4wMDAwMDAsIC0xMDkwLjAwMDAwMCkgdHJhbnNsYXRlKDEwMC4wMDAwMDAsIDkzNi4wMDAwMDApIHRyYW5zbGF0ZSg2MC4wMDAwMDAsIDE0Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNi4wMDAwMDAsIDEyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgZmlsbD0iIzVGMDA4MCIvPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik03IDEyLjY2N0wxMC4zODUgMTYgMTggOC41Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K'
                                alt='checkbox'
                                className={styles.checkboxImage}
                              />
                            </label>
                            <div className={styles.productImage}>
                              <img
                                src={cartList[key].product_img}
                                alt='product_image'
                              />
                            </div>
                            <div className={styles.productName}>
                              {cartList[key].product_name}
                            </div>
                            <div className={styles.productCount}>
                              <button className={styles.minus}>-</button>
                              <div className={styles.countNumber}>
                                {cartList[key].total_product_count}
                              </div>
                              <button className={styles.plus}>+</button>
                            </div>
                            <div className={styles.productPrice}>
                              <span>
                                {cartList[key].products_total_price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                원
                              </span>
                            </div>
                            <div className={styles.product_del}>
                              <button></button>
                            </div>
                          </div>
                        </li>
                      )
                  )}
                </ul>
                <div className={styles.productType}>
                  <div className={styles.typeTitle}>
                    <img
                      src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgzMHYzMEgweiIvPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNSA0KSIgc3Ryb2tlPSIjRkY5QjVDIiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjExLjUiIGN5PSIxMSIgcj0iNiIvPgogICAgICAgICAgICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0xMS41IDB2Mk0xOS4yNzggMy4yMjJsLTEuNDE0IDEuNDE0TTIyLjUgMTFoLTJNMTkuMjc4IDE4Ljc3OGwtMS40MTQtMS40MTRNMTEuNSAyMnYtMk0zLjcyMiAxOC43NzhsMS40MTQtMS40MTRNLjUgMTFoMk0zLjcyMiAzLjIyMmwxLjQxNCAxLjQxNCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=='
                      alt='product_type'
                    />
                    상온 상품
                  </div>
                  <button className={styles.flipButton}>
                    <img
                      src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iN2EwMnFxZzNqYSIgZD0iTTExIDEyaDl2OSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCAwaDMwdjMwSDB6Ii8+CiAgICAgICAgPHVzZSBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE1LjUgMTYuNSkiIHhsaW5rOmhyZWY9IiM3YTAycXFnM2phIi8+CiAgICA8L2c+Cjwvc3ZnPgo='
                      alt='flip_button'
                    />
                  </button>
                </div>
                <ul style={{ padding: '0' }}>
                  {Object.keys(cartList).map(
                    (key) =>
                      cartList[key].packaging_type === '상온(종이포장)' && (
                        <li key={key}>
                          <div className={styles.product}>
                            <label>
                              <input
                                className={styles.productInput}
                                type='checkbox'
                                checked
                              />
                              <img
                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Ni4wMDAwMDAsIC0xMDkwLjAwMDAwMCkgdHJhbnNsYXRlKDEwMC4wMDAwMDAsIDkzNi4wMDAwMDApIHRyYW5zbGF0ZSg2MC4wMDAwMDAsIDE0Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNi4wMDAwMDAsIDEyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgZmlsbD0iIzVGMDA4MCIvPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik03IDEyLjY2N0wxMC4zODUgMTYgMTggOC41Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K'
                                alt='checkbox'
                                className={styles.checkboxImage}
                              />
                            </label>
                            <div className={styles.productImage}>
                              <img
                                src={cartList[key].product_img}
                                alt='product_image'
                              />
                            </div>
                            <div className={styles.productName}>
                              {cartList[key].product_name}
                            </div>

                            <div className={styles.productCount}>
                              <button className={styles.minus}>-</button>
                              <div className={styles.countNumber}>
                                {cartList[key].total_product_count}
                              </div>
                              <button className={styles.plus}>+</button>
                            </div>
                            <div className={styles.productPrice}>
                              <span>
                                {cartList[key].products_total_price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                원
                              </span>
                            </div>
                            <div className={styles.product_del}>
                              <button></button>
                            </div>
                          </div>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>

            <div className={styles.allcheck}>
              <div className={styles.checkwrapper}>
                <div className={styles.label}>
                  <input type='checkbox' className={styles.checkbox} />
                  <img
                    src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Ni4wMDAwMDAsIC0xMDkwLjAwMDAwMCkgdHJhbnNsYXRlKDEwMC4wMDAwMDAsIDkzNi4wMDAwMDApIHRyYW5zbGF0ZSg2MC4wMDAwMDAsIDE0Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNi4wMDAwMDAsIDEyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgZmlsbD0iIzVGMDA4MCIvPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik03IDEyLjY2N0wxMC4zODUgMTYgMTggOC41Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K'
                    alt=' 
                    
                    checkbox'
                    className={styles.checkboxImage}
                  />
                  전체선택 (1/1)
                </div>
                <span className={styles.space}></span>
                <button className={styles.delete_btn}>선택삭제</button>
              </div>
            </div>
          </div>

          <div className={styles.rightside}>
            <div className={styles.rightTab}>
              <div className={styles.destination}>
                <h3>배송지</h3>
                <div className={styles.address}>
                  <p>{user_address}</p>
                  <div className={styles.deliveryType}>샛별배송</div>
                  <button className={styles.addressEdit}>배송지 변경</button>
                </div>
              </div>
              <div className={styles.bill}>
                <div>
                  <div className={`${styles.price} ${styles.firstRow}`}>
                    상품금액
                    <div className={styles.priceNumber}>
                      {Object.keys(cartList)
                        .map((key) => parseInt(cartList[key].cart_total_price))
                        .reduce((acc, cur, idx) => {
                          return (acc += cur);
                        })
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      원
                    </div>
                  </div>
                  <div className={`${styles.price} ${styles.secondRow}`}>
                    상품할인금액
                    <div>
                      -
                      {Object.keys(cartList)
                        .map((key) =>
                          parseInt(cartList[key].total_cart_discount_price)
                        )
                        .reduce((acc, cur, idx) => {
                          return (acc += cur);
                        })
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      원
                    </div>
                  </div>
                  <div className={`${styles.price} ${styles.thirdRow}`}>
                    배송비
                    <div>
                      {Object.keys(cartList)
                        .map((key) => parseInt(cartList[key].delivery_price))
                        .reduce((acc, cur, idx) => {
                          return (acc += cur);
                        })
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      원
                    </div>
                  </div>
                  <div className={`${styles.price} ${styles.fourthRow}`}>
                    결제예정금액
                    <div className={styles.payment}>
                      {Object.keys(cartList)
                        .map((key) => parseInt(cartList[key].payment_price))
                        .reduce((acc, cur, idx) => {
                          return (acc += cur);
                        })
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      원
                    </div>
                  </div>
                  <div className={styles.accumulate}>
                    <div className={styles.accumulate_price}>
                      <span className={styles.accumulate_icon}>적립</span>
                      최대
                      {Object.keys(cartList)
                        .map((key) =>
                          parseInt(cartList[key].total_accumulate_price)
                        )
                        .reduce((acc, cur, idx) => {
                          return (acc += cur);
                        })
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      원 적립
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.submit}>
                <button
                  className={styles.submit_btn}
                  onClick={() => navigate('/order/checkout')}
                >
                  주문하기
                </button>
                <ul className={styles.submit_notice}>
                  <li>쿠폰/적립금은 주문서에서 사용 가능합니다 </li>
                  <li>[주문완료] 상태일 경우에만 주문 취소 가능합니다.</li>
                  <li>
                    [마이컬리 &gt; 주문내역 상세페이지] 에서 직접 취소하실 수
                    있습니다.
                  </li>
                  <li>
                    쿠폰, 적립금 사용 금액을 제외한 실 결제 금액 기준으로 최종
                    산정됩니다.
                  </li>
                  <li>
                    상품별로 적립금 지급 기준이 다를 수 있습니다. (상품 상세
                    페이지에서 확인 가능합니다)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default CartPage;
