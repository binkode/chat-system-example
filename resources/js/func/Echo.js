import Echo from "laravel-echo";
import PusherJs from "pusher-js";
import Http from "./Http";

const { VITE_PUSHER_APP_KEY, VITE_PUSHER_APP_CLUSTER } = import.meta.env;

if (import.meta.env.DEV) {
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;
}

window.Pusher = PusherJs;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: VITE_PUSHER_APP_KEY,
  cluster: VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        Http.post("/api/broadcasting/auth", {
          socket_id: socketId,
          channel_name: channel.name,
        })
          .then((response) => callback(false, response.data))
          .catch((error) => callback(true, error));
      },
    };
  },
});
