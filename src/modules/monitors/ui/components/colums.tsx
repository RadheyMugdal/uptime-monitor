"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, SquareArrowOutUpRight, Trash2 } from "lucide-react"
import type { Monitor } from "../../schema"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"


export const columns: ColumnDef<Monitor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/monitors/${row.original.id}`} className=" hover:underline">
          <div className="flex gap-1 flex-col ">
            <p className="text-sm font-semibold">{row.getValue("name")}</p>
            <span className="text-xs   truncate">{row.original.url}</span>
          </div>
        </Link>
      )
    }
  },
  {
    accessorKey: "frequencyMinutes",
    header: "Frequency",
    cell: ({ row }) => {
      return (<span className="text-sm font-semibold">{row.getValue("frequencyMinutes")} Min</span>)

    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const statusMap: Record<
        string,
        { label: string; className: string }
      > = {
        up: { label: "Online", className: "bg-green-500" },
        down: { label: "Offline", className: "bg-red-500" },
        pending: { label: "Checking…", className: "bg-yellow-400" },
        paused: { label: "Paused", className: "bg-gray-400" },
      }

      const { label, className } = statusMap[status] || {
        label: "Unknown",
        className: "bg-muted text-foreground",
      }

      return (
        <div className="flex items-center">
          <span
            className={cn(
              "text-white rounded-2xl text-sm px-3 py-0.5 font-medium",
              className
            )}
          >
            {label}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const monitor = row.original
      const openDeleteDialog = table.options.meta?.openDeleteDialog
      const router = useRouter()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/monitors/${monitor.id}`)}
            >
              <SquareArrowOutUpRight />
              Open monitor
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={(e) => {
              e.preventDefault()
              openDeleteDialog?.(monitor)
            }}>
              <Trash2 />
              Delete monitor
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]