import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'

import * as stories from './page.stories'

const { OneAbsence, TwoAbsences, ThreeAbsences } = composeStories(stories)

describe('AbsenceTable', () => {
  test('renders one absence correctly', async () => {
    render(<OneAbsence />)

    const header = await screen.findByText('Rahaf Deckard')
    expect(header).toBeDefined()

    const startDate = await screen.findByText('Start Date: 28/05/2022 05:39:06')
    const endDate = await screen.findByText('End Date: 06/06/2022 05:39:06')
    const absenceType = await screen.findByText('Absence Type: Sickness')
    const approved = await screen.findByText('Approved: Approved')

    expect(startDate).toBeDefined()
    expect(endDate).toBeDefined()
    expect(absenceType).toBeDefined()
    expect(approved).toBeDefined()
  })

  test('renders two absences correctly', async () => {
    render(<TwoAbsences />)

    const header = await screen.findByText('Jabez Nasser')
    expect(header).toBeDefined()

    const firstStartDate = await screen.findByText('Start Date: 01/01/2022 13:12:13')
    const firstEndDate = await screen.findByText('End Date: 15/01/2022 13:12:13')
    const secondStartDate = await screen.findByText('Start Date: 08/05/2023 08:46:20')
    const secondEndDate = await screen.findByText('End Date: 09/05/2023 08:46:20')
    const [firstAbsenceType, secondAbsenceType] = await screen.findAllByText('Absence Type: Annual Leave')
    const [firstApproved, secondApproved] = await screen.findAllByText('Approved: Approved')

    expect(firstStartDate).toBeDefined()
    expect(firstEndDate).toBeDefined()
    expect(firstAbsenceType).toBeDefined()
    expect(firstApproved).toBeDefined()

    expect(secondStartDate).toBeDefined()
    expect(secondEndDate).toBeDefined()
    expect(secondAbsenceType).toBeDefined()
    expect(secondApproved).toBeDefined()
  })

  test('renders three absences correctly', async () => {
    render(<ThreeAbsences />)

    const header = await screen.findByText('Amiah Fenton')
    expect(header).toBeDefined()

    const firstStartDate = await screen.findByText('Start Date: 31/12/2020 03:08:19')
    const firstEndDate = await screen.findByText('End Date: 18/01/2021 03:08:19')
    const secondStartDate = await screen.findByText('Start Date: 24/12/2020 04:37:16')
    const secondEndDate = await screen.findByText('End Date: 06/01/2021 04:37:16')
    const thirdStartDate = await screen.findByText('Start Date: 08/06/2023 14:11:47')
    const thirdEndDate = await screen.findByText('End Date: 18/06/2023 14:11:47')
    const [firstAbsenceType, secondAbsenceType, thirdAbsenceType] = await screen.findAllByText('Absence Type: Annual Leave')
    const [firstApproved, secondApproved, thirdApproved] = await screen.findAllByText('Approved: Approved')

    expect(firstStartDate).toBeDefined()
    expect(firstEndDate).toBeDefined()
    expect(firstAbsenceType).toBeDefined()
    expect(firstApproved).toBeDefined()

    expect(secondStartDate).toBeDefined()
    expect(secondEndDate).toBeDefined()
    expect(secondAbsenceType).toBeDefined()
    expect(secondApproved).toBeDefined()

    expect(thirdStartDate).toBeDefined()
    expect(thirdEndDate).toBeDefined()
    expect(thirdAbsenceType).toBeDefined()
    expect(thirdApproved).toBeDefined()
  })
})
