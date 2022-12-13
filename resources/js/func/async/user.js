import request, { useRequest } from "./";

export const users = (params) => request("users", params);
export const useUsers = (props = {}, dep) =>
  useRequest({ request: users, ...props }, dep);
