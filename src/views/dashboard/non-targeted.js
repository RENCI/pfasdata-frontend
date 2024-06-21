import { useCallback, useMemo, useState } from 'react'
import {
  CircularProgress,
  Stack,
  Typography,
} from '@mui/joy'
import { Toolbar } from '@components/layout'
import { useData } from '@context'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { nonTargetedColumns } from '@data'
import {
  ColumnSelect,
  DataTable,
  Pagination,
} from '@components/table'
import { TableCsvExportButton } from '@components/buttons'

const relevantFilterKeys = [
  'sample_id', 'study', 'pi', 'units', 'medium',
  'city', 'state', 'zipcode',
]

export const NonTargetedView = () => {
  const { ntarData, podmTable } = useData()

  const relevantFilters = useMemo(() => podmTable
      .columnFilters
      .filter(f => relevantFilterKeys.includes(f.id)),
    [podmTable.columnFilters.length]
  )
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data: ntarData.data,
    columns: nonTargetedColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      columnFilters: relevantFilters,
      pagination,
      sorting,
    },
  })

  const RowsCount = () => (
    <Typography level="body-md" sx={{ whiteSpace: 'nowrap' }}>
      { table.getPrePaginationRowModel().rows.length } rows
    </Typography>
  )

  const TableToolbar = useCallback(() => (
    <Toolbar>
      <RowsCount />
      <Pagination table={ table } />
      <ColumnSelect table={ table } />
      <TableCsvExportButton table={ table } />
    </Toolbar>
  ))

  if (ntarData.isPending || ntarData.isLoading) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 'calc(100px + 5rem)' }}
      >
        <CircularProgress size="lg" />
      </Stack>
    )
  }

  return (
    <Stack>
      <TableToolbar />
      
      <DataTable
        table={ table }
        sx={{ '.filter': { display: 'none' } }}
      />

      <TableToolbar />
    </Stack>
  )
}
