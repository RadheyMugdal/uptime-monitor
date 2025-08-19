"use client"

import { cn } from "@/lib/utils"
import type { Incident } from "@/modules/monitors/schema"
import type { ColumnDef } from "@tanstack/react-table"
import { format, formatDuration, intervalToDuration } from "date-fns"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Incident>[] = [
    {
        accessorKey: "Error",
        header: "Error",
        cell: ({ row }) => {
            return (
                <div className=" text-red-500">
                    {row.original.errorMessage}
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Started at",
        cell: ({ row }) => {
            const date = row.original.createdAt
            return (
                <div>
                    {format(date, "dd MMM HH:mm")}
                </div>
            )
        }
    },
    {
        accessorKey: "endAt",
        header: "Ended at",
        cell: ({ row }) => {
            const date = row.original.endAt
            return (
                <div>
                    {
                        date ? format(date, "dd MMM HH:mm") : "Ongoing"
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "durationMs",
        header: "Downtime",
        cell: ({ row }) => {
            const start = row.original.createdAt
            const end = row.original.endAt ?? new Date()

            const duration = formatDuration(
                intervalToDuration({ start, end }),
                { format: ["hours", "minutes", "seconds"] }
            )

            return (
                <div>
                    {duration || "0s"}
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Resolved",
        cell: ({ row }) => {
            return (
                <div >
                    {row.original.status === 'up' ? "✅" : "❌"}
                </div>
            )
        }
    },



]