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

  if (!data?.session) {
    redirect("/signin")
  }

  const plan = await auth.api.state({
    headers: await headers()
  })

  let currentPlanName: "pro" | "business" | "free" = "free"

  const activeSub = plan.activeSubscriptions?.[0]
  if (activeSub?.productId) {
    const subscription = await polarClient.products.get({ id: activeSub.productId })
    currentPlanName = (subscription?.name.toLowerCase() as "pro" | "business") || "free"
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