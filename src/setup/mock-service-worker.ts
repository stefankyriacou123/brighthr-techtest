import { setupWorker } from 'msw/browser'
import { handlers } from '../mocks'
 
export const mockServiceWorker = setupWorker(...handlers)
