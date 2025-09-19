"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import type { Monitor } from "../../schema"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import { useMonitorsFilter } from "../../hooks/use-monitor-filter"

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends unknown> {
    openDeleteDialog?: (monitor: Monitor) => void
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const archiveMonitor = api.monitor.deleteMonitor.useMutation()
  const [filters, setFilters] = useMonitorsFilter()
  const utils = api.useUtils()
  const [deleteMonitor, setDeleteMonitor] = useState<Monitor | null>(null)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting
    },
    meta: {
      openDeleteDialog: (monitor: Monitor) => setDeleteMonitor(monitor)
    }
  })
  const handleDelete = async () => {
    if (!deleteMonitor) return
    try {
      await archiveMonitor.mutateAsync({ id: deleteMonitor.id })
      utils.monitor.getAll.invalidate(filters)
      toast.success("Monitor deleted successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete monitor")
    } finally {
      setDeleteMonitor(null)
    }
  }


  return (
    <div>
      <div className="flex items-center gap-4 justify-between py-4">
        <Input
          placeholder="Search By Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={() => router.push("/dashboard/monitors/create")}>
          Create Monitor
        </Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <AlertDialog open={!!deleteMonitor} onOpenChange={() => setDeleteMonitor(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete {deleteMonitor?.name}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this monitor? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <Button variant={"destructive"} disabled={archiveMonitor.isPending} onClick={handleDelete}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Table>
      </div>

    </div>
  )
}