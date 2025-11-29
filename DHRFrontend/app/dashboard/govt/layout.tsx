"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Users, Activity, AlertTriangle, User, MapPin, TrendingUp, Settings } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export default function GovtDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

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
      badgeLabel: "Alerts",
    },
    {
      id: "high-risk-camps",
      label: "High-Risk Camps",
      icon: AlertTriangle,
      path: "/dashboard/govt/high-risk-camps",
      badge: { text: "8", color: "bg-yellow-500 text-white text-xs" },
      badgeLabel: "Flagged",
    },
    {
      id: "health-records",
      label: "Health Records",
      icon: User,
      path: "/dashboard/govt/health-records",
    },
    {
      id: "resource-planning",
      label: "Resource Planning",
      icon: MapPin,
      path: "/dashboard/govt/resource-planning",
    },
    {
      id: "emergency-response",
      label: "Emergency Response",
      icon: AlertTriangle,
      path: "/dashboard/govt/emergency-response",
      badge: { text: "LIVE", color: "bg-red-600 text-white text-xs" },
    },
    {
      id: "advanced-analytics",
      label: "Advanced Analytics",
      icon: TrendingUp,
      path: "/dashboard/govt/advanced-analytics",
    },
  ]

  const isActive = (path: string) => {
    if (path === "/dashboard/govt") {
      return pathname === "/dashboard/govt"
    }
    return pathname.startsWith(path)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Left Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            KHM
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Kerala Health</h1>
            <h2 className="text-lg font-semibold text-gray-900">Monitor</h2>
            <p className="text-sm text-gray-600">Migrant Health Dashboard</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute right-2 top-2 text-xs text-gray-400">⌘ K</div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <div
                key={item.id}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  active ? "bg-green-100 text-green-800" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => router.push(item.path)}
              >
                <Icon className="h-4 w-4" />
                <span className={`text-sm ${active ? "font-medium" : ""}`}>{item.label}</span>
                {item.badge && <Badge className={`ml-auto ${item.badge.color}`}>{item.badge.text}</Badge>}
                {item.badgeLabel && (
                  <span
                    className={`text-xs ml-1 ${
                      item.id === "disease-surveillance"
                        ? "text-red-600"
                        : item.id === "high-risk-camps"
                          ? "text-yellow-600"
                          : ""
                    }`}
                  >
                    {item.badgeLabel}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Profile */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Dr. Rajesh Kumar</p>
              <p className="text-xs text-gray-600">Health Officer</p>
            </div>
            <Settings className="h-4 w-4 text-gray-400 ml-auto cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
