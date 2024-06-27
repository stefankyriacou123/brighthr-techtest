// We need to specify 'use client' here purely because of the <Typography /> component, though it's worth noting that
// even when you use 'use client', it still renders on the server first; it's basically just classic hydration.
'use client'

import React, { type FC } from 'react'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Typography } from '@material-tailwind/react'

import { getQueryClient } from '../get-query-client'
import { Absences } from './absences'

const Page: FC = () => {
  const queryClient = getQueryClient()

  return <>
    <Typography variant="h1" className="flex justify-center text-gray-900 p-4">Absences</Typography>
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Absences />
      </HydrationBoundary>
    </main>
  </>
}

export default Page
