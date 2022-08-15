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
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async signupIdCheck(info) {
    const response = await fetch(`${this.baseURL}/user/check/id`, {
      method: 'GET',
      params: {
        userid: info,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async signupEmailCheck(info) {
    const response = await fetch(`${this.baseURL}/user/check/email`, {
      method: 'GET',
      params: {
        userid: info,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
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
