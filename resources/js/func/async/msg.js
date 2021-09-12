import { usePagination, apiRequest } from './'

const msgs = (params) => apiRequest('messages', params)

export const conversations = (params) => apiRequest('conversations', params)

export const useMessages = (props = {}, dep) =>
  usePagination({ name: 'messages.order', ...props, request: msgs }, dep)

export const useConversations = (props = {}, dep) =>
  usePagination(
    { name: 'conversations.order', request: conversations, ...props },
    dep
  )

export const send = (params) => apiRequest('messages', params, 'post')

export default msgs
