import { format, add } from 'date-fns'

import type { AbsenceType } from './types'

export const formatDate = (date: Date): string => format(date, 'dd/MM/yyyy HH:mm:ss')

export const addDays = (date: Date, days: number): Date => add(date, { days })

const absenceLabels: { [key in AbsenceType]: string } = {
  'ANNUAL_LEAVE': 'Annual Leave',
  'MEDICAL': 'Medical',
  'SICKNESS': 'Sickness',
}

export const formatAbsenceType = (type: AbsenceType): string => absenceLabels[type]
