import { useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { useSelector } from "react-redux";
import { get, memoize } from "lodash";
import { createSelector } from "reselect";
import isEqual from "react-fast-compare";
import moment from "moment";

export const useProps = () => usePage().props;

export const useRoute = () => {
  const { url } = usePage();
  return { url, params: new URLSearchParams(window.location.search) };
};

const _isEqual = memoize(isEqual);

export const useRootMemoSelector = (
  selectorOrName,
  select = sel,
  eq = _isEqual,
) =>
  useSelector(
    createSelector(
      isString(selectorOrName)
        ? (state) => get(state, selectorOrName)
        : selectorOrName,
      select,
    ),
    eq,
  );

const sel = (state) => state;
const isString = (val) => typeof val === "string";

export const useConversationEventType = (id) => {
  const chat_events = useRootMemoSelector(
    `msg.conversations.${id}`,
    ({ read, delivery, created_at } = {}) => ({ read, delivery, created_at }),
  );

  return useEventType(chat_events);
};

export const useEventType = ({ read, delivered, created_at }) =>
  useMemo(() => {
    if (read) {
      if (
        !created_at ||
        (created_at && moment(read.created_at).isAfter(created_at))
      ) {
        return "read";
      }
    }

    if (delivered) {
      if (
        !created_at ||
        (created_at && moment(delivered.created_at).isAfter(created_at))
      ) {
        return "deliver";
      }
    }
  }, [read, delivered, created_at]);
