import Http from "../Http";
import { useEffect, useCallback, useLayoutEffect } from "react";
import useState from "use-react-state";
import { EventRegister } from "react-native-event-listeners";
import { useReduxState } from "use-redux-states";

export const useEventListener = ({
  names = [],
  params,
  callback,
  removeCallback,
}) => {
  useLayoutEffect(() => {
    if (names?.length && names.map) {
      const listeners = names.map((name, i) =>
        EventRegister.on(
          name,
          (payload) => callback && callback(name, payload, params)
        )
      );

      return () =>
        listeners.map((listener, i) => {
          EventRegister.rm(listener);
          removeCallback && removeCallback(names[i], params);
        });
    }
  }, names);

  const emit = (...props) => EventRegister.emit(...props);

  return { emit };
};

const useBaseRequest = ({
  setState,
  asyncRequest,
  params = [],
  state,
  dep = [],
  loadOnMount = true,
  emits = [],
  eventNames = [],
  eventCallback,
  eventRemoveCallback,
  eventParams,
  onSuccess,
  setData = (data) => data,
}) => {
  const { emit } = useEventListener({
    names: eventNames,
    params: eventParams,
    callback: eventCallback,
    removeCallback: eventRemoveCallback,
  });

  const request = useCallback(
    async (...p) => {
      try {
        setState({ loading: true });
        const { data, status } = await asyncRequest(...p);

        onSuccess && onSuccess(data);

        emits.map((event) => emit(event, data));

        setState({ loading: false, status, data: setData(data) });
      } catch (e) {
        setState({ error: e, loading: false });
        console.log({ e });
      }
    },
    [asyncRequest]
  );

  useLayoutEffect(() => {
    if (loadOnMount) {
      request(...params);
    }
  }, dep);

  return { ...state, setState, request };
};

const defaultRequestState = {
  timestamp: new Date().getTime(),
  error: null,
  error: null,
  status: null,
  loading: false,
};

export const useRequest = ({ request, params, ...props }, dep = []) => {
  const [state, setState] = useState(defaultRequestState);

  return useBaseRequest({
    setState,
    asyncRequest: request,
    params: [params],
    state,
    dep,
    ...props,
  });
};

const stateSelector = (s) => s || defaultRequestState;

export const useReduxRequest = (
  {
    name,
    resolver,
    request: asyncRequest,
    params,
    state: reduxState = stateSelector,
    reducer,
    ...props
  },
  dep
) => {
  const { setState, useMemoSelector, selector } = useReduxState({
    name,
    state: reduxState,
    reducer,
  });

  const state = useMemoSelector(selector, resolver);
  const rest = useBaseRequest({
    setState,
    asyncRequest,
    params: [params],
    state,
    dep,
    ...props,
  });

  return { ...rest, selector };
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
