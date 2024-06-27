import { type JSX, useState, useMemo, useEffect } from 'react'
import { IconButton, Typography } from '@material-tailwind/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export type PaginationProps = {
  totalEntries: number
  entriesPerPage: number | "all"
  initialActivePage?: number
  onPageChange?: (newPage: number) => void
  onClickNext?: () => void
  onClickPrevious?: () => void
}
 
export const PaginationControls = ({
  totalEntries,
  entriesPerPage,
  initialActivePage = 1,
  onPageChange,
  onClickNext,
  onClickPrevious,
}: PaginationProps): JSX.Element => {
  const [activePage, setActivePage] = useState(initialActivePage)
  const totalPages = useMemo(() => {
    if (entriesPerPage === "all") return 1
    return Math.ceil(totalEntries / entriesPerPage) || 1
  }, [totalEntries, entriesPerPage])

  useEffect(() => onPageChange?.(activePage), [onPageChange, activePage])
 
  const next = () => {
    if (activePage >= totalPages) return
    setActivePage(activePage + 1)
    onClickNext?.()
  }
 
  const previous = () => {
    if (activePage <= 1) return
    setActivePage(activePage - 1)
    onClickPrevious?.()
  }
 
  return <div className="flex items-center gap-8">
    <IconButton
      aria-label="previous page button"
      size="sm"
      variant="filled"
      className="rounded-full"
      onClick={previous}
      disabled={activePage <= 1}
    >
      <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" />
    </IconButton>
    <Typography color="gray" className="font-normal">
      Page {activePage} of {totalPages}
    </Typography>
    <IconButton
      aria-label="next page button"
      size="sm"
      variant="filled"
      className="rounded-full"
      onClick={next}
      disabled={activePage >= totalPages}
    >
      <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
    </IconButton>
  </div>
}
