import Http from "../Http";
import { useEffect } from "react";
import useState from "use-react-state";

// import {readErrors} from "../";

// const store = window.store
// const Notify = window.Notify

export const useRequest = ({ request, onSuccess, params }, dep = []) => {
  const [state, setState] = useState({
    data: undefined,
    error: null,
    status: null,
    loading: false,
  });
  useEffect(() => {
    makeRequest(params);
  }, dep);

  const makeRequest = async (params) => {
    try {
      setState({ loading: true });
      const { data, status } = await request(params);
      onSuccess && onSuccess(data);
      setState({ data, status, loading: false });
    } catch (e) {
      setState({ error: e, loading: false });
    }
  };

  return { ...state };
};

const request = async (route, data = {}, method = "get", config = {}) => {
  try {
    const params =
      method === "post" || method === "put" ? data : { params: data };
    console.log(params);
    const res = await Http[method](route, params, config);
    console.log(res);
    return res;
  } catch (e) {
    if (e.message) {
      e.message === "Networ Error" && Notify({ type: "error", msg: e.message });
      if (e?.response?.status === 422) {
        // readErrors(e).map((err, i) => Notify({type: 'error', msg: err, title: i === 0 && e.response.data.message}))
      } else if (e?.response?.status === 401) {
        // Notify({type: 'error', msg: e.response.data.message, title: e.message})
      }
    }
    console.log({ e });
    return Promise.reject(e);
  }
};

export const apiRequest = (endpoint, ...args) =>
  request(`api/${endpoint}`, ...args);

export default request;
