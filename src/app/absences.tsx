'use client'

import { type FC, useMemo } from 'react'
import { useSuspenseQuery, useQueries } from '@tanstack/react-query'

import { AbsenceTable, ROW_HEIGHT } from '../components/absence-table'
import { getAbsenceList, getAbsenceConflict } from '../api-consumer/absence'

export const Absences: FC = () => {
  const query = useSuspenseQuery({ queryKey: ['absences'], queryFn: getAbsenceList })

  // Guarantee the id order is always the same, so we can use them to merge the result of useQueries back into data.
  const orderedIds = useMemo(() => (query.data ?? []).map(absence => absence.id).sort(), [query])

  // In practice, there probably shouldn't be a separate api endpoint for each
  // individual absence conflict, which would render all this logic unnecessary.
  const results = useQueries({
    queries: orderedIds.map(id => ({
      queryKey: ['conflict', id],
      queryFn: () => getAbsenceConflict(id),
    })),
  })

  const data = useMemo(() => {
    const data = query.data ?? []

    return orderedIds.map((id, index) => {
      const entry = data.find(absence => absence.id === id)
      const conflicts = results[index].data?.conflicts

      // TODO Ideally, it's better to return errors and handle them gracefully (so they are captured in type data),
      // but i'm being lazy here, because it's a tech test.
      if (!entry) throw new Error(`Could not find absence with id ${id}`)

      return { ...entry, conflicts: conflicts ?? false }
    })
  }, [query, orderedIds, results])

  return <div className="flex justify-center">
    <AbsenceTable data={data} height={`${10 * ROW_HEIGHT}px`} />
  </div>
}
