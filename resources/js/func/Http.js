import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // logoutUser()
    } else if (
      error.response &&
      (error.response.status === 500 || error.response.status === 405)
    ) {
      console.log(error.response.data);
    }

    // return error
    return Promise.reject(error);
  }
);

window.Http = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default window.Http;
