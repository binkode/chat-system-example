import { useEffect, useCallback, useMemo } from "react";
// import Sidebar from "../Layout/Sidebar.jsx";
import { Button, Dropdown, DropdownItem, Badge } from "@windmill/react-ui";
import { MenuDotX, Send, Attachment, Mic, Camera, Smiley } from "../icons";
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
import { fastMemo } from "../func";
import { MessageStatus } from "../components/Conversation/Status.jsx";
import { useNewMessage } from "../func/events/message.js";

const Dashboard = fastMemo(() => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  useNewMessage();

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

  const getConversationsOrder = useGetState("conversations.order");

  const setConversationsOrder = useSetState("conversations.order");

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

      const conversationsOrder = getConversationsOrder(
        (state) => state?.data || []
      );
      if (conversationsOrder[0] && conversationsOrder[0] !== conversationId) {
        const conversationIndex = conversationsOrder.findIndex(
          (id) => conversationId === id
        );

        setConversationsOrder((state) => {
          conversationIndex && state.data.splice(conversationIndex, 1);
          state.data?.unshift(conversationId);
          return state;
        });
      }
    }
  }, [conversationId]);

  const setData = useCallback((data) => data.map(({ id }) => id), []);

  const onSuccess = useCallback((data) => dispatch(addMsgs(data)), []);

  const queryParams = useMemo(
    () => ({ pageSize: 15, conversation_id: conversationId }),
    [conversationId]
  );

  const scrollToBottom = () => {
    const el = document.getElementById("messages");
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => scrollToBottom(), []);

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
        id="messages"
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
      <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div class="relative flex">
          <span class="absolute inset-y-0 flex items-center">
            <Button
              type="button"
              class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <Mic className="h-6 w-6 text-gray-600" />
            </Button>
          </span>
          <input
            ref={input}
            placeholder="Write Something"
            class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
          />
          <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <Button class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
              <Attachment className="h-6 w-6 text-gray-600" />
            </Button>
            <Button class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
              <Camera className="h-6 w-6 text-gray-600" />
            </Button>
            <Button class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
              <Smiley className="h-6 w-6 text-gray-600" />
            </Button>
            <Button
              onClick={sendMessage}
              class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <Send className="h-6 w-6 transform rotate-90" />
            </Button>
          </div>
        </div>
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
