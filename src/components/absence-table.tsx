import { type FC, useRef, useState, useEffect } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  type Table,
  type Row,
  type HeaderGroup,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Card, Typography, Select, Option } from '@material-tailwind/react'
import Link from 'next/link'

import type { AbsenceIncludingConflict, Employee } from '../types'
import { isProduction } from '../constants'
import { formatDate, formatAbsenceType, addDays } from '../utilities'
import { PaginationControls } from './pagination-controls.tsx'

/** Row height needs to be static for the virtual list. */
export const ROW_HEIGHT = 48

const columnDefinitions: ColumnDef<AbsenceIncludingConflict>[] = [
  {
    id: 'firstName',
    header: 'First Name',
    sortingFn: (a, b) => a.original.employee.firstName.localeCompare(b.original.employee.firstName),
    accessorFn: row => row.employee,
    cell: props => <Link
      href={`/absence/${(props.getValue() as Employee).id}`}
      className="w-full hover:bg-gray-300 rounded-lg p-2"
    >
      <span className="px-3">{(props.getValue() as Employee).firstName}</span>
    </Link>,
  },
  {
    id: 'lastName',
    header: 'Last Name',
    sortingFn: (a, b) => a.original.employee.lastName.localeCompare(b.original.employee.lastName),
    accessorFn: row => row.employee,
    cell: props => <Link
      href={`/absence/${(props.getValue() as Employee).id}`}
      className="w-full hover:bg-gray-300 rounded-lg p-2"
    >
      <span className="px-3">{(props.getValue() as Employee).lastName}</span>
    </Link>,
  },
  {
    id: 'absenceType',
    header: 'Absence Type',
    accessorFn: row => formatAbsenceType(row.absenceType),
    cell: props => <span className="px-3">{props.getValue() as string}</span>,
  },
  {
    id: 'approved',
    header: 'Approved',
    accessorFn: row => row.approved ? 'Approved' : 'Pending',
    cell: props => <span className="px-3">{props.getValue() as string}</span>,
  },
  {
    id: 'startDate',
    header: 'Start Date',
    size: 200,
    sortingFn: (a, b) => new Date(a.original.startDate) > new Date(b.original.startDate) ? 1 : -1,
    accessorFn: row => row,
    cell: props => {
      const value = props.getValue() as AbsenceIncludingConflict
      const dateString = formatDate(new Date(value.startDate))
      return <span className="px-3">{dateString} {value.conflicts && '⚠️'}</span>
    },
  },
  {
    id: 'endDate',
    header: 'End Date',
    size: 200,
    accessorFn: row => addDays(new Date(row.startDate), row.days),
    cell: props => <span className="px-3">{formatDate(props.getValue() as Date)}</span>,
  },
]

type AbsenceTableHeaderProps = {
  headerGroups: HeaderGroup<AbsenceIncludingConflict>[]
}

