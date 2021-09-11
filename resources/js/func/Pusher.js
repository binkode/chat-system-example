import axios from "axios";
import Pusher from "pusher-js";
const { VITE_PUSHER_APP_KEY, VITE_APP_URL, VITE_PUSHER_APP_CLUSTER } =
  import.meta.env;

if (import.meta.env.DEV) {
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;
}

export const initPusher = async () => {
  if (window.pusher) {
    window.pusher.disconnect();
  }

  const options = {
    cluster: VITE_PUSHER_APP_CLUSTER,
    authEndpoint: VITE_APP_URL + "/broadcasting/auth",
  };

  window.pusher = new Pusher(VITE_PUSHER_APP_KEY, options);
  window.pusher.connection.bind("connected", () => {
    axios.defaults.headers.common["X-Socket-ID"] =
      window.pusher.connection.socket_id;
  });
};
