import { useEffect, useLayoutEffect, useState } from 'react'

export const privateSubscribe = (channelName, eventName, callback) =>
  Echo.private(channelName).listen(eventName, callback)

export const presenceSubscribe = (channelName, eventName, callback) =>
  Echo.presence(channelName).listen(eventName, callback)

const subscribe = (channelName, eventName, callback) =>
  Echo.channel(channelName).listen(eventName, callback)

export const useEvent = ({
  subscriber,
  params,
  onMessage = () => {},
  timeout,
  onTimeOut,
  leaving,
  joining,
  onSuccess,
  subscribe = true,
  here
}) => {
  const [subscription, setSubscription] = useState()
  useLayoutEffect(() => {
    if (subscribe && subscriber) {
      const subscription = subscriber(params, onMessage)
      onSuccess && subscription.onSuccess(onSuccess)
      leaving && subscription.leaving(leaving)
      joining && subscription.joining(joining)
      here && subscription.here(here)
      setSubscription(subscription)
      console.log(subscription)
      return () => Echo.leave(subscription?.name)
    }
  }, [subscriber, subscribe])

  useEffect(() => {
    if (timeout && subscription) {
      const timer = setTimeout(() => {
        Echo.leave(subscription?.name)
        onTimeOut && onTimeOut()
      }, timeout)

      return () => clearTimeout(timer)
    }
  }, [timeout, onTimeOut])

  return subscription
}

export default subscribe
