"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const DeleteMonitorDialog = ({ open, setOpen, id }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, id: string }) => {
    const deleteMonitor = api.monitor.deleteMonitor.useMutation()
    const router = useRouter()
    const handleDelete = async () => {
        try {
            await deleteMonitor.mutateAsync({ id })
            router.push("/dashboard/monitors")
            toast.success("Monitor deleted successfully")
        } catch (error: any) {
            toast.error(error.message || "Failed to delete monitor")
        } finally {
            setOpen(false)
        }

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Monitor</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this monitor?</DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end gap-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={deleteMonitor.isPending}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteMonitorDialog
