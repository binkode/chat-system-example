import { useEffect, useCallback, useMemo } from "react";
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
import { SearchIcon, MenuDotX, Send, DoubleCheck, Attachment } from "../icons";
import Layout from "../Layout/Dashboard.jsx";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import useState from "use-react-state";
import { useRoute, useRootMemoSelector } from "../func/hooks";
import messagesAsync, { send } from "../func/async/msg";
import { useGetState, useSetState } from "use-redux-states";
import Inifinite from "../components/Infinite.jsx";
import DateTime from "../components/DateTime.jsx";
import { addMsgs, addMsg, readConversation } from "../redux/msg";
import chatsLogo from "../assets/img/chats.png";
import { team } from "../icons/images";
import moment from "moment";
import { fastMemo } from "../func";
import { MessageStatus } from "../components/Conversation/Status.jsx";

const Dashboard = fastMemo(() => {
  const dispatch = useDispatch();
  const { params } = useRoute();

  const conversation_id = useMemo(
    () => parseInt(params.get("conversation_id")),
    [params.get("conversation_id")]
  );

  useEffect(() => {
    dispatch(readConversation({ id: conversation_id }));
  }, [conversation_id]);

  return (
    <div className="bg-gray-200">
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

const Messages = fastMemo(({ conversationId }) => {
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
  const queryParams = useMemo(
    () => ({ pageSize: 15, conversation_id: conversationId }),
    [conversationId]
  );

  return (
    <div className="h-full flex-1">
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
          backgroundColor: "#f0f3fb",
          // transform: "scaleY(-1)",
          height: "calc(100vh - 182px - 4rem)",
        }}
        className="overflow-y-auto py-6"
      >
        <Inifinite
          ref={msgRequestRef}
          inverted={true}
          params={queryParams}
          RenderItem={RenderItem}
          name={`messages.${conversationId}.order`}
          request={messagesAsync}
          setData={setData}
          onSuccess={onSuccess}
        />
      </div>
      {/* input */}
      <div className="flex-shrink-0 w-full flex flex-row align-center justify-between bg-green-100">
        {!1 && (
          <Button>
            <Attachment className="fill-current h-6 w-6" />
          </Button>
        )}
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
    </div>
  );
});

const Message = fastMemo(({ id, conversationId, style }) => {
  const {
    isSender,
    message,
    id: id_,
    created_at,
  } = useRootMemoSelector(
    `msg.msgs.${conversationId}.${id}`,
    (msg = {}) => msg
  );

  return (
    <div className="flex" style={style}>
      {!isSender && <UserImage />}
      <div
        style={{ backgroundColor: isSender ? "#14192d" : "#fff" }}
        className={`flex flex-col shadow-md w-3/4 ${
          isSender ? "ml-auto bg-green-300" : "bg-gray-300"
        } mx-4 my-2 p-2 rounded-lg`}
      >
        <p
          style={{ color: isSender ? "#fff" : "#60667a" }}
          className={`text-sm`}
        >
          {message}
        </p>

        <div className="flex ml-auto items-center">
          {isSender && (
            <MessageStatus
              className="text-gray-500"
              conversationId={conversationId}
            />
          )}
          <DateTime
            type="day"
            className="text-xs text-gray-500"
            data={created_at}
          />
        </div>
      </div>
      {isSender && <UserImage />}
    </div>
  );
});

const UserImage = () => (
  <div className="m-1 py-2 flex">
    <img
      src={team}
      // "https://www.statnews.com/wp-content/uploads/2018/01/AdobeStock_107381486-645x645.jpeg"
      className="h-12 w-12 rounded-full self-end"
      alt=""
    />
  </div>
);

const Menu = () => {
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }
  return (
    <div className="relative">
      <button
        className="p-2 ml-2 text-gray-400 rounded-full hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring"
        onClick={handleNotificationsClick}
        type="button"
        aria-label="Notifications"
        aria-haspopup="true"
      >
        <MenuDotX aria-hidden="true" className="w-6 h-6 fill-current" />
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
