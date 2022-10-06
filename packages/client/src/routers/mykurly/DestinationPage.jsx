import React, { memo } from 'react';
import styles from '../../css/mykurly/DestinationPage.module.css';
import MypageHeader from '../../components/myPageHeader';
import MyPageTabs from '../../components/myPageTabs';
import MainHeader from '../../components/mainHeader';
import MainFooter from '../../components/mainFooter';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const DestinationPage = memo(({ mykurlyService }) => {
  const token = useSelector((state) => state.loginToken.accessToken);
  const user_id = useSelector((state) => state.userData.user_id);
  const [radio, setRadio] = useState('');
  const [addressList, setAddressList] = useState([{}, {}]);
  const handleChange = (e) => {
    setRadio(e.target.value);
  };
  const addAddress = () => {
    window.open(
      '/address/shipping-address',
      'address',
      'width=535px,height=570px'
    );
  };
  const editAddress = () => {
    window.open(
      '/address/shipping-address/edit',
      'address-edit',
      'width=535px,height=570px'
    );
  };

  useEffect(() => {
    mykurlyService
      .getAddressList(token, user_id)
      .then((e) => setAddressList([...e]));
  }, [mykurlyService]);

  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <p id='address' style={{ display: 'none' }}></p>

        <MypageHeader />
        <div className={styles.container}>
          <MyPageTabs active={'destination'} />
          <div className={styles.contentbox}>
            <div className={styles.content_header}>
              <h2 className={styles.title}>
                배송지 관리{' '}
                <span className={styles.subtitle}>
                  배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.
                </span>
              </h2>
              <div className={styles.newaddress}>
                <button onClick={addAddress}>
                  <img
                    src='https://res.kurly.com/pc/ico/2006/ico_add_16x16.svg'
                    alt=''
                    className='ico'
                  />
                  새 배송지 추가
                </button>
              </div>
            </div>

            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.thead_tr}>
                  <th className={styles.thead_th}>선택</th>
                  <th className={styles.thead_th}>주소</th>
                  <th className={styles.thead_th}>받으실 분</th>
                  <th className={styles.thead_th}>연락처</th>
                  <th className={styles.thead_th}>배송유형</th>
                  <th className={styles.thead_th}>수정</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {addressList === [] && (
                  <tr className={styles.tbody_tr}>
                    <td colSpan='5' className={styles.tbody_td}>
                      배송지를 추가해주세요.
                    </td>
                  </tr>
                )}

                {Object.keys(addressList).map((key) => (
                  <tr colSpan='5' className={styles.tbody_td}>
                    <td>
                      <label className={styles.radiobox}>
                        <input
                          type='radio'
                          checked={radio == key ? true : false}
                          value={key}
                          onChange={handleChange}
                        />
                        <span className={styles.select}></span>
                      </label>
                    </td>
                    <td className={styles.address}>
                      {addressList[key].address +
                        addressList[key].address_detail}
                    </td>
                    <td>{addressList[key].user_name}</td>
                    <td>{addressList[key].user_phone}</td>
                    <td>낮배송</td>
                    <td>
                      <button className={styles.edit} onClick={editAddress}>
                        edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
});

export default DestinationPage;
