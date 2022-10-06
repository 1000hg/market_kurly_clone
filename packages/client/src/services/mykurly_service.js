export default class MyKurlyService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
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
    return data;
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
    return data.responseData;
  }
}
