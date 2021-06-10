import { usePage } from '@inertiajs/inertia-react'

export const useProps = () => usePage().props

export const useRoute = () => {
  return { params: new URLSearchParams(window.location.search) }
}
