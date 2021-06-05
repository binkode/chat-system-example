import { InertiaHead } from '@inertiajs/inertia-react'

const Site = ({ title, children }) => {
  return (
    <InertiaHead>
      <title>{title ? `${title} - ChatSystem` : 'ChatSystem'}</title>
      {children}
    </InertiaHead>
  )
}

export default Site
