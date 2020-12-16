import axios from "axios";

class Auth {
  constructor() {
    this.authenticated = false;
  }
  async login({ email, pass }, cb) {
    try {
      let result = await axios.post(
        "http://localhost:3636/login",
        {
          email,
          pass,
        },
        { withCredentials: true }
      );

      if (result.status === 201) {
        cb("");
      }
      if (!result.data.error) {
        this.authenticated = true;
        cb(result.data.error);
      } else {
        cb(result.data.error);
      }
    } catch (error) {
      console.log(`An Error at catch:`, error.response);
      if (error.response.status) {
        cb(error.response.data.error);
      }
    }
  }
  async logout(cb) {
    //try catch with the axios request to log out

    try {
      const result = await axios.post(
        "http://localhost:3636/logout",
        {},
        { withCredentials: true }
      );
      if (result.status === 200) {
        cb();
      }
    } catch (error) {
      return cb(error);
    }

    // check the result status if 200 call callback to redirect to sign up

    this.authenticated = false;
    // cb();
  }

  async isAuthenticated() {
    try {
      const result = await axios.post(
        "http://localhost:3636/issessionactive",
        {},
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        return (this.authenticated = true);
      }
    } catch (error) {
      return this.authenticated;
    }

    // console.log(result);

    return this.authenticated;
  }
}

export default new Auth();
