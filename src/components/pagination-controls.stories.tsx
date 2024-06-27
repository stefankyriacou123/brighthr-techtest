import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { PaginationControls } from './pagination-controls'

const meta = {
  title: 'Components / PaginationControls',
  component: PaginationControls,
  parameters: { layout: 'centered' },
  args: { onPageChange: fn(), onClickNext: fn(), onClickPrevious: fn()},
} satisfies Meta<typeof PaginationControls>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    totalEntries: 100,
    entriesPerPage: 15,
  },
}

export const WithCustomInitialPage: Story = {
  args: {
    totalEntries: 100,
    entriesPerPage: 15,
    initialActivePage: 3,
  },
}

export const WithExcessiveEntries: Story = {
  args: {
    totalEntries: 10_000,
    entriesPerPage: 15,
  },
}

export const WithTwoPages: Story = {
  args: {
    totalEntries: 20,
    entriesPerPage: 15,
  },
}

export const WithOnePage: Story = {
  args: {
    totalEntries: 10,
    entriesPerPage: 15,
  },
}

export const WithNoEntries: Story = {
  args: {
    totalEntries: 0,
    entriesPerPage: 15,
  },
}
