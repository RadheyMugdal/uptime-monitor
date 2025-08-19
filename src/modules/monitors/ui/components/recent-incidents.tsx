import React from 'react'
import { DataTable } from './incident/data-table'
import { columns } from './incident/columns'
import { useParams } from 'next/navigation'
import { api } from '@/trpc/react'

const RecentIncident = () => {
    const id = useParams().id
    const [lastFiveIncidents] = api.monitor.getLastFiveIncidents.useSuspenseQuery({ id: id as string })
    return (
        <div className=' mt-6 space-y-4'>
            <h4 className='text-lg font-semibold'>Last 5 incidents</h4>
            <DataTable columns={columns} data={lastFiveIncidents.incidents as any} />
        </div>
    )
}

export default RecentIncident