const AbsenceTableHeader: FC<AbsenceTableHeaderProps> = ({ headerGroups }) => <div className="flex rounded-lg">
  {headerGroups.map(headerGroup =>
    <div key={headerGroup.id} className="flex">
      {headerGroup.headers.map(header =>
        <div
          className={`border-b bg-blue-gray-50 p-4 h-12 w-fit ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
          role="button"
          key={header.id}
          style={{ width: header.getSize() }}
          onClick={header.column.getToggleSortingHandler()}
        >
          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
            {flexRender(header.column.columnDef.header, header.getContext())}
            {{ asc: ' 🔼', desc: ' 🔽'}[header.column.getIsSorted() as string] ?? null}
          </Typography>
        </div>
      )}
    </div>
  )}
</div>

type AbsenceTableBodyProps = {
  rows: Row<AbsenceIncludingConflict>[]
  height: string
}

const AbsenceTableBody: FC<AbsenceTableBodyProps> = ({ rows, height }) => {
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 20,
  })

  const virtualItems = virtualizer.getVirtualItems()

  return <div ref={parentRef} className="overflow-auto" style={{ height: height }}>
    <div data-id="table-data" style={{ height: `${virtualizer.getTotalSize()}px` }}>
      {virtualItems.map((virtualRow, index) => {
        const row = rows[virtualRow.index]
        const yOffset = virtualRow.start - index * virtualRow.size
        const isLast = index === virtualItems.length - 1

        return <div
          key={row.id}
          className='flex w-full'
          style={{ height: `${virtualRow.size}px`, transform: `translateY(${yOffset}px)` }}
        >
          {row.getVisibleCells().map(cell =>
            <div
              key={cell.id}
              style={{ width: `${cell.column.getSize()}px` }}
              className={`p-1 border-b flex items-center ${isLast ? 'border-transparent' : 'border-gray-300'}`
            }>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )}
        </div>
      })}
    </div>
  </div>
}

type AbsenceTableControlsProps = {
  table: Table<AbsenceIncludingConflict>,
  entriesPerPage: number,
  totalEntries: number,
  activePage: number,
  setEntriesPerPage: (value: number) => void,
  setActivePage: (value: number) => void,
}

const AbsenceTableControls: FC<AbsenceTableControlsProps> = ({
  table,
  entriesPerPage,
  totalEntries,
  activePage,
  setEntriesPerPage,
  setActivePage,
}) => <div className="flex p-2 justify-end w-full">
  <div className="px-2">
    <Select
      label="Entries per page"
      aria-label="entries per page dropdown"
      value={`${entriesPerPage}`}
      onChange={newValue => setEntriesPerPage(Number(newValue))}
      className="w-52 min-w-52"
    >
      <Option value="10" aria-label="10 entries">10</Option>
      <Option value="50" aria-label="50 entries">50</Option>
      <Option value="100" aria-label="100 entries">100</Option>
      <Option value="500" aria-label="500 entries">500</Option>
      <Option value="1000" aria-label="1000 entries">1000</Option>
    </Select>
  </div>
  <PaginationControls
    totalEntries={totalEntries}
    entriesPerPage={entriesPerPage}
    initialActivePage={activePage}
    onPageChange={newPage => setActivePage(newPage)}
    onClickNext={() => table.nextPage()}
    onClickPrevious={() => table.previousPage()}
  />
</div>

export type AbsenceTableProps = {
  data: AbsenceIncludingConflict[]
  /**
   * Set a static height for the table; this is useful, because not every page will have the specified amount of entries (notably the last page),
   * in which case, more often than not, we don't want the table to suddenly shrink when we reach the last page.
   */
  height?: string
  /**
   * This is useful, either if you want to remember the users state, or also when used in conjunction with `onSetEntriesPerPage`, to track
   * the amount of entries being rendered which can be used for more advanced control of the height of the table,
   */
  initialEntriesPerPage?: number
  /**
   * Useful for tracking the entries per page from outside of the `AbsenceTable` component.
   */
  onSetEntriesPerPage?: (value: number) => void
}

export const AbsenceTable: FC<AbsenceTableProps> = ({ data, height = 'auto', initialEntriesPerPage = 10, onSetEntriesPerPage }) => {
  const [entriesPerPage, setEntriesPerPage] = useState<number>(initialEntriesPerPage)
  const [activePage, setActivePage] = useState(1)

  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: activePage - 1,
    pageSize: entriesPerPage,
  })

  useEffect(() => setPagination({
    pageIndex: activePage - 1,
    pageSize: entriesPerPage,
  }), [entriesPerPage, activePage])

  useEffect(
    () => onSetEntriesPerPage?.(entriesPerPage),
    [onSetEntriesPerPage, entriesPerPage],
  )

  const table = useReactTable({
    data: data,
    columns: columnDefinitions,
    state: { sorting, pagination },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    debugTable: !isProduction,
  })

  const { rows } = table.getRowModel()

  return <div className="flex flex-col gap-2 items-center w-fit h-full">
    <Card className="flex flex-col bg-gray-200 h-full">
      <div className="flex flex-col px-2 pt-2 h-full">
        <AbsenceTableHeader headerGroups={table.getHeaderGroups()} />
        <AbsenceTableBody rows={rows} height={height} />
      </div>
    </Card>
    <AbsenceTableControls
      table={table}
      entriesPerPage={entriesPerPage}
      totalEntries={data.length}
      activePage={activePage}
      setEntriesPerPage={setEntriesPerPage}
      setActivePage={setActivePage}
    />
  </div>
}
