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

export default memo(() => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const currentId = useMemo(
    () => parseInt(params.get("conversation_id")),
    [params],
  );

  const setData = useCallback((data) => data.map(({ id }) => id), []);
  const onSuccess = useCallback((data) => dispatch(addConvers(data)), []);

  const RenderItem = useCallback(
    ({ item, index }) => (
      <Conversation selected={item === currentId} id={item} />
    ),
    [currentId],
  );

  const queryParams = useMemo(() => ({ pageSize: 15 }), []);

  return (
    <ul className="overflow-y-auto h-full">
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

const Conversation = fastMemo(({ id: conversation_id, selected }) => {
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
      only={["messages"]}
      href="chat"
      data={{ conversation_id: id }}
      preserveState
    >
      <li
        className={`${
          selected && "bg-blue-300"
        } border-b-2 my-1 p-2 flex flex-row cursor-pointer rounded-lg hover:bg-gray-300 hover:bg-opacity-50`}
      >
        <img
          src={avatar?.thumb || team}
          className="h-12 w-12 rounded-full mr-4"
          alt=""
        />
        <div className="w-full flex flex-col justify-center">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xs font-bold">{name}</h2>
            <div className="text-xs flex flex-row">
              {last_message?.isSender && (
                <MessageStatus conversationId={conversation_id} />
              )}
              <DateTime
                type="day"
                className="text-gray-400"
                data={last_message?.created_at}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            {last_message && (
              <p className="text-xs text-gray-500">
                {trunc(last_message.message, 20)}
              </p>
            )}
            {!!unread_count && (
              <span className="text-sm bg-blue-500 rounded-full w-5 h-5 text-center text-white font-bold">
                {unread_count}
              </span>
            )}
          </div>
        </div>
      </li>
    </Link>
  );
});
