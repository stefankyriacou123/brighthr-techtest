import type { Meta, StoryObj } from '@storybook/react'

import { absenceList } from '../../../mocks/absence'
import Page from './page'

const meta = {
  title: 'Pages / absence / [id]',
  component: Page,
  parameters: {
    nextjs: { appDirectory: true },
  }
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

const userWithOneAbsence = absenceList[0].employee.id
const userWithTwoAbsences = absenceList[3].employee.id
const userWithThreeAbsences = absenceList[2].employee.id

export const OneAbsence: Story = {
  args: { params: { id: userWithOneAbsence } },
}

export const TwoAbsences: Story = {
  args: { params: { id: userWithTwoAbsences } },
}

export const ThreeAbsences: Story = {
  args: { params: { id: userWithThreeAbsences } },
}
