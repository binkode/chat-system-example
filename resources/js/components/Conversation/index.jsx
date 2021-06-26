import { memo, useCallback, useMemo } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { trunc } from "../../func";
import { conversations as conversationsAsync } from "../../func/async/msg";
import moment from "moment";
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
  const currentId = useMemo(() => parseInt(params.get("conversation_id")), [
    params,
  ]);

  const setData = useCallback((data) => data.map(({ id }) => id), []);
  const onSuccess = useCallback((data) => dispatch(addConvers(data)), []);

  const RenderItem = useCallback(
    ({ item, index }) => (
      <Conversation selected={item === currentId} id={item} />
    ),
    [currentId]
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
    (conv = {}) => conv
  );

  return (
    <InertiaLink
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
    </InertiaLink>
  );
});

const CC = () => (
  <li className="my-2 p-2 flex flex-row cursor-pointer rounded-lg hover:bg-gray-50 hover:bg-opacity-50">
    <img
      src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-997145684-1547233351.jpg?crop=1xw:1xh;center,top&resize=480:*"
      className="h-12 w-12 rounded-full mr-4"
      alt=""
    />
    <div className="w-full flex flex-col justify-center">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xs font-bold">{name}</h2>
        <div className="text-xs flex flex-row">
          <svg
            className="w-4 h-4 text-blue-600 fill-current mr-1"
            viewBox="0 0 19 14"
          >
            <path
              fillRule="nonzero"
              d="M4.96833846,10.0490996 L11.5108251,2.571972 C11.7472185,2.30180819 12.1578642,2.27443181 12.428028,2.51082515 C12.6711754,2.72357915 12.717665,3.07747757 12.5522007,3.34307913 L12.4891749,3.428028 L5.48917485,11.428028 C5.2663359,11.6827011 4.89144111,11.7199091 4.62486888,11.5309823 L4.54038059,11.4596194 L1.54038059,8.45961941 C1.2865398,8.20577862 1.2865398,7.79422138 1.54038059,7.54038059 C1.7688373,7.31192388 2.12504434,7.28907821 2.37905111,7.47184358 L2.45961941,7.54038059 L4.96833846,10.0490996 L11.5108251,2.571972 L4.96833846,10.0490996 Z M9.96833846,10.0490996 L16.5108251,2.571972 C16.7472185,2.30180819 17.1578642,2.27443181 17.428028,2.51082515 C17.6711754,2.72357915 17.717665,3.07747757 17.5522007,3.34307913 L17.4891749,3.428028 L10.4891749,11.428028 C10.2663359,11.6827011 9.89144111,11.7199091 9.62486888,11.5309823 L9.54038059,11.4596194 L8.54038059,10.4596194 C8.2865398,10.2057786 8.2865398,9.79422138 8.54038059,9.54038059 C8.7688373,9.31192388 9.12504434,9.28907821 9.37905111,9.47184358 L9.45961941,9.54038059 L9.96833846,10.0490996 L16.5108251,2.571972 L9.96833846,10.0490996 Z"
            ></path>
          </svg>
          <span className="text-gray-400">10:45</span>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        {last_message && (
          <p className="text-xs text-gray-500">
            {trunc(last_message.message, 20)}
          </p>
        )}
        <span className="text-sm bg-blue-500 rounded-full w-5 h-5 text-center text-white font-bold">
          4
        </span>
      </div>
    </div>
  </li>
);

const Old = () => (
  <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
    <div className="flex flex-shrink-0 rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
      {image ||
        ["⚽️", "💧", "📖"].find((_, i) => Math.floor(Math.random() * 3) === i)}
    </div>
    <div className="flex-grow">
      <div className="font-medium text-sm">{name}</div>
      {last_message && (
        <div className="text-gray-600 text-xs">
          {trunc(last_message.message, 20)}
        </div>
      )}
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
);
