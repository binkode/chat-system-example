import request, { useReduxRequest } from './'

const msgs = (params) => request('api/messages', params)

export const conversations = (params) => request('api/conversations', params)

export const useMessages = (props = {}, dep) =>
  useReduxRequest({ name: 'messages.order', ...props, request: msgs }, dep)

export const useConversations = (props = {}, dep) =>
  useReduxRequest({ name: 'conversations.order', request: conversations, ...props }, dep)

export const send = (params) => request('api/messages', params, 'post')

export default msgs
