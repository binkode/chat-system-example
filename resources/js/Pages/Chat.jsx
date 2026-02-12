import { useEffect, useCallback, useMemo, useRef } from "react";
import { Send, Attachment, Mic, Camera, Smiley } from "../icons";
import Layout from "../Layout/Dashboard.jsx";
import { useDispatch } from "react-redux";
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
import Button from "../components/UI/Button";

const Dashboard = fastMemo(() => {
  const dispatch = useDispatch();
  const { params } = useRoute();

  useNewMessage();

  const conversation_id = useMemo(
    () => parseInt(params.get("conversation_id"), 10),
    [params],
  );

  useEffect(() => {
    dispatch(readConversation({ id: conversation_id }));
  }, [conversation_id]);

  return (
    <section className="landing-bg h-full p-3 sm:p-5">
      <div className="landing-card h-full border-white/10 bg-white/5 p-3 sm:p-5">
        {conversation_id ? (
          <Messages conversationId={conversation_id} />
        ) : (
          <EmptyConversationState />
        )}
      </div>
    </section>
  );
});

const EmptyConversationState = fastMemo(() => (
  <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
    <img alt="ChatSystem" className="w-24 drop-shadow-md sm:w-32" src={chatsLogo} />
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.24em] text-white/60">
        ChatSystem Workspace
      </p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">
        Pick a conversation to start chatting
      </h2>
      <p className="mx-auto max-w-xl text-sm text-white/70 sm:text-base">
        Realtime updates, delivery status, and message history are already wired.
      </p>
    </div>
    <Button className="landing-btn landing-btn-primary">New Chat</Button>
  </div>
));

const Messages = fastMemo(({ conversationId }) => {
  const msgRequestRef = useRef();
  const input = useRef();

  const dispatch = useDispatch();

  const setMessagesOrderData = useSetState(`messages.${conversationId}.order.data`);

  const RenderItem = useCallback(
    ({ item, style }) => (
      <Message id={item} conversationId={conversationId} style={style} />
    ),
    [conversationId],
  );

  const conversationName = useRootMemoSelector(
    `msg.conversations.${conversationId}`,
    (conv = {}) => conv.name,
  );

  const getConversationsOrder = useGetState("conversations.order");
  const setConversationsOrder = useSetState("conversations.order");

  const sendMessage = useCallback(async () => {
    const text = input.current.value?.trim();

    if (!text?.length) {
      return;
    }

    input.current.value = "";

    const unique = new Date().getTime();
    const { data: message } = await send({
      token: unique,
      message: text,
      conversation_id: conversationId,
    });

    dispatch(addMsg({ msg: message }));
    setMessagesOrderData((data = []) => [message.id, ...data]);

    const conversationsOrder = getConversationsOrder((state) => state?.data || []);

    if (conversationsOrder[0] && conversationsOrder[0] !== conversationId) {
      const conversationIndex = conversationsOrder.findIndex(
        (id) => conversationId === id,
      );

      setConversationsOrder((state) => {
        conversationIndex && state.data.splice(conversationIndex, 1);
        state.data?.unshift(conversationId);
        return state;
      });
    }
  }, [conversationId]);

  const setData = useCallback((data) => data.map(({ id }) => id), []);
  const onSuccess = useCallback((data) => dispatch(addMsgs(data)), []);

  const queryParams = useMemo(
    () => ({ pageSize: 15, conversation_id: conversationId }),
    [conversationId],
  );

  const scrollToBottom = () => {
    const el = document.getElementById("messages");
    el.scrollTop = el.scrollHeight;
  };

  const onComposerKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  useEffect(() => {
    msgRequestRef.current.shouldScrollToBottom = true;
  }, [conversationId]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="mb-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 backdrop-blur-xl sm:mb-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={team}
              alt={conversationName}
              className="h-11 w-11 rounded-full border border-white/20 object-cover sm:h-12 sm:w-12"
            />
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-white sm:text-xl">
                {conversationName || "Conversation"}
              </h3>
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                Online
              </p>
            </div>
          </div>
          <p className="hidden text-xs uppercase tracking-[0.18em] text-white/50 sm:block">
            Realtime session
          </p>
        </div>
      </header>

      <Inifinite
        ref={msgRequestRef}
        params={queryParams}
        RenderItem={RenderItem}
        name={`messages.${conversationId}.order`}
        request={messagesAsync}
        setData={setData}
        onSuccess={onSuccess}
        style={styles.messages}
        className="chat-scrollbar flex-1 min-h-0 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/45 px-2 py-4 sm:px-4"
        id="messages"
        reversed
        onDataInit={scrollToBottom}
      />

      <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/60 p-2 backdrop-blur-xl sm:mt-4 sm:p-3">
        <div className="relative flex items-center gap-2">
          <Button className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 focus:outline-none">
            <Mic className="h-5 w-5" />
          </Button>

          <input
            ref={input}
            onKeyDown={onComposerKeyDown}
            placeholder="Write something..."
            className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-slate-100 placeholder:text-slate-400 focus:border-cyan-300/50 focus:outline-none"
          />

          <div className="hidden items-center gap-1 sm:flex">
            <Button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 focus:outline-none">
              <Attachment className="h-5 w-5" />
            </Button>
            <Button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 focus:outline-none">
              <Camera className="h-5 w-5" />
            </Button>
            <Button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 focus:outline-none">
              <Smiley className="h-5 w-5" />
            </Button>
          </div>

          <Button
            onClick={sendMessage}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-slate-950 transition hover:brightness-110 focus:outline-none"
          >
            <Send className="h-5 w-5 rotate-90" />
          </Button>
        </div>
      </div>
    </div>
  );
});

const Message = fastMemo(({ id, conversationId, style }) => {
  const { isSender, message, created_at } = useRootMemoSelector(
    `msg.msgs.${conversationId}.${id}`,
    (msg = {}) => msg,
  );

  return (
    <div className={`mb-3 flex items-end gap-2 sm:gap-3 ${isSender ? "justify-end" : "justify-start"}`} style={style}>
      {!isSender && <UserImage />}

      <div
        className={`max-w-[82%] rounded-2xl border px-4 py-3 shadow-lg sm:max-w-[72%] ${
          isSender
            ? "border-cyan-300/25 bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-slate-100"
            : "border-white/15 bg-white/10 text-slate-100"
        }`}
      >
        <p className="text-sm leading-relaxed">{message}</p>

        <div className="mt-2 flex items-center justify-end gap-2 text-xs text-slate-400">
          {isSender && (
            <MessageStatus className="text-slate-400" conversationId={conversationId} />
          )}
          <DateTime type="day" className="text-xs text-slate-400" data={created_at} />
        </div>
      </div>

      {isSender && <UserImage />}
    </div>
  );
});

const UserImage = () => (
  <div className="flex pb-1">
    <img src={team} className="h-9 w-9 rounded-full border border-white/20 sm:h-10 sm:w-10" alt="User" />
  </div>
);

Dashboard.layout = (page) => <Layout title="Chat" children={page} />;

const styles = {
  messages: {
    height: "calc(100vh - 230px - 4rem)",
  },
};

export default Dashboard;
