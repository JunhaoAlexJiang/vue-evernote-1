import request from "@/helper/request";

const url = {
  REGISTER: "auth/register",
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  GET_INFO: "auth",
};

export default {
  register({ username, password }) {
    return request(url.REGISTER, "POST", { username, password });
  },
  login({ username, password }) {
    return request(url.LOGIN, "POST", { username, password });
  },
  logout() {
    return request(url.LOGOUT);
  },
  getInfo() {
    return request(url.GET_INFO);
  },
};
