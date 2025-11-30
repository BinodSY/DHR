"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Users, Activity, AlertTriangle, User, Settings, Menu, X, Bell, Download, FileText } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export default function GovtDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // --- Configuration ---
  const menuItems = [
    {
      id: "population-overview",
      label: "Population Overview",
      icon: Users,
      path: "/dashboard/govt",
      badge: { text: "Active", color: "bg-green-600 text-white" },
    },
    {
      id: "disease-surveillance",
      label: "Disease Surveillance",
      icon: Activity,
      path: "/dashboard/govt/disease-surveillance",
      badge: { text: "12", color: "bg-red-500 text-white text-xs" },
    },
    {
      id: "high-risk-camps",
      label: "High-Risk Camps",
      icon: AlertTriangle,
      path: "/dashboard/govt/high-risk-camps",
      badge: { text: "8", color: "bg-yellow-500 text-white text-xs" },
    },
    {
      id: "health-records",
      label: "Health Records",
      icon: User,
      path: "/dashboard/govt/health-records",
    },
    {
      id: "emergency-response",
      label: "Emergency Response",
      icon: AlertTriangle,
      path: "/dashboard/govt/emergency-response",
      badge: { text: "LIVE", color: "bg-red-600 text-white text-xs" },
    },
  ]

  const pageConfigs = {
    "/dashboard/govt": {
      title: "Migrant Population Overview",
      subtitle: "Real-time health monitoring across Kerala migrant camps",
      actions: [{ label: "Export Report", variant: "default" as const, icon: Download }],
    },
    "/dashboard/govt/disease-surveillance": {
      title: "Disease Surveillance Dashboard",
      subtitle: "Real-time monitoring and analysis of disease patterns",
      actions: [{ label: "Export Report", variant: "default" as const, icon: Download }],
    },
    "/dashboard/govt/high-risk-camps": {
      title: "High-Risk Camp Monitoring",
      subtitle: "Monitor migrant camps with active health risks.",
      actions: [
        { label: "Export Data", variant: "default" as const, icon: Download },
        { label: "Generate Report", variant: "default" as const, icon: FileText },
      ],
    },
    "/dashboard/govt/health-records": {
      title: "Migrant Health Registry",
      subtitle: "Anonymous Health Records Management",
      actions: [
        { label: "Export Records", variant: "default" as const, icon: Download },
        { label: "Generate Report", variant: "default" as const, icon: FileText },
      ],
    },
    "/dashboard/govt/emergency-response": {
      title: "Emergency Response",
      subtitle: "Real-time outbreak alerts and action tracking",
      actions: [
        { label: "PDF", variant: "outline" as const, icon: FileText },
        { label: "Excel", variant: "outline" as const, icon: Download },
      ],
    },
  }

  const currentPageConfig = pageConfigs[pathname as keyof typeof pageConfigs] || pageConfigs["/dashboard/govt"]

  const isActive = (path: string) => {
    if (path === "/dashboard/govt") return pathname === "/dashboard/govt"
    return pathname?.startsWith(path)
  }

  return (
    // ROOT CONTAINER: Forces the app to be exactly the height of the screen
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      
      {/* ----------------- MOBILE DRAWER (Overlay) ----------------- */}
      {/* Backdrop */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Slide-out Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold">K</div>
            <span className="font-semibold text-gray-900">Kerala Health</span>
          </div>
          <button onClick={() => setDrawerOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                router.push(item.path)
                setDrawerOpen(false) // Close drawer on click
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path) ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
              {item.badge && <Badge className={`ml-auto ${item.badge.color}`}>{item.badge.text}</Badge>}
            </button>
          ))}
        </nav>
      </div>


      {/* ----------------- DESKTOP SIDEBAR (Static) ----------------- */}
      {/* Hidden on mobile, Flex item on desktop (Pushing content to the right) */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
            K
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 leading-none">Kerala Health</div>
            <div className="text-xs text-gray-500 mt-1">Migrant Monitor</div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 pb-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          />
        </div>

        {/* Navigation - Scrollable inside sidebar if needed */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item.path) 
                  ? "bg-green-50 text-green-700 shadow-sm ring-1 ring-green-100" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && <Badge className={`${item.badge.color} text-[10px] h-5 px-1.5`}>{item.badge.text}</Badge>}
            </button>
          ))}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Dr. Rajesh Kumar</p>
              <p className="text-xs text-gray-500 truncate">Health Officer</p>
            </div>
            <Settings className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>
        </div>
      </aside>


      {/* ----------------- MAIN CONTENT AREA ----------------- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Mobile Header (Visible only on Mobile) */}
        <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setDrawerOpen(true)} className="p-2 -ml-2 hover:bg-gray-100 rounded-md">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <span className="font-semibold text-gray-900">Govt Dashboard</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        {/* Desktop Header (Sticky at top of content area) */}
        <header className="hidden md:flex h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{currentPageConfig.title}</h1>
            <p className="text-xs text-gray-500">{currentPageConfig.subtitle}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-700">System Live</span>
            </div>

            <div className="h-6 w-px bg-gray-200 mx-1"></div>

            {currentPageConfig.actions.map((action, index) => (
              <button
                key={index}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  action.variant === 'outline' 
                    ? 'border border-gray-200 text-gray-700 hover:bg-gray-50' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                }`}
              >
                <action.icon className="h-3.5 w-3.5" />
                {action.label}
              </button>
            ))}
          </div>
        </header>

        {/* Scrollable Page Content */}
        {/* flex-1 makes it take remaining height, overflow-y-auto enables scrolling ONLY here */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

    </div>
  )
}