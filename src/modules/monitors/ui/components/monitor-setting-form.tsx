"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import type { Monitor, MonitorData } from '../../schema'
import { api } from '@/trpc/react'
import { toast } from 'sonner'
import DeleteMonitorDialog from './delete-monitor-dialog'
const formSchema = z.object({
    name: z.string(),
    url: z.url(),
    frequency: z.enum(['5', '10', '15']),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]),
    expectedStatus: z.number(),
    body: z.string(),
    headers: z.array(
        z.object({
            key: z.string().optional(),
            value: z.string().optional(),
        })
    )
})


const MonitorSettingForm = ({ monitor }: { monitor: MonitorData }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
    const updateMonitor = api.monitor.updateMonitor.useMutation()
    const utils = api.useUtils()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: monitor?.name ?? "",
            url: monitor?.url ?? "",
            method: monitor?.method ?? "GET",
            expectedStatus: monitor?.expectedStatus ?? 200,
            frequency: String(monitor?.frequencyMinutes ?? 5) as "5" | "10" | "15",
            body: JSON.stringify(monitor?.body) ?? "{}",
            headers: monitor?.headers as []
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "headers"
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await updateMonitor.mutateAsync({
                id: monitor.id,
                ...values
            })
            utils.monitor.getMonitorById.setData({ id: monitor.id }, (oldData) => {
                if (!oldData) return oldData
                return {
                    ...oldData,
                    monitor: {
                        ...oldData.monitor!,
                        ...values
                    }
                }
            })

            toast.success("Monitor updated successfully")
        } catch (error: any) {
            toast.error(error.message || "Failed to update monitor")
        }

    }
    return (
        <div className="flex  flex-1 overflow-y-scroll flex-col gap-4 py-6 pt-0">
            <DeleteMonitorDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} id={monitor.id} />
            {/* <h1 className='text-2xl font-semibold'>Create Monitor</h1> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='  space-y-4'>
                    <div className='grid grid-cols-2 items-start w-[50%] gap-2'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='Enter monitor name'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='url'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Url
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='https://example.com'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>
                                        Frequency
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <div className='flex gap-2'>
                                                {
                                                    ['5', '10', '15'].map((value) => {
                                                        return (
                                                            <label
                                                                key={value}
                                                                htmlFor={value}
                                                                className={cn(
                                                                    "cursor-pointer px-8 rounded-md py-1 text-sm border hover:bg-secondary",
                                                                    field.value === value && "bg-secondary text-secondary-foreground"
                                                                )}
                                                            >
                                                                <RadioGroupItem
                                                                    value={value}
                                                                    id={value}
                                                                    className='hidden'
                                                                />
                                                                {value} Min
                                                            </label>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="method"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>
                                        Method
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <div className='flex gap-2'>
                                                {
                                                    ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"].map((value) => {
                                                        return (
                                                            <label
                                                                key={value}
                                                                htmlFor={value}
                                                                className={cn(
                                                                    "cursor-pointer px-8 rounded-md py-1 text-sm border hover:bg-secondary",
                                                                    field.value === value && "bg-secondary text-secondary-foreground"
                                                                )}
                                                            >
                                                                <RadioGroupItem
                                                                    value={value}
                                                                    id={value}
                                                                    className='hidden'
                                                                />
                                                                {value}
                                                            </label>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </RadioGroup>
                                    </FormControl>

                                </FormItem>
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name='expectedStatus'
                        render={({ field }) => (
                            <FormItem className=' w-[50%]'>
                                <FormLabel>
                                    Expected status
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='number'
                                        onChange={(e) => {
                                            field.onChange(Number(e.target.value))
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='body'
                        render={({ field }) => (
                            <FormItem className=' w-[50%]'>
                                <FormLabel>
                                    Body
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='Enter body'
                                        className=' resize-none h-auto'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2 w-[50%]">
                        <h3 className="text-sm font-medium text-white">Request Headers</h3>
                        {fields.map((field, index) => (
                            <div className="flex gap-2" key={field.id}>
                                <FormField
                                    control={form.control}
                                    name={`headers.${index}.key`}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Key"
                                            className="w-1/2"
                                        />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`headers.${index}.value`}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Value"
                                            className="w-1/2 bg-zinc-900 text-white"
                                        />
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-400 text-sm px-2"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => append({ key: "", value: "" })}
                            className="border text-muted-foreground hover:bg-zinc-800 mt-2"
                        >
                            Add new header
                        </Button>
                    </div>
                    <div className='flex justify-start gap-4 mt-10'>
                        <Button type='submit' disabled={updateMonitor.isPending}>
                            Save Changes
                        </Button>
                        <Button variant={"destructive"} type='button' onClick={() => setDeleteDialogOpen(true)}>
                            <Trash2 />
                            Delete Monitor
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default MonitorSettingForm
