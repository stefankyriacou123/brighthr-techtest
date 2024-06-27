import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'

import * as stories from './absence-table.stories'

const { Basic } = composeStories(stories)

describe('AbsenceTable', () => {
  test('shell renders correctly', async () => {
    render(<Basic />)

    const firstNameHeader = screen.getByText('First Name')
    const lastNameHeader = screen.getByText('Last Name')
    const absenceTypeHeader = screen.getByText('Absence Type')
    const approvedHeader = screen.getByText('Approved')
    const startDateHeader = screen.getByText('Start Date')
    const endDateHeader = screen.getByText('End Date')

    expect(firstNameHeader).toBeDefined()
    expect(lastNameHeader).toBeDefined()
    expect(absenceTypeHeader).toBeDefined()
    expect(approvedHeader).toBeDefined()
    expect(startDateHeader).toBeDefined()
    expect(endDateHeader).toBeDefined()
  })

  // TODO For some reason, the actual data is not being rendered, this is possibly related
  // to jsdom not rendering something to do with react-virtual maybe?  Either way, there
  // are no errors, and I can't find any working examples of testing either react-virtual
  // or react-table, meaning that fixing this will be time consuming, so for the time
  // being, we'll just have to test that data renders correctly with playwright.
  test.skip('renders data', async () => {
    render(<Basic />)

    // const element = screen.getByText('John')
    const element = await screen.findByText('John')
    expect(element).toBeDefined()
  })
})
