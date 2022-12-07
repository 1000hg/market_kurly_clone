export default class MyKurlyService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  // 배송지 리스트 : get / add / edit / delete
  async getAddressList(token, user_id) {
    const response = await fetch(
      `${this.baseURL}/user/address?user_id=${user_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
  async addAddress(token, info) {
    const response = await fetch(`${this.baseURL}/user/address/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data.message;
  }

  async deleteAddress(token, seq) {
    const response = await fetch(`${this.baseURL}/user/address/del/${seq}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data.message;
  }

  async getWishList(token, user_seq) {
    const response = await fetch(
      `${this.baseURL}/product/wish/list?user_seq=${user_seq}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data.wishList;
  }

  async addProductWish(token, info) {
    const response = await fetch(`${this.baseURL}/product/wish/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data.message;
  }

  async deleteProductWish(token, seq) {
    const response = await fetch(`${this.baseURL}/product/wish/del/${seq}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error('error!');
    }
    return data.message;
  }

  async getCouponList() {
    const response = await fetch(`${this.baseURL}/coupon/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    console.log(data.responseData);
    return data.responseData;
  }
  async getCartList(token, user_seq) {
    const response = await fetch(
      `${this.baseURL}/cart/list?user_seq=${user_seq}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    console.log(data.cartList);
    return data.cartList;
  }

  async addCart(token, info) {
    console.log('info : ', info);
    console.log('JSON.stringify(info) : ', JSON.stringify(info));

    const response = await fetch(`${this.baseURL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data.message;
  }
  // .then((res) => {
  //   console.log(res);

  //   axios
  //     .get("/api/cart/list", { params: { user_seq: user_seq } })
  //     .then((res) => {
  //       if (has_product(cart_list, clickedItem.product_seq) !== -1) {
  //         console.log("이미 존재하는 상품입니다.");
  //         setSelProduct(0);
  //       } else {
  //         console.log("새로운 상품 추가하겠습니다");
  //         setSelProduct(1);
  //       }
  //       dispatch(SET_CART_INFO(res.data));
  //       setModalOpen(false);
  //     });
  // });

  async paymentCheckOut(token, info) {
    const response = await fetch(`${this.baseURL}/payment/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return data.message;
  }
}
