"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, SquareArrowOutUpRight, Trash2 } from "lucide-react"
import type { Monitor } from "../../schema"
import { cn } from "@/lib/utils"
import Link from "next/link"


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
        <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isUp = row.getValue("status") === "up"

      return <div className="flex items-center ">
        <div className={
          cn(
            " text-white rounded-2xl text-sm h-full px-3  ",
            isUp ? "bg-green-400" : "bg-red-500"
          )
        }>
          {isUp ? "Online" : "Offline"}
        </div>
      </div>
    },

  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <SquareArrowOutUpRight />
              Open monitor
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              Delete monitor</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]