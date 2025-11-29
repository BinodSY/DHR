"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Download, FileText, Clock, Users, Truck, Heart, Package, Filter, X } from "lucide-react"
import { useState } from "react"

export default function EmergencyResponsePage() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)

  const outbreakAlerts = [
    {
      id: 1,
      disease: "Dengue",
      location: "Kochi Camp Alpha",
      date: "Sept 21, 2024",
      status: "Pending",
      cases: 12,
      severity: "high",
    },
    {
      id: 2,
      disease: "TB",
      location: "Thrissur Camp Beta",
      date: "Sept 20, 2024",
      status: "Action Taken",
      cases: 3,
      severity: "medium",
    },
    {
      id: 3,
      disease: "Malaria",
      location: "Kozhikode Camp Gamma",
      date: "Sept 19, 2024",
      status: "Pending",
      cases: 8,
      severity: "high",
    },
    {
      id: 4,
      disease: "Flu",
      location: "Palakkad Camp Delta",
      date: "Sept 18, 2024",
      status: "Action Taken",
      cases: 15,
      severity: "low",
    },
  ]

  const actionLog = [
    {
      id: 1,
      action: "ASHA worker sent to Perumbavoor Camp",
      date: "Sept 21, 10:30 AM",
      status: "In Progress",
    },
    {
      id: 2,
      action: "Mobile Clinic Deployed to Kochi Alpha",
      date: "Sept 21, 02:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      action: "Emergency Medicine Kit Dispatched",
      date: "Sept 20, 04:15 PM",
      status: "Completed",
    },
    {
      id: 4,
      action: "Rapid Response Team Activated",
      date: "Sept 20, 11:45 AM",
      status: "In Progress",
    },
    {
      id: 5,
      action: "Contact Tracing Initiated",
      date: "Sept 19, 09:20 AM",
      status: "Completed",
    },
  ]

  const hotspots = [
    { id: 1, name: "Kochi Camp Alpha", cases: 12, workers: 3, risk: "high", x: 45, y: 60 },
    { id: 2, name: "Thrissur Camp Beta", cases: 3, workers: 2, risk: "medium", x: 35, y: 45 },
    { id: 3, name: "Kozhikode Camp Gamma", cases: 8, workers: 4, risk: "high", x: 25, y: 25 },
    { id: 4, name: "Palakkad Camp Delta", cases: 15, workers: 2, risk: "low", x: 40, y: 50 },
  ]

  const emergencyResources = [
    { name: "Ambulances", available: 12, total: 15, status: "good" },
    { name: "Doctors on Call", available: 8, total: 10, status: "good" },
    { name: "Rapid Response Teams", available: 3, total: 5, status: "medium" },
    { name: "Emergency Kits", available: 45, total: 100, status: "low" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Emergency Response
            </h1>
            <p className="text-gray-600 mt-1">Real-time outbreak alerts, hotspot monitoring, and action tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="today">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              PDF
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Critical Alerts Panel */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4 rounded-r-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="text-red-800 font-medium">
              ⚠ 12 new Dengue cases in Kochi camps – immediate response required
            </span>
          </div>
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Outbreak Alerts Panel - Left */}
          <div className="col-span-3">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Outbreak Alerts</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    TB
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Dengue
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Malaria
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Flu
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {outbreakAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        className={`text-xs ${
                          alert.severity === "high"
                            ? "bg-red-100 text-red-800"
                            : alert.severity === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {alert.disease}
                      </Badge>
                      <Badge variant={alert.status === "Pending" ? "destructive" : "default"} className="text-xs">
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm text-gray-900">{alert.location}</p>
                    <p className="text-xs text-gray-600">
                      {alert.cases} cases • {alert.date}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Hotspot Map - Center */}
          <div className="col-span-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Kerala Hotspot Map</CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Safe</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>At Risk</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Outbreak Zone</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-blue-50 rounded-lg h-96 overflow-hidden">
                  {/* Kerala Map Outline */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M20 20 L80 20 L85 30 L80 40 L75 50 L70 60 L65 70 L60 75 L50 80 L40 82 L30 80 L25 75 L20 70 L18 60 L15 50 L18 40 L20 30 Z"
                      fill="#e0f2fe"
                      stroke="#0369a1"
                      strokeWidth="0.5"
                    />
                  </svg>

                  {/* Hotspot Markers */}
                  {hotspots.map((hotspot) => (
                    <div
                      key={hotspot.id}
                      className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 ${
                        hotspot.risk === "high"
                          ? "bg-red-500"
                          : hotspot.risk === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      } hover:scale-125 transition-transform`}
                      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                      onClick={() => setSelectedHotspot(hotspot.id.toString())}
                    />
                  ))}

                  {/* Hotspot Popup */}
                  {selectedHotspot && (
                    <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs">
                      {(() => {
                        const hotspot = hotspots.find((h) => h.id.toString() === selectedHotspot)
                        return hotspot ? (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{hotspot.name}</h4>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedHotspot(null)}>
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-600">Cases: {hotspot.cases}</p>
                            <p className="text-sm text-gray-600">Workers: {hotspot.workers}</p>
                            <Badge
                              className={`mt-2 text-xs ${
                                hotspot.risk === "high"
                                  ? "bg-red-100 text-red-800"
                                  : hotspot.risk === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {hotspot.risk.toUpperCase()} RISK
                            </Badge>
                          </div>
                        ) : null
                      })()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Log Timeline - Right */}
          <div className="col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Action Log Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {actionLog.map((action, index) => (
                  <div key={action.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          action.status === "Completed"
                            ? "bg-green-500"
                            : action.status === "In Progress"
                              ? "bg-blue-500"
                              : "bg-gray-400"
                        }`}
                      />
                      {index < actionLog.length - 1 && <div className="w-px h-8 bg-gray-200 mt-2" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{action.action}</p>
                      <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {action.date}
                      </p>
                      <Badge
                        variant={
                          action.status === "Completed"
                            ? "default"
                            : action.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs mt-1"
                      >
                        {action.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Resources Panel - Bottom */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emergency Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6">
                {emergencyResources.map((resource, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                        resource.status === "good"
                          ? "bg-green-100"
                          : resource.status === "medium"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                      }`}
                    >
                      {index === 0 && (
                        <Truck
                          className={`h-8 w-8 ${
                            resource.status === "good"
                              ? "text-green-600"
                              : resource.status === "medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        />
                      )}
                      {index === 1 && (
                        <Heart
                          className={`h-8 w-8 ${
                            resource.status === "good"
                              ? "text-green-600"
                              : resource.status === "medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        />
                      )}
                      {index === 2 && (
                        <Users
                          className={`h-8 w-8 ${
                            resource.status === "good"
                              ? "text-green-600"
                              : resource.status === "medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        />
                      )}
                      {index === 3 && (
                        <Package
                          className={`h-8 w-8 ${
                            resource.status === "good"
                              ? "text-green-600"
                              : resource.status === "medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        />
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{resource.name}</h4>
                    <p className="text-2xl font-bold text-gray-900">{resource.available}</p>
                    <p className="text-sm text-gray-600">of {resource.total} available</p>
                    {resource.status === "low" && (
                      <Badge variant="destructive" className="text-xs mt-2">
                        Low Stock Alert
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
