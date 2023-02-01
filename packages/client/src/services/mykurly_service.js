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
  async updateAddress(token, info) {
    const response = await fetch(`${this.baseURL}/user/address/update`, {
      method: 'PUT',
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

  async getReceiverAddress(token, user_address_seq) {
    const response = await fetch(
      `${this.baseURL}/user/receiver/list?user_address_seq=${user_address_seq}`,
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
    return data.receiverList;
  }

  async updateReceiverAddress(token, info) {
    const response = await fetch(`${this.baseURL}/user/receiver/update`, {
      method: 'GET',
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
    return data.receiverSave;
  }

  // 찜 상품리스트 get, add, delete
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

  // 쿠폰 리스트 get
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

  // 장바구니 리스트 get, add, 물품 수량변경
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

  async deleteCart(token, info) {
    console.log('info : ', info);
    console.log('JSON.stringify(info) : ', JSON.stringify(info));

    const response = await fetch(`${this.baseURL}/cart/del`, {
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
    return data.delete_cart_item;
  }

  async changeCartProductCount(token, info) {
    console.log('info : ', info);
    console.log('JSON.stringify(info) : ', JSON.stringify(info));

    const response = await fetch(`${this.baseURL}/cart/update`, {
      method: 'PUT',
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
    return data.updated_cart_item;
  }

  async cartOrder(token, user_seq) {
    const response = await fetch(
      `${this.baseURL}/cart/order?user_seq=${user_seq}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data.orderSheet;
  }

  // 비회원 장바구니 리스트 get, add, 물품 수량변경, 로그인시 합치기
  async getGuestCartList(guest_seq) {
    const response = await fetch(
      `${this.baseURL}/guest/list?guest_seq=${guest_seq}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

  async addGuestCart(
    guest_seq,
    product_seq,
    product_view_seq,
    product_buy_count,
    info
  ) {
    const response = await fetch(`${this.baseURL}/guest/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data);
    }
    return data;
  }
  async deleteGuestCart(token, info) {
    console.log('info : ', info);
    console.log('JSON.stringify(info) : ', JSON.stringify(info));

    const response = await fetch(`${this.baseURL}/guest/del`, {
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
    return data.delete_cart_item;
  }

  async changeGuestCartProductCount(info) {
    const response = await fetch(`${this.baseURL}/guest/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data.updated_cart_item;
  }

  async getLoginCartList(guest_seq) {
    const response = await fetch(
      `${this.baseURL}/guest/count?guest_seq=${guest_seq}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data.orderSheet;
  }

  // 주문하기
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

    return data.payment_seq;
  }

  // 주문내역
  async getPaymentList(token, user_seq) {
    const response = await fetch(
      `${this.baseURL}/payment/list?user_seq=${user_seq}&month=3`,
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
    console.log(data.paymentList);
    return data.paymentList;
  }

  async getPaymentDetail(token, user_seq, cart_seq, payment_seq) {
    const response = await fetch(
      `${this.baseURL}/payment/detail?user_seq=${user_seq}&cart_seq=${cart_seq}&payment_seq=${payment_seq}`,
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
    console.log(data.paymentDetail);
    return data.paymentDetail;
  }

  async paymentReorder(token, user_seq, cart_seq) {
    const response = await fetch(`${this.baseURL}/payment/reorder`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    console.log(data.cart_seq);
    return data.cart_seq;
  }
  async getNoticeList() {
    const response = await fetch(`${this.baseURL}/notice/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    console.log(data.msg);
    return data.responseData;
  }
}
