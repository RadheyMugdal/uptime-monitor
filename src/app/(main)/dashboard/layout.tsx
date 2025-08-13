import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const data = await auth.api.getSession({
    headers: await headers()
  })
  if (!data?.session) {
    redirect("/signin")
  }
  return (
    <SidebarProvider>
      <AppSidebar user={data.user} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
