import runes from 'runes'

export const trunc = (string, n) =>
  string?.length > n ? runes.substr(string, 0, n - 1) + '...' : string
