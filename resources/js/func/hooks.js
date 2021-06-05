import { useState, useRef, useCallback } from "react";
import { merge } from "lodash";
import { usePage } from "@inertiajs/inertia-react";

export const useProps = () => usePage().props;

export const useMergeState = (initialState) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const setMergedState = useCallback(
    (newState, callback) => {
      setState((prevState) =>
        typeof newState === "function"
          ? newState(stateRef.current)
          : merge({}, prevState, newState)
      );
      callback && callback(stateRef.current);
    },
    [stateRef]
  );

  return [state, setMergedState, stateRef];
};
