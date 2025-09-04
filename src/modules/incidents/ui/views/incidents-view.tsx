"use client"
import { api } from '@/trpc/react'
import React from 'react'
import { DataTable } from '../components/data-table'
import { columns } from '../components/colums'
import DataPagination from '@/modules/monitors/ui/components/data-pagination'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { useIncidentsFilter } from '../../hooks/use-incident-filter'

const IncidentsView = () => {
    const [filters, setFilters] = useIncidentsFilter()
    const [data] = api.incident.getAll.useSuspenseQuery({
        ...filters
    })
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
                                <BreadcrumbLink href="/dashboard/incidents">
                                    Incidents
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex  flex-1 flex-col gap-4 p-4 pt-0">

                <DataTable columns={columns} data={data.incidents} />
                <DataPagination
                    page={filters.page}
                    totalPages={data.totalPages}
                    onPageChange={(page) => setFilters({ ...filters, page })}
                />
            </div>
        </>
    )
}

export default IncidentsView
