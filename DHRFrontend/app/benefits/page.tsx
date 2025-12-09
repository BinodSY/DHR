"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DynamicHeader } from "@/components/dynamic-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, ArrowRight } from "lucide-react"

export default function BenefitsRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect to worker benefits after a short delay
    const timer = setTimeout(() => {
      router.push("/dashboard/worker/benefits")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <DynamicHeader>
          <Button variant="outline" size="sm" onClick={() => router.push("/")} className="bg-transparent">
            Home
          </Button>
        </DynamicHeader>

        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-emerald-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Government Health Scheme Finder
              </h1>
              
              <p className="text-gray-600 mb-6">
                Redirecting you to the worker benefits section...
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/dashboard/worker/benefits")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Go to Benefits Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <p className="text-xs text-gray-500">
                  You'll be automatically redirected in 3 seconds...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}