"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { columns } from "@/modules/monitors/ui/components/colums"
import { DataTable } from "@/modules/monitors/ui/components/data-table"
import { useMonitorsFilter } from "../../hooks/use-monitor-filter";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import DataPagination from "../components/data-pagination";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import MonitorsStatusCard from "../components/monitors-status-card";

const chartData = [
    {
        status: "up",
        monitors: 10,
        fill: "green"
    },
    {
        status: "down",
        monitors: 1,
        fill: "red"
    }
]



const MonitorsView = () => {
    const [filters, setFilters] = useMonitorsFilter()

    const [data] = api.monitor.getAll.useSuspenseQuery(filters)

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Monitors
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex  flex-1 flex-col gap-4 p-4 pt-0">
                {
                    data.items.length > 0 &&
                    <MonitorsStatusCard />
                }
                <DataTable columns={columns} data={data.items} />
                <DataPagination
                    page={filters.page}
                    totalPages={data.totalPages}
                    onPageChange={(page) => setFilters({ ...filters, page })}
                />
            </div>
        </>
    )
}

export default MonitorsView
