import { usePage } from '@inertiajs/inertia-react'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { createSelector } from 'reselect'
import isEqual from 'react-fast-compare'

export const useProps = () => usePage().props

export const useRoute = () => {
  return { params: new URLSearchParams(window.location.search) }
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
