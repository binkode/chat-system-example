import { memo, useCallback, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { trunc } from "../../func";
import { conversations as conversationsAsync } from "../../func/async/msg";
import Inifinite from "../Infinite.jsx";
import { useDispatch } from "react-redux";
import { addConvers } from "../../redux/msg";
import { useRootMemoSelector, useRoute } from "../../func/hooks";
import { team } from "../../icons/images";
import { fastMemo } from "../../func";
import { MessageStatus } from "./Status.jsx";
import DateTime from "../DateTime.jsx";

export default memo(({ closeSidebar }) => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const currentId = useMemo(() => parseInt(params.get("conversation_id"), 10), [params]);

  const setData = useCallback((data) => data.map(({ id }) => id), []);
  const onSuccess = useCallback((data) => dispatch(addConvers(data)), []);

  const RenderItem = useCallback(
    ({ item }) => (
      <Conversation closeSidebar={closeSidebar} selected={item === currentId} id={item} />
    ),
    [currentId, closeSidebar],
  );

  const queryParams = useMemo(() => ({ pageSize: 15 }), []);

  return (
    <ul className="space-y-2 pb-2">
      <Inifinite
        params={queryParams}
        RenderItem={RenderItem}
        name="conversations.order"
        request={conversationsAsync}
        setData={setData}
        onSuccess={onSuccess}
      />
    </ul>
  );
});

const Conversation = fastMemo(({ id: conversation_id, selected, closeSidebar }) => {
  const {
    id,
    name,
    avatar,
    last_message = {},
    unread_count,
  } = useRootMemoSelector(
    `msg.conversations.${conversation_id}`,
    (conv = {}) => conv,
  );

  return (
    <Link
      className="block mb-3 last:mb-0"
      only={["messages"]}
      href="chat"
      data={{ conversation_id: id }}
      preserveState
      onClick={closeSidebar}
    >
      <li
        className={`rounded-2xl border p-3 transition ${
          selected
            ? "border-cyan-300/40 bg-cyan-400/15 shadow-[0_8px_24px_rgba(34,211,238,0.18)]"
            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
        }`}
      >
        <div className="flex items-start gap-3">
          <img
            src={avatar?.thumb || team}
            className="h-11 w-11 rounded-full border border-white/20 object-cover"
            alt={name || "Conversation"}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h2 className="truncate text-sm font-semibold text-slate-100">{name}</h2>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                {last_message?.isSender && <MessageStatus conversationId={conversation_id} />}
                <DateTime type="day" className="text-slate-400" data={last_message?.created_at} />
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="truncate text-xs text-slate-400">
                {last_message?.message ? trunc(last_message.message, 34) : "No messages yet"}
              </p>
              {!!unread_count && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1.5 text-xs font-bold text-slate-950">
                  {unread_count}
                </span>
              )}
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
});
