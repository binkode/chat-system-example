import { memo, useCallback } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { trunc } from "../../func";
import { conversations as conversationsAsync } from "../../func/async/msg";
import moment from "moment";
import Inifinite from "../Infinite.jsx";

export default memo(() => {
  const RenderItem = useCallback(
    ({ item, index }) => <Conversation {...item} />,
    []
  );

  return (
    <div className="">
      <Inifinite
        params={{ pageSize: 15 }}
        RenderItem={RenderItem}
        name="conversations.order"
        request={conversationsAsync}
      />
    </div>
  );
});

const Conversation = memo(
  ({ id, conversation_id, name, image, created_at, last_message }) => (
    <li className="border-gray-400 flex flex-row mb-2">
      <InertiaLink
        only={["messages"]}
        href="chat"
        data={{ conversation_id: id }}
        preserveState
      >
        <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-shrink-0 rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
            {image ||
              ["⚽️", "💧", "📖"].find(
                (_, i) => Math.floor(Math.random() * 3) === i
              )}
          </div>
          <div className="flex-grow">
            <div className="font-medium text-sm">{name}</div>
            <div className="text-gray-600 text-xs">
              {trunc(last_message.message, 20)}
            </div>
          </div>
          <div className="text-gray-600 text-xs">
            {moment(created_at).calendar(null, {
              sameDay: "[Today]",
              nextDay: "[Tomorrow]",
              nextWeek: "dddd",
              lastDay: "[Yesterday]",
              lastWeek: "ddd ll",
              sameElse: "ddd ll",
            })}
          </div>
        </div>
      </InertiaLink>
    </li>
  )
);
