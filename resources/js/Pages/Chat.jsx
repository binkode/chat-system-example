import { memo, useEffect, useCallback, useMemo } from "react";
import Navbar from "../Layout/Navbar.jsx";
// import Sidebar from "../Layout/Sidebar.jsx";
import {
  Button,
  Label,
  Textarea,
  Dropdown,
  DropdownItem,
  Badge,
  Avatar,
  Card,
  CardBody,
} from "@windmill/react-ui";
import { SearchIcon, MenuDotX, Send } from "../icons";
import Layout from "../Layout/Dashboard.jsx";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import useState from "use-react-state";
import { useRoute, useProps, useRootMemoSelector } from "../func/hooks";
import messagesAsync, { send } from "../func/async/msg";
import { useGetState, useSetState } from "use-redux-states";
import Inifinite from "../components/Infinite.jsx";
import { addMsgs, addMsg } from "../redux/msg";
import chatsLogo from "../assets/img/chats.png";

const Dashboard = memo(() => {
  const { params } = useRoute();

  useProps();

  const conversation_id = useMemo(
    () => parseInt(params.get("conversation_id")),
    [params.get("conversation_id")]
  );

  return (
    <div className="flex-1 bg-gray-200">
      {conversation_id ? (
        <Messages conversationId={conversation_id} />
      ) : (
        <div className="flex flex-col m-4 items-center justify-center mb-6">
          <img className="drop-shadow-md w-1/5 h-1/5 mb-6" src={chatsLogo} />
          <p className="p-3 border-2 border-purple-500 hover:border-gray-500 animate-pulse mb-4 tracking-wide text-center text-purple-700 font-bold text-6xl dark:text-gray-300">
            Laravel Chat System
          </p>
          <Button>New Chat</Button>
        </div>
      )}
    </div>
  );
});

const Messages = memo(({ conversationId }) => {
  const msgRequestRef = useRef();
  const input = useRef();

  const dispatch = useDispatch();

  const setMessagesOrderData = useSetState(
    `messages.${conversationId}.order.data`
  );

  const setMessage = useSetState(`messages.${conversationId}`);

  const RenderItem = useCallback(
    ({ item, style }) => (
      <Message id={item} conversationId={conversationId} style={style} />
    ),
    [conversationId]
  );

  const conversationName = useRootMemoSelector(
    `msg.conversations.${conversationId}`,
    (conv = {}) => conv.name
  );

  const sendMessage = useCallback(async () => {
    const text = input.current.value;
    if (text?.length) {
      input.current.value = "";
      const unique = new Date().getTime();
      const { data: message } = await send({
        token: unique,
        message: text,
        conversation_id: conversationId,
      });
      dispatch(addMsg({ msg: message }));
      setMessagesOrderData((data = []) => [message.id, ...data]);
    }
  }, [conversationId]);

  const setData = useCallback((data) => data.map(({ id }) => id), []);
  const onSuccess = useCallback((data) => dispatch(addMsgs(data)), []);

  return (
    <>
      {/* Header */}
      <div className="flex-shrink-0 w-full bg-purple-600 h-16 pt-2 text-white flex justify-between shadow-md">
        <div className="ml-3 my-3 text-purple-100 font-bold text-lg tracking-wide">
          @{conversationName}
        </div>
        <Menu />
      </div>
      {/* conversation */}
      <div
        style={{
          // transform: "scaleY(-1)",
          height: "calc(100vh - 182px - 4rem)",
        }}
        className="overflow-y-auto py-6"
      >
        <Inifinite
          ref={msgRequestRef}
          inverted={true}
          params={{ pageSize: 15, conversation_id: conversationId }}
          RenderItem={RenderItem}
          name={`messages.${conversationId}.order`}
          request={messagesAsync}
          setData={setData}
          onSuccess={onSuccess}
        />
      </div>
      {/* input */}
      <div className="flex-shrink-0 w-full flex align-center justify-between bg-green-100">
        <Textarea
          ref={input}
          className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
          rows="2"
          placeholder="Enter some long form content."
        />
        <Button onClick={sendMessage} className="m-2">
          <Send />
        </Button>
      </div>
    </>
  );
});

const Message = memo(({ id, conversationId, style }) => {
  const { isSender, message, id: id_ } = useRootMemoSelector(
    `msg.msgs.${conversationId}.${id}`,
    (msg = {}) => msg
  );

  return (
    <div className="clearfix" style={{ clear: "both", ...style }}>
      <div
        className={` w-3/4 ${
          isSender ? "float-right bg-green-300" : "bg-gray-300"
        } mx-4 my-2 p-2 rounded-lg`}
      >
        {message}
      </div>
    </div>
  );
});

const Menu = () => {
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }
  return (
    <div className="relative">
      <button
        className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple mt-2 mr-2"
        onClick={handleNotificationsClick}
        aria-label="Notifications"
        aria-haspopup="true"
      >
        <MenuDotX aria-hidden="true" className="icon-dots-vertical w-5 h-5" />
      </button>

      <Dropdown
        align="right"
        isOpen={isNotificationsMenuOpen}
        onClose={() => setIsNotificationsMenuOpen(false)}
      >
        <DropdownItem tag="a" href="#" className="justify-between">
          <span>Messages</span>
          <Badge type="danger">13</Badge>
        </DropdownItem>
        <DropdownItem tag="a" href="#" className="justify-between">
          <span>Sales</span>
          <Badge type="danger">2</Badge>
        </DropdownItem>
        <DropdownItem onClick={() => alert("Alerts!")}>
          <span>Alerts</span>
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

Dashboard.layout = (page) => <Layout title="Chat" children={page} />;

export default Dashboard;
