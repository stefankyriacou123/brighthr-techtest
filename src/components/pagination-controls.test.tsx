import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'

import * as stories from './pagination-controls.stories'

const { Basic, WithCustomInitialPage, WithExcessiveEntries, WithTwoPages, WithOnePage, WithNoEntries } = composeStories(stories)

describe('PaginationControls', () => {
  test('renders correctly', async () => {
    render(<Basic />)

    const element = screen.getByText('Page 1 of 7')
    expect(element).toBeDefined()
  })

  test('can set default initial active page', async () => {
    render(<WithCustomInitialPage />)

    const element = screen.getByText('Page 3 of 7')
    expect(element).toBeDefined()
  })

  test('can navigate to next page', async () => {
    render(<Basic />)

    const nextButton = screen.getByRole('button', { name: 'next page button' })
    await userEvent.click(nextButton)

    const element = screen.getByText('Page 2 of 7')
    expect(element).toBeDefined()
  })

  test('can navigate to previous page', async () => {
    render(<WithCustomInitialPage />)

    const previousButton = screen.getByRole('button', { name: 'previous page button' })
    await userEvent.click(previousButton)

    const element = screen.getByText('Page 2 of 7')
    expect(element).toBeDefined()
  })

  test('can display triple digits of total page', async () => {
    render(<WithExcessiveEntries />)

    const element = screen.getByText('Page 1 of 667')
    expect(element).toBeDefined()
  })

  test('next button is disabled if on final page', async () => {
    render(<WithTwoPages />)

    const element = screen.getByText('Page 1 of 2')
    expect(element).toBeDefined()

    const nextButton = screen.getByRole('button', { name: 'next page button' })
    expect(nextButton).toBeDefined()
    expect(nextButton.getAttribute('disabled')).toBeNull()

    await userEvent.click(nextButton)
    expect(nextButton.getAttribute('disabled')).not.toBeNull()
  })

  test('previous button is disabled if on first page', async () => {
    render(<WithTwoPages />)

    const element = screen.getByText('Page 1 of 2')
    expect(element).toBeDefined()

    const previousButton = screen.getByRole('button', { name: 'previous page button' })
    expect(previousButton).toBeDefined()
    expect(previousButton.getAttribute('disabled')).not.toBeNull()

    const nextButton = screen.getByRole('button', { name: 'next page button' })
    await userEvent.click(nextButton)

    expect(previousButton.getAttribute('disabled')).toBeNull()
  })

  test('neither button is disabled if on neither first or last page', async () => {
    render(<WithCustomInitialPage />)

    const element = screen.getByText('Page 3 of 7')
    expect(element).toBeDefined()

    const nextButton = screen.getByRole('button', { name: 'next page button' })
    expect(nextButton).toBeDefined()
    expect(nextButton.getAttribute('disabled')).toBeNull()

    const previousButton = screen.getByRole('button', { name: 'previous page button' })
    expect(previousButton).toBeDefined()
    expect(previousButton.getAttribute('disabled')).toBeNull()
  })

  test('both buttons are disabled if only one page', async () => {
    render(<WithOnePage />)

    const element = screen.getByText('Page 1 of 1')
    expect(element).toBeDefined()

    const nextButton = screen.getByRole('button', { name: 'next page button' })
    expect(nextButton).toBeDefined()
    expect(nextButton.getAttribute('disabled')).not.toBeNull()

    const previousButton = screen.getByRole('button', { name: 'previous page button' })
    expect(previousButton).toBeDefined()
    expect(previousButton.getAttribute('disabled')).not.toBeNull()
  })

  test('renders correctly with no entries', async () => {
    render(<WithNoEntries />)

    const element = screen.getByText('Page 1 of 1')
    expect(element).toBeDefined()

    const nextButton = screen.getByRole('button', { name: 'next page button' })
    expect(nextButton).toBeDefined()
    expect(nextButton.getAttribute('disabled')).not.toBeNull()

    const previousButton = screen.getByRole('button', { name: 'previous page button' })
    expect(previousButton).toBeDefined()
    expect(previousButton.getAttribute('disabled')).not.toBeNull()
  })
})
