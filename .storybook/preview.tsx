import type { Preview } from '@storybook/react'
import { initialize, mswLoader, getWorker } from 'msw-storybook-addon'

import { Providers } from '../src/app/providers'
import { BASE_API_URL } from '../src/constants'

import '../src/app/index.css'

initialize({ onUnhandledRequest: request => {
  // We don't want tests making calls to actual api endpoints, and if we just
  // specify `onUnhandledRequest: 'error'`, then it will screw with nextjs urls.
  if (request.url.startsWith(BASE_API_URL))
    throw new Error(`No request handler found for ${request.url}`)
} })

const preview: Preview = {
  decorators: [
    Story => <Providers><Story /></Providers>,
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [
    mswLoader,
    // This should be handled by `mswLoader`, but isn't, causing requests to be fired before
    // the worker has started; adding this explicitly means the worker has to finish starting
    // before any requests are fired. Hopefully it can be removed in a future release.
    () => getWorker().start(),
  ],
}

export default preview
