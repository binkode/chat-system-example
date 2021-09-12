import Http from "../Http";
import { useCallback, useLayoutEffect, useEffect } from "react";
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
          return removeCallback && removeCallback(names[i], params);
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
    unmount,
    ...props
  },
  dep
) => {
  const { setState, getState, useMemoSelector, selector } = useReduxState({
    name,
    state: reduxState,
    reducer,
    unmount,
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

  return { ...rest, selector, getState };
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
      // e.message === 'Networ Error' && Notify({ type: 'error', msg: e.message })
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

export const usePagination = (
  {
    request,
    name,
    dataPoint,
    params = {},
    initData = [],
    loadOnMount = true,
    setData,
    defaultPagination = {},
    reducer = (s, p) => s || p,
    unmount,
    dataSelector,
    onCatch,
    onFinally,
    onSuccess,
    before,
    ...props
  } = {},
  dep = []
) => {
  const {
    selector,
    setState,
    getState,
    cleanup,
    loading,
    data,
    loaded,
    isLoading,
    pagination,
    nextable,
    error,
    ...rest
  } = useReduxRequest(
    {
      loadOnMount: false,
      name,
      request,
      state: {
        timestamp: new Date().getTime(),
        error: null,
        status: null,
        loading: false,
        isLoading: false,
        data: initData,
        loaded: false,
        nextable: false,
        pagination: {
          order: "desc",
          page: 0,
          pageSize: 20,
          ...defaultPagination,
        },
      },
      unmount,
      reducer,
      resolver: ({
        loading,
        data,
        loaded,
        isLoading,
        pagination,
        nextable,
      }) => ({
        loading,
        data: dataSelector ? dataSelector(data) : data,
        loaded,
        isLoading,
        pagination,
        nextable,
      }),
      ...props,
    },
    []
  );

  const setStateData = useCallback(
    (payload, reducer) =>
      setState(payload, (s, payload) => ({
        ...s,
        data: reducer
          ? reducer(s?.data, payload)
          : typeof payload === "function"
          ? payload(s?.data)
          : payload,
      })),
    []
  );

  useLayoutEffect(() => {
    if (loading || isLoading) {
      setState({ loading: false, isLoading: false });
    }
  }, []);

  useEffect(() => {
    if (loadOnMount) {
      current(false, { params });
    }
  }, [name, ...dep]);

  const hackData = useCallback(
    (data) => (setData ? setData(data) : data),
    [setData]
  );

  const current = useCallback(
    async (more = false, { params = {} } = {}, events = {}) => {
      const { isLoading, loading, pagination } = getState();
      if (
        loading ||
        isLoading ||
        (more && pagination?.last_page === pagination?.current_page)
      ) {
        return;
      }

      try {
        setState((s) => ({
          ...s,
          loading: more ? !!more : s.loading,
          isLoading: more ? s.isLoading : true,
          e: null,
          status: null,
        }));

        before && before(more, pagination.last_page);

        const { data: resData, status } = await request({
          page: !more ? 1 : (pagination?.current_page || 0) + 1,
          ...params,
        });

        if (!resData) {
          return;
        }

        const { data, last_page, total, current_page } = dataPoint
          ? resData[dataPoint]
          : resData;

        onSuccess && onSuccess(data, current_page);

        events.onSuccess && events.onSuccess(data, current_page);

        setState(
          {
            status,
            nextable: current_page < last_page,
            data: data,
            count: total,
            loaded: true,
            isLoading: false,
            loading: false,
            pagination: {
              last_page,
              total,
              current_page,
            },
            more,
          },
          (state, { pagination, data, more, ...p }) => {
            state.pagination = pagination;
            if (more) {
              state.data.push(...hackData(data));
            } else {
              state.data = hackData([...initData, ...data]);
            }
            Object.assign(state, p);
            return state;
          }
        );
      } catch (e) {
        setState((s) => ({ ...s, error: e, isLoading: false, loading: false }));
        onCatch && onCatch(e);
        console.log({ e });
      } finally {
        onFinally && onFinally(more);
      }
    },
    [request, dataPoint, initData, hackData, onCatch, onSuccess]
  );

  const next = useCallback(
    async (_params, events) =>
      current(true, { params: { ...params, ..._params } }, events),
    [params, current]
  );

  const refresh = (_params = {}) =>
    useCallback(current(false, { params: { ...params, ..._params } }), [
      params,
      current,
    ]);

  const setOrder = (ord) =>
    setState({ pagination: { order: ord } }, (s, { pagination }) => ({
      ...s,
      pagination: { ...s.pagination, ...pagination },
    }));

  const filter = (fn) => setState((s) => ({ ...s, data: s.data.filter(fn) }));

  const updateData = (fn) => setState((s) => ({ ...s, data: s.data.map(fn) }));

  const prepend = (data) => {
    setState({ data }, (s, { data }) => {
      s.data.unshift(data);
      return { ...s, data: [...s.data] };
    });
  };

  const prev = async () => {};

  return {
    setState,
    nextable,
    next,
    refresh,
    selector,
    prev,
    current,
    loading,
    data,
    loaded,
    isLoading,
    pagination,
    setOrder,
    filter,
    prepend,
    updateData,
    getState,
    cleanup,
    setStateData,
    ...rest,
  };
};

export const apiRequest = (endpoint, ...args) =>
  request(`api/${endpoint}`, ...args);

export default request;
