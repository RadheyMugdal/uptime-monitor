import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { polarClient } from '@/lib/polar';

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const data = await auth.api.getSession({
    headers: await headers()
  })
  const plan = await auth.api.state({
    headers: await headers()
  })
  const subscription = await polarClient.products.get({ id: plan.activeSubscriptions[0]?.productId as string })
  const currentPlanName = subscription?.name.toLowerCase() as "pro" | "business" || "free"
  if (!data?.session) {
    redirect("/signin")
  }
  return (
    <SidebarProvider>
      <AppSidebar user={data.user} plan={currentPlanName} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
