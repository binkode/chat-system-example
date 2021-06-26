import { useMemo } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { createSelector } from 'reselect'
import isEqual from 'react-fast-compare'
import moment from 'moment'

export const useProps = () => usePage().props

export const useRoute = () => {
  const { url } = usePage()
  return { url, params: new URLSearchParams(window.location.search) }
}

export const useRootMemoSelector = (
  selectorOrName,
  select = sel,
  eq = isEqual
) =>
  useSelector(
    createSelector(
      isString(selectorOrName)
        ? (state) => get(state, selectorOrName)
        : selectorOrName,
      select
    ),
    eq
  )

const sel = (state) => state
const isString = (val) => typeof val === 'string'

export const useConversationEventType = (id) => {
  const chat_events = useRootMemoSelector(
    `msg.conversations.${id}`,
    ({ read, delivery, created_at } = {}) => ({ read, delivery, created_at })
  )

  return useEventType(chat_events)
}

export const useEventType = ({ read, delivery, created_at }) =>
  useMemo(() => {
    if (read) {
      if (
        !created_at ||
        (created_at && moment(read.created_at).isAfter(created_at))
      ) {
        return 'read'
      }
    }

    if (delivery) {
      if (
        !created_at ||
        (created_at && moment(delivery.created_at).isAfter(created_at))
      ) {
        return 'deliver'
      }
    }
  }, [read, delivery, created_at])
