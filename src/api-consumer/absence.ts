import type { Absence } from '../types'
import { BASE_API_URL } from '../constants'

export const getAbsenceList = async (): Promise<Absence[]> => {
  const response = await fetch(`${BASE_API_URL}/absences`)
  const data = await response.json()
  return data
}

// NOTE: This api endpoint is a bit odd, and a boolean value for whether there is a conflict or not should probably
// just be included in the `/absences` endpoint.
export const getAbsenceConflict = async (id: Absence['id']): Promise<{ conflicts: boolean }> => {
  const response = await fetch(`${BASE_API_URL}/conflict/${id}`)
  const data = await response.json()
  return data
}
