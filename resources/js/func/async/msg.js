import request, { useRequest } from "./";

const msgs = (params) => request("api/messages", params);

export const conversations = (params) => request("api/conversations", params);

export const useMessages = (props = {}, dep) =>
  useRequest({ request: msgs, ...props }, dep);

export const useConversations = (props = {}, dep) =>
  useRequest({ request: conversations, ...props }, dep);

export const send = (params) => request("api/messages", params, 'post');

export default msgs
