import { memo } from 'react'
import runes from 'runes'
import isEqual from 'react-fast-compare'

export const trunc = (string, n) =>
  string?.length > n ? runes.substr(string, 0, n - 1) + '...' : string

export const fastMemo = (Component) => memo(Component, isEqual)
