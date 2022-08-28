export default class AuthService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async postSignup(info) {
    const response = await fetch(`${this.baseURL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });

    const data = await response.json();
    console.log(data);
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async signupIdCheck(info) {
    const response = await fetch(
      `${this.baseURL}/user/check/id?user_id=${info.user_id}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    console.log(data.message);
    if (data.message == '사용 할 수 있습니다.') {
      return true;
    } else if (data.message != '사용 할 수 있습니다.') {
      return false;
    } else if (response.status !== 200) {
      throw new Error(data.message);
    }
  }

  async signupEmailCheck(info) {
    const response = await fetch(
      `${this.baseURL}/user/check/email?user_email=${info.user_email}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    console.log(data.message);
    if (data.message == '사용 할 수 있습니다.') {
      return true;
    } else if (data.message != '사용 할 수 있습니다.') {
      return false;
    } else if (response.status !== 200) {
      throw new Error(data.message);
    }
  }

  async signIn(info) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (response.status !== 200) {
      // throw new Error(data.message);
      return { rsltCd: 'E' };
    }
    return data;
  }
}
