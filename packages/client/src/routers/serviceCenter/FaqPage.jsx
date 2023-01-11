import React from 'react';
import { useState } from 'react';
import MainFooter from '../../components/mainFooter';
import MainHeader from '../../components/mainHeader';
import ServiceCenterTabs from '../../components/serviceCenterTabs';
import styles from '../../css/mykurly/OrderPage.module.css';

const FaqPage = (props) => {
  return (
    <>
      <MainHeader />
      <div className={styles.page}>
        <div className={styles.container}>
          <ServiceCenterTabs active={'order'} />
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default FaqPage;
