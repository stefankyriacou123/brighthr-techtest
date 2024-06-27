import { beforeAll, afterAll, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { setProjectAnnotations } from '@storybook/react'
import { setupServer } from 'msw/node'

import * as globalStorybookConfig from '../../.storybook/preview'
import { handlers } from '../mocks'
import { BASE_API_URL } from '../constants'

import '@testing-library/jest-dom/vitest'

const mockAnimations = () => {
  Element.prototype.animate = vi.fn().mockImplementation(() => ({ finished: Promise.resolve() }))
}

// Even though we are generally using storybook stories in our tests, and storybook already
// has msw configured, because storybook is using webpack (for compatibility with nextjs),
// instead of vite, we need to configure msw again for vitest.
const mswServer = setupServer(...handlers)

// If you don't do this, then an error will be thrown when you try to click a button.
beforeAll(() => {
  mockAnimations()
  mswServer.listen({ onUnhandledRequest: request => {
    // We don't want tests making calls to actual api endpoints, and if we just
    // specify `onUnhandledRequest: 'error'`, then it will screw with nextjs urls.
    if (request.url.startsWith(BASE_API_URL))
      throw new Error(`No request handler found for ${request.url}`)
  } })
})

afterAll(() => mswServer.close())

afterEach(() => {
  mswServer.resetHandlers()
  // Clear jsdom after each test.
  cleanup()
})

// Make storybook stories usable in tests.
setProjectAnnotations(globalStorybookConfig)
