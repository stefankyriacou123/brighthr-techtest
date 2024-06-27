'use client'

import { type FC, useMemo } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Card, CardBody, Typography } from "@material-tailwind/react"

import type { Absence } from '../../../types'
import { getAbsenceList } from '../../../api-consumer/absence'
import { formatDate, addDays, formatAbsenceType } from '../../../utilities'

type EntryProps = {
  data: Absence
}

const Entry: FC<EntryProps> = ({ data }) => {
  return <Card className="w-96">
    <CardBody className="flex flex-col gap-1">
      <Typography color="black">Start Date: {formatDate(new Date(data.startDate))}</Typography>
      <Typography color="black">End Date: {formatDate(addDays(new Date(data.startDate), data.days))}</Typography>
      <Typography color="black">Absence Type: {formatAbsenceType(data.absenceType)}</Typography>
      <Typography color="black">Approved: {data.approved ? 'Approved' : 'Pending'}</Typography>
    </CardBody>
  </Card>
}

type PageProps = {
  params: { id: string }
}

const Page: FC<PageProps> = ({ params }) => {
  const query = useSuspenseQuery({ queryKey: ['absences'], queryFn: getAbsenceList })
  const data = useMemo(() => (query.data ?? []).filter(value => value.employee.id === params.id), [query, params])

  return <div className="flex flex-col gap-8 w-full items-center pt-3">
    <Typography variant="h2" className="p-4 w-fit">
      {/* The user is the same on all cards. */}
      {data[0].employee.firstName} {data[0].employee.lastName}
    </Typography>
    <ul className="flex flex-col gap-6 w-fit items-center">
      {data.map(entry => <li key={entry.id}><Entry data={entry} /></li>)}
    </ul>
  </div>
}

export default Page
