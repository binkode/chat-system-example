import { createSlice } from '@reduxjs/toolkit'
import { keys, isEmpty, merge } from 'lodash'

const plusMsgs = (msgs, state) => {
  if (msgs.map) {
    // conversation exists
    msgs.map((msg) => plusMsg(state, msg))
  } else {
    plusMsg(state, msgs)
  }

  return state
}

const upMsg = (state, { msg, messageId, conversationId }) => {
  // delete temp message
  remove(
    msg,
    {
      conversationId,
      messageId
    },
    state
  )
  // create permanent message
  msg = merge(state.msgs[msg.conversation_id][msg.id], msg)
  state.msgs[msg.conversation_id][msg.id] = msg
  // if last conversation msg = msg
  if (state.conversations[msg.conversation_id]?.last_message?.id === msg.id) {
    // update conversation last message
    state.conversations[msg.conversation_id].last_message = msg
  }
}

const remove = (msg, { conversationId, messageId } = {}, state) => {
  if (conversationId || messageId) {
    if (msg?.conversation_id !== conversationId || msg?.id !== messageId) {
      // if (sending === false && notSent === false) {
      try {
        if (conversationId?.toString().split('-').length > 1) {
          delete state.msgs[conversationId]
          delete state.conversations[conversationId]
        } else if (messageId?.toString().split('-').length > 1) {
          delete state.msgs[conversationId][messageId]
        }
      } catch (e) {
        console.log('rm', { e })
      }
    }
  } else if (msg?.metas?.token) {
    // if pending message
    if (state.msgs[msg?.conversation_id]?.[`pending-${msg?.metas?.token}`]) {
      delete state.msgs[msg?.conversation_id]?.[`pending-${msg?.metas?.token}`]
    }
  }
}

const plusMsg = (state, message) => {
  let msg = message
  if (state.msgs[msg.conversation_id]) {
    if (
      Object.prototype.hasOwnProperty.call(
        state.msgs[msg.conversation_id],
        msg.id
      )
    ) {
      msg = merge(state.msgs[msg.conversation_id][msg.id], msg)
    }
    state.msgs[msg.conversation_id][msg.id] = msg
  } else {
    const tmp = {}
    tmp[msg.id] = msg
    state.msgs[msg.conversation_id] = tmp
  }
}

const INIT_STATE = {
  conversations: {},
  msgs: {}
}

const { actions, reducer } = createSlice({
  name: 'msg',
  initialState: INIT_STATE,
  reducers: {
    addMsgs: (state, { payload }) => {
      plusMsgs(payload, state)
    },

    addMsg: (
      state,
      { payload: { msg, otherUserId, messageId, conversationId } }
    ) => {
      remove(
        msg,
        {
          conversationId,
          messageId
        },
        state
      )

      plusMsgs(msg, state)
      const unread_count =
        state.conversations[msg.conversation_id]?.unread_count
      const last_message =
        state.conversations[msg.conversation_id]?.last_message

      state.conversations[msg.conversation_id] = {
        ...state.conversations[msg.conversation_id],
        last_message: msg,
        unread_count:
          !msg?.isSender && last_message?.id !== msg?.id
            ? (unread_count || 0) + 1
            : unread_count
      }
      if (otherUserId) {
        state.conversations[msg.conversation_id].participant_id = [
          { id: otherUserId }
        ]
      }
    },

    updateMsg: (state, { payload: { msg, messageId, conversationId } }) => {
      upMsg(state, { msg, messageId, conversationId })
    },

    updateMsgs: (state, { payload: { msgs } }) => {
      msgs?.map((msg) => upMsg(state, { msg }))
    },

    cacheMsgDelete: (state, { payload: { messageId, conversationId } }) => {
      if (state.msgs[conversationId]) {
        delete state.msgs[conversationId][messageId]
      }
      // replace message from conversation last message
      if (
        state.conversations?.[conversationId]?.last_message?.id === messageId
      ) {
        if (isEmpty(state.msgs[conversationId])) {
          // conversation messages empty and delete conversation
          delete state.conversations[conversationId]
        } else {
          const msgs = keys(state.msgs[conversationId])
          console.log({ l: msgs[msgs.length - 1] })
          state.conversations[conversationId].last_message =
            state.msgs[conversationId][msgs[msgs.length - 1]]
        }
      }
    },

    addConvers: (state, { payload: conversations = [] }) => {
      conversations.map((conv) => (state.conversations[conv.id] = conv))
    },
    updateConvers: (state, { payload: { conversation } }) => {
      if (state.conversations[conversation.id]) {
        state.conversations[conversation.id] = merge(
          state.conversations[conversation.id],
          conversation
        )
      }
    },
    delConvers: (state, { payload: { id } }) => {
      delete state.msgs[id]
      delete state.conversations[id]
    },
    readConversation: (state, { payload: { id } }) => {
      if (state.conversations[id]) {
        state.conversations[id].unread_count = 0
      }
    }
  }
})

export const {
  addMsgs,
  delConvers,
  addMsg,
  updateMsg,
  cacheMsgDelete,
  addConvers,
  updateConvers,
  readConversation,
  updateMsgs
} = actions

export default reducer
