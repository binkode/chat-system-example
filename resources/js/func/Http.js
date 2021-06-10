import axios from 'axios'

// import env from "react-dotenv";

// axios.defaults.baseURL = env.API_URL;

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // logoutUser()
    } else if (error.response && (error.response.status === 500 || error.response.status === 405)) {
      console.log(error.response.data)
    }

    // return error
    return Promise.reject(error)
  }
)

window.Http = axios.create({
  withCredentials: true,
  // baseURL : env.API_URL,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
    // 'X-CSRF-TOKEN': env.CSRF_TOKEN,
  }
})
export default axios
