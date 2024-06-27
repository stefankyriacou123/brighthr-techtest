export type AbsenceType = 'SICKNESS' | 'MEDICAL' | 'ANNUAL_LEAVE'

export type Employee = {
  id: string
  firstName: string
  lastName: string
}

export type Absence = {
  id: number
  startDate: string
  days: number
  absenceType: AbsenceType
  approved: boolean
  employee: Employee
}

export type AbsenceIncludingConflict = { conflicts: boolean } & Absence
