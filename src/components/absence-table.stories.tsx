import type { Meta, StoryObj } from '@storybook/react'

import { AbsenceTable, ROW_HEIGHT } from './absence-table'
import { absenceList, compiledConflictResponses } from '../mocks/absence'

const meta = {
  title: 'Components / AbsenceTable',
  component: AbsenceTable,
  parameters: {
    nextjs: { appDirectory: true },
  }
} satisfies Meta<typeof AbsenceTable>

export default meta
type Story = StoryObj<typeof meta>

// In practice, there probably shouldn't be a separate api endpoint for each
// individual absence conflict, which would render all this logic unnecessary.
const orderedIds = absenceList.map(absence => absence.id).sort()
const data = orderedIds.map((id, index) => {
  const entry = absenceList.find(absence => absence.id === id)
  const conflicts = compiledConflictResponses[index].conflicts

  // TODO Ideally, it's better to return errors and handle them gracefully (so they are captured in type data),
  // but i'm being lazy here, because it's a tech test.
  if (!entry) throw new Error(`Could not find absence with id ${id}`)

  return { ...entry, conflicts }
})

export const Standard: Story = {
  args: { data },
}

export const StaticHeight: Story = {
  render: ({ data }) => <AbsenceTable data={data} height={`${ROW_HEIGHT * 10}px`} />,
  args: { data },
}

export const Empty: Story = {
  args: {
    data: [],
  },
}

export const Basic: Story = {
  args: {
    data: [
      {
        id: 1,
        startDate: '2022-01-01',
        days: 1,
        absenceType: 'SICKNESS',
        approved: true,
        employee: { id: '1', firstName: 'John', lastName: 'Doe' },
        conflicts: false,
      },
    ],
  }
}
