export default class AuthService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async postSignup(info) {
    const response = await fetch(`${this.baseURL}/auth/signup`, {
      methd: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }
}
