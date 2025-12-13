"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { EditStatusPageForm } from "@/modules/status-pages/components/edit-status-page-form";
import { api } from "@/trpc/react";
import { notFound } from "next/navigation";

export default function EditStatusPageView({ id }: { id: string }) {
    const [statusPage] = api.statusPage.getById.useSuspenseQuery({ id });
    const [monitors] = api.monitor.getMonitorsList.useSuspenseQuery();

    if (!statusPage) {
        notFound();
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
                                <BreadcrumbLink href="/dashboard/status-pages">
                                    Status Pages
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className=" p-6 pt-2 ">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold">Edit Status Page</h1>
                    <p className="text-muted-foreground">
                        Update your status page settings.
                    </p>
                </div>
                <EditStatusPageForm monitors={monitors} statusPage={statusPage} />
            </div>
        </>
    );
}
