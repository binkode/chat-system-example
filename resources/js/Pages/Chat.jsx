import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { Send, Attachment, Mic, Camera, Smiley } from "../icons";
import Layout from "../Layout/Dashboard.jsx";
import { useDispatch } from "react-redux";
import { router } from "@inertiajs/react";
import { useRoute, useRootMemoSelector, useProps } from "../func/hooks";
import messagesAsync, { send } from "../func/async/msg";
import { useUsers } from "../func/async/user";
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
  const [showNewChat, setShowNewChat] = useState(false);
  const { auth } = useProps();

  useNewMessage();

  const conversation_id = useMemo(
    () => parseInt(params.get("conversation_id"), 10),
    [params],
  );
  const other_user_id = useMemo(() => parseInt(params.get("other_user_id"), 10), [params]);

  const {
    loading: loadingUsers,
    data: { data: usersData = [] } = {},
  } = useUsers({}, []);

  const users = useMemo(
    () => usersData.filter(({ id }) => id !== auth?.user?.id),
    [usersData, auth?.user?.id],
  );

  useEffect(() => {
    if (conversation_id) {
      dispatch(readConversation({ id: conversation_id }));
    }
  }, [conversation_id]);

  const onStartNewChat = useCallback((userId) => {
    setShowNewChat(false);
    router.get(
      "chat",
      { other_user_id: userId },
      { preserveState: true, replace: true, only: ["messages"] },
    );
  }, []);

  return (
    <section className="landing-bg h-full p-3 sm:p-5">
      <div className="landing-card h-full border-white/10 bg-white/5 p-3 sm:p-5">
        {conversation_id || other_user_id ? (
          <Messages
            conversationId={conversation_id}
            otherUserId={other_user_id}
            users={users}
            onOpenNewChat={() => setShowNewChat(true)}
          />
        ) : (
          <EmptyConversationState onNewChat={() => setShowNewChat(true)} />
        )}
      </div>

      <NewChatModal
        open={showNewChat}
        users={users}
        loading={loadingUsers}
        onClose={() => setShowNewChat(false)}
        onSelect={onStartNewChat}
      />
    </section>
  );
});

const EmptyConversationState = fastMemo(({ onNewChat }) => (
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
    <Button onClick={onNewChat} className="landing-btn landing-btn-primary">
      New Chat
    </Button>
  </div>
));

const NewChatModal = fastMemo(({ open, loading, users = [], onClose, onSelect }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-slate-950/95 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <h3 className="text-lg font-semibold text-white">Start New Chat</h3>
          <Button
            onClick={onClose}
            className="inline-flex h-8 items-center justify-center rounded-lg px-3 text-xs uppercase tracking-[0.14em] text-slate-300 hover:bg-white/10"
          >
            Close
          </Button>
        </div>

        <div className="chat-scrollbar max-h-[55vh] space-y-2 overflow-y-auto pr-1">
          {loading && (
            <p className="py-4 text-center text-sm text-slate-400">Loading users...</p>
          )}

          {!loading && !users.length && (
            <p className="py-4 text-center text-sm text-slate-400">No users found.</p>
          )}

          {!loading &&
            users.map((user) => (
              <Button
                key={user.id}
                onClick={() => onSelect(user.id)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
              >
                <p className="truncate text-sm font-semibold text-slate-100">{user.name}</p>
                <p className="truncate text-xs text-slate-400">{user.email}</p>
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
});

const Messages = fastMemo(({ conversationId, otherUserId, users = [], onOpenNewChat }) => {
  const msgRequestRef = useRef();
  const input = useRef();

  const dispatch = useDispatch();

  const messageStateName = useMemo(
    () => `messages.${conversationId || `other-${otherUserId}`}.order.data`,
    [conversationId, otherUserId],
  );
  const setMessagesOrderData = useSetState(messageStateName);

  const RenderItem = useCallback(
    ({ item, style }) => (
      <Message id={item?.id} conversationId={item?.conversationId || conversationId} style={style} />
    ),
    [conversationId],
  );

  const conversation = useRootMemoSelector(
    `msg.conversations.${conversationId}`,
    (conv = {}) => conv,
  );
  const selectedUser = useMemo(
    () => users.find(({ id }) => id === otherUserId),
    [users, otherUserId],
  );
  const conversationName = conversation?.name || selectedUser?.name;

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
      conversation_id: conversationId || undefined,
      other_user_id: !conversationId ? otherUserId : undefined,
    });

    dispatch(addMsg({ msg: message }));
    setMessagesOrderData((data = []) => [
      { id: message.id, conversationId: message.conversation_id },
      ...data,
    ]);

    if (!conversationId && message?.conversation_id) {
      router.get(
        "chat",
        { conversation_id: message.conversation_id },
        { preserveState: true, replace: true, only: ["messages"] },
      );
    }

    const conversationsOrder = getConversationsOrder((state) => state?.data || []);
    const activeConversationId = message?.conversation_id || conversationId;

    if (
      activeConversationId &&
      conversationsOrder[0] &&
      conversationsOrder[0] !== activeConversationId
    ) {
      const conversationIndex = conversationsOrder.findIndex(
        (id) => activeConversationId === id,
      );

      setConversationsOrder((state) => {
        conversationIndex && state.data.splice(conversationIndex, 1);
        state.data?.unshift(activeConversationId);
        return state;
      });
    }
  }, [conversationId, otherUserId]);

  const setData = useCallback(
    (data) => data.map(({ id, conversation_id }) => ({ id, conversationId: conversation_id })),
    [],
  );
  const onSuccess = useCallback((data) => dispatch(addMsgs(data)), []);

  const queryParams = useMemo(
    () => ({
      pageSize: 15,
      conversation_id: conversationId || undefined,
      other_user_id: !conversationId ? otherUserId : undefined,
    }),
    [conversationId, otherUserId],
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
  }, [conversationId, otherUserId]);

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
          <Button
            onClick={onOpenNewChat}
            className="hidden rounded-lg border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.14em] text-white/70 transition hover:border-cyan-300/40 hover:text-cyan-200 sm:inline-flex"
          >
            New Chat
          </Button>
        </div>
      </header>

      <Inifinite
        ref={msgRequestRef}
        params={queryParams}
        RenderItem={RenderItem}
        name={`messages.${conversationId || `other-${otherUserId}`}.order`}
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
