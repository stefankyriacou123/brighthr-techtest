'use client'

import React, { type ReactNode, useEffect } from 'react'

import { isProduction, BASE_API_URL } from '../constants'

export const MswWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
  useEffect(() => {
    // msw will break if you try to run it on the server, and the nextjs 'use client' directive is still
    // server rendered, so we have to also check if window is defined.
    if (!isProduction && typeof window !== 'undefined') {
      import('../setup/mock-service-worker').then(({ mockServiceWorker }) => {
        mockServiceWorker.start({ onUnhandledRequest: request => {
          // We don't want tests making calls to actual api endpoints, and if we just
          // specify `onUnhandledRequest: 'error'`, then it will screw with nextjs urls.
          if (request.url.startsWith(BASE_API_URL))
            throw new Error(`No request handler found for ${request.url}`)
        }})
      })
    }
  }, [])

  return <>{children}</>
}
