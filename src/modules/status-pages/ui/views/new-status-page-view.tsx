"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreateStatusPageForm } from "@/modules/status-pages/components/create-status-page-form";
import { api } from "@/trpc/react";

export default function NewStatusPageView() {
    const [monitors] = api.monitor.getMonitorsList.useSuspenseQuery();

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
                                <BreadcrumbLink href="/dashboard/status-pages">
                                    Status Pages
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/dashboard/status-pages/new">
                                    Create
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex  flex-1 overflow-y-scroll flex-col gap-4 p-6 pt-2 ">
                <div>
                    <h1 className="text-2xl font-semibold ">Create Status Page</h1>
                    <p className="text-muted-foreground">
                        Set up a new public status page to showcase your monitors.
                    </p>
                </div>
                <CreateStatusPageForm monitors={monitors} />
            </div>
        </>
    );
}
