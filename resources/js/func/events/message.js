import { privateSubscribe, useEvent } from "./pusher";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
// import { useUser } from "../../store/modules/auth";
import { action, getState, setState } from "use-redux-states";
import store from "../../redux/store";
import { addMsg } from "../../redux/msg";
import { useProps } from "../hooks";

const EVENT_NAME = "Binkode\\ChatSystem\\Events\\Message";

const newMessage = ({ id }, callback) =>
  privateSubscribe(`message-new.user.${id}`, EVENT_NAME, callback);

export const useNewMessage = ({ dispatchDeliver, dispatchRead } = {}) => {
  const id = useProps().auth?.user?.id;
  const dispatch = useDispatch();

  const onEvent = ({ message }) => {
    message.isSender = id === message.user_id;
    dispatch(
      addMsg({
        msg: message,
        dispatchDeliver,
        dispatchRead,
      })
    );
    if (!message?.isSender) {
      prePushMessages(message.conversation_id, message.id);
      reorderConversation(message.conversation_id, message.id);
    }
  };

  const subscriber = useCallback(newMessage, [id]);

  return useEvent({
    subscriber,
    params: { id },
    onMessage: onEvent,
  });
};

const reorderConversation = (conversation_id, messageId) => {
  const CHATS_CONVERSATION_STATE = "conversations.order";

  const conversationsOrder = getState(
    store,
    CHATS_CONVERSATION_STATE,
    ({ data = [] } = {}) => data
  );

  if (conversationsOrder[0] && conversationsOrder[0] !== conversation_id) {
    const conversationIndex = conversationsOrder.findIndex(
      (id) => conversation_id === id
    );

    setState(store.dispatch, () =>
      action(CHATS_CONVERSATION_STATE, (state) => {
        if (!state?.data) {
          state.data = [];
        }

        conversationIndex && state.data.splice(conversationIndex, 1);
        state.data.unshift(conversation_id);
        return state;
      })
    );
  }
};

const prePushMessages = (conversation_id, messageId) => {
  const CHATS_MESSAGE_STATE = `messages.${conversation_id}.order`;

  setState(store.dispatch, () =>
    action(CHATS_MESSAGE_STATE, (state = {}) => {
      if (!state?.data) {
        state.data = [];
      }

      const messageIndex = state.data.indexOf(messageId);
      const hasNoMessage = messageIndex < 0;

      hasNoMessage && state.data.unshift(messageId);

      return state;
    })
  );
};

export default newMessage;
