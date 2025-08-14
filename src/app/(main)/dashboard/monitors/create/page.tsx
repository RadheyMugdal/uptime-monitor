"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { api } from '@/trpc/react'

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

const CreateMonitorPage = () => {
  const router = useRouter()
  const createMonitor = api.monitor.create.useMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: "GET",
      expectedStatus: 200,
      frequency: '5',
      body: JSON.stringify({}, null, 2)

    }
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "headers"
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const monitorValue = {
      name: values.name,
      url: values.url,
      frequencyMinutes: parseInt(values.frequency),
      method: values.method,
      expectedStatus: values.expectedStatus,
      body: values.body,
      headers: JSON.stringify(values.headers)
    }
    await createMonitor.mutateAsync(monitorValue)
    if (createMonitor.isError) {
      toast.error(createMonitor.error.message)
      return
    }
    toast.success("Monitor created successfully")
    router.push("/dashboard/monitors")
  }


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
                <BreadcrumbLink href="/dashboard/monitors">
                  Monitor
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/monitors/create">
                  Create Monitor
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex  flex-1 overflow-y-scroll flex-col gap-4 p-4 pt-0">
        <h1 className='text-2xl font-semibold'>Create Monitor</h1>
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
            <div className='flex justify-start mt-10'>
              <Button type='submit'>
                Start Monitoring
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default CreateMonitorPage
