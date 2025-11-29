"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Users,
  Heart,
  Flag,
  Activity,
  Download,
  Settings,
  TrendingUp,
  AlertTriangle,
  MapPin,
  User,
  ArrowLeft,
  Search,
  Grid3X3,
  List,
  Filter,
  UserPlus,
  Calendar,
  FileText,
  Syringe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function HealthRecordsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  const handleNavigation = (path: string) => {
    try {
      router.push(path)
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  const patientRecords = [
    {
      id: "MW-001",
      age: 34,
      location: "Bihar",
      status: "Healthy",
      statusColor: "bg-green-100 text-green-800",
      diseases: "No active diseases",
      medication: "No prescriptions",
      vaccination: 100,
      vaccinationColor: "bg-green-500",
    },
    {
      id: "MW-002",
      age: 28,
      location: "Uttar Pradesh",
      status: "Treatment",
      statusColor: "bg-orange-100 text-orange-800",
      diseases: "Tuberculosis",
      medication: "Rifampin 600mg",
      vaccination: 75,
      vaccinationColor: "bg-orange-500",
    },
    {
      id: "MW-003",
      age: 45,
      location: "West Bengal",
      status: "High Risk",
      statusColor: "bg-red-100 text-red-800",
      diseases: "Dengue + Malaria",
      medication: "Paracetamol 500mg",
      vaccination: 45,
      vaccinationColor: "bg-red-500",
    },
    {
      id: "MW-004",
      age: 31,
      location: "Rajasthan",
      status: "Healthy",
      statusColor: "bg-green-100 text-green-800",
      diseases: "No active diseases",
      medication: "Vitamin D3 1000IU",
      vaccination: 100,
      vaccinationColor: "bg-green-500",
    },
    {
      id: "MW-005",
      age: 39,
      location: "Odisha",
      status: "Treatment",
      statusColor: "bg-orange-100 text-orange-800",
      diseases: "Respiratory Infection",
      medication: "Azithromycin 250mg",
      vaccination: 85,
      vaccinationColor: "bg-orange-500",
    },
    {
      id: "MW-006",
      age: 26,
      location: "Jharkhand",
      status: "Healthy",
      statusColor: "bg-green-100 text-green-800",
      diseases: "No active diseases",
      medication: "No prescriptions",
      vaccination: 100,
      vaccinationColor: "bg-green-500",
    },
    {
      id: "MW-007",
      age: 52,
      location: "Chhattisgarh",
      status: "High Risk",
      statusColor: "bg-red-100 text-red-800",
      diseases: "TB + COVID-19",
      medication: "Isoniazid 300mg",
      vaccination: 30,
      vaccinationColor: "bg-red-500",
    },
    {
      id: "MW-008",
      age: 37,
      location: "Madhya Pradesh",
      status: "Treatment",
      statusColor: "bg-orange-100 text-orange-800",
      diseases: "Malaria",
      medication: "Artemether 80mg",
      vaccination: 65,
      vaccinationColor: "bg-orange-500",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Health Records...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar Navigation */}
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
          <div
            className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
            onClick={() => handleNavigation("/dashboard/govt")}
          >
            <Users className="h-4 w-4" />
            <span className="text-sm">Population Overview</span>
          </div>

          <div
            className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
            onClick={() => handleNavigation("/dashboard/govt/disease-surveillance")}
          >
            <Activity className="h-4 w-4" />
            <span className="text-sm">Disease Surveillance</span>
            <Badge className="bg-red-500 text-white ml-auto text-xs">12</Badge>
            <span className="text-xs text-red-600 ml-1">Alerts</span>
          </div>

          <div
            className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
            onClick={() => handleNavigation("/dashboard/govt/high-risk-camps")}
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">High-Risk Camps</span>
            <Badge className="bg-yellow-500 text-white ml-auto text-xs">8</Badge>
            <span className="text-xs text-yellow-600 ml-1">Flagged</span>
          </div>

          <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium text-sm">Health Records</span>
            <Badge className="bg-blue-600 text-white ml-auto">Active</Badge>
          </div>

          <div className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Resource Planning</span>
          </div>

          <div className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
            <Users className="h-4 w-4" />
            <span className="text-sm">Incentives & Policy</span>
          </div>

          <div className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer relative transition-colors">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Emergency Response</span>
            <Badge className="bg-red-600 text-white ml-auto text-xs">LIVE</Badge>
          </div>

          <div className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Advanced Analytics</span>
          </div>
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <Button variant="ghost" size="sm" onClick={() => handleNavigation("/dashboard/govt")} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Migrant Health Registry</h1>
              <p className="text-sm text-gray-600">Anonymous Health Records Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-1" />
              Export Records
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <FileText className="h-4 w-4 mr-1" />
              Generate Report
            </Button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Registered</p>
                    <p className="text-3xl font-bold text-gray-900">12,847</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">+234 this month</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Vaccination Coverage</p>
                    <p className="text-3xl font-bold text-gray-900">78.4%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "78.4%" }}></div>
                    </div>
                  </div>
                  <Syringe className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Active Cases</p>
                    <p className="text-3xl font-bold text-gray-900">1,523</p>
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3 text-orange-600" />
                      <span className="text-xs text-orange-600">Ongoing treatment</span>
                    </div>
                  </div>
                  <Activity className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">High-Risk Patients</p>
                    <p className="text-3xl font-bold text-gray-900">342</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Flag className="h-3 w-3 text-red-600" />
                      <span className="text-xs text-red-600">Requires attention</span>
                    </div>
                  </div>
                  <Flag className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by Anonymous ID..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Diseases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Diseases</SelectItem>
                <SelectItem value="tb">Tuberculosis</SelectItem>
                <SelectItem value="dengue">Dengue</SelectItem>
                <SelectItem value="malaria">Malaria</SelectItem>
                <SelectItem value="respiratory">Respiratory</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Vaccination Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="none">Not Vaccinated</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                <SelectItem value="kochi">Kochi</SelectItem>
                <SelectItem value="kozhikode">Kozhikode</SelectItem>
                <SelectItem value="thrissur">Thrissur</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Patient Records */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
              <p className="text-sm text-gray-600">Showing 1-12 of 12,847 records</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {patientRecords.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{patient.id}</p>
                          <p className="text-xs text-gray-600">Age: {patient.age}</p>
                        </div>
                      </div>
                      <Badge className={patient.statusColor}>{patient.status}</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{patient.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Activity className="h-3 w-3" />
                        <span>{patient.diseases}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Heart className="h-3 w-3" />
                        <span>{patient.medication}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Vaccination</span>
                        <span className="text-xs font-medium">{patient.vaccination}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${patient.vaccinationColor} h-2 rounded-full`}
                          style={{ width: `${patient.vaccination}%` }}
                        ></div>
                      </div>
                    </div>

                    <Button variant="link" className="w-full mt-3 p-0 h-auto text-blue-600 hover:text-blue-800">
                      View Full Record →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-blue-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="text-sm text-gray-500">...</span>
              <Button variant="outline" size="sm">
                1071
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="flex items-center gap-2 h-12 bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4" />
                  Add New Patient
                </Button>
                <Button className="flex items-center gap-2 h-12 bg-green-600 hover:bg-green-700">
                  <Calendar className="h-4 w-4" />
                  Schedule Vaccination
                </Button>
                <Button className="flex items-center gap-2 h-12 bg-yellow-600 hover:bg-yellow-700">
                  <Flag className="h-4 w-4" />
                  Flag High Risk
                </Button>
                <Button className="flex items-center gap-2 h-12 bg-purple-600 hover:bg-purple-700">
                  <FileText className="h-4 w-4" />
                  Bulk Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
