"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Users,
  Activity,
  Download,
  Settings,
  Bell,
  LogOut,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MapPin,
  User,
  Menu,
  Filter,
  RotateCcw,
  X,
  Maximize2,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function DiseaseSurveillancePage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
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
            className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/dashboard/govt")}
          >
            <Users className="h-4 w-4" />
            <span className="text-sm">Population Overview</span>
            <Badge className="bg-green-600 text-white ml-auto">Active</Badge>
          </div>

          <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="font-medium text-sm">Disease Surveillance</span>
            <Badge className="bg-red-500 text-white ml-auto text-xs">12</Badge>
            <span className="text-xs text-red-600 ml-1">Alerts</span>
          </div>

          <div
            className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/dashboard/govt/high-risk-camps")}
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">High-Risk Camps</span>
            <Badge className="bg-yellow-500 text-white ml-auto text-xs">8</Badge>
            <span className="text-xs text-yellow-600 ml-1">Flagged</span>
          </div>

          <div
            className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/dashboard/govt/health-records")}
          >
            <User className="h-4 w-4" />
            <span className="text-sm">Health Records</span>
          </div>

          <div className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Resource Planning</span>
          </div>

          <div className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
            <Users className="h-4 w-4" />
            <span className="text-sm">Incentives & Policy</span>
          </div>

          <div className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer relative">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Emergency Response</span>
            <Badge className="bg-red-600 text-white ml-auto text-xs">LIVE</Badge>
          </div>

          <div className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
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
          <Menu className="h-5 w-5 text-gray-600 cursor-pointer" />
          <div className="flex items-center gap-3 flex-1">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Disease Surveillance Dashboard</h1>
              <p className="text-sm text-gray-600">Real-time monitoring and analysis of disease patterns</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">System Online</span>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-1" />
              Export Report
            </Button>
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </div>
            <Settings className="h-5 w-5 text-gray-600 cursor-pointer" />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {/* Active Health Alerts */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <CardTitle className="text-lg">Active Health Alerts</CardTitle>
              </div>
              <Button variant="link" className="text-red-600 text-sm">
                View All Alerts
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-red-500 text-white text-xs">HIGH PRIORITY</Badge>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <h4 className="font-semibold text-red-800 mb-1">TB Outbreak Alert</h4>
                  <p className="text-sm text-gray-700 mb-2">15 new TB cases reported in Perumbavoor Camp this week</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>Perumbavoor Camp • 15 cases</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-yellow-500 text-white text-xs">MEDIUM</Badge>
                    <span className="text-xs text-gray-500">5 hours ago</span>
                  </div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Dengue Spike</h4>
                  <p className="text-sm text-gray-700 mb-2">8 new Dengue cases in Kochi district camps</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>Kochi District • 8 cases</span>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-blue-500 text-white text-xs">WATCH</Badge>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                  <h4 className="font-semibold text-blue-800 mb-1">Respiratory Infections</h4>
                  <p className="text-sm text-gray-700 mb-2">Increasing trend in Thiruvananthapuram camps</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>Thiruvananthapuram • 12 cases</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Diseases" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Diseases</SelectItem>
                    <SelectItem value="tb">TB</SelectItem>
                    <SelectItem value="dengue">Dengue</SelectItem>
                    <SelectItem value="malaria">Malaria</SelectItem>
                    <SelectItem value="respiratory">Respiratory</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="kochi">Kochi</SelectItem>
                    <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                    <SelectItem value="kozhikode">Kozhikode</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Camps" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Camps</SelectItem>
                    <SelectItem value="perumbavoor">Perumbavoor</SelectItem>
                    <SelectItem value="aluva">Aluva</SelectItem>
                    <SelectItem value="kochi-port">Kochi Port</SelectItem>
                  </SelectContent>
                </Select>

                <Input type="date" defaultValue="2024-01-01" className="w-36" />
                <span className="text-gray-500">to</span>
                <Input type="date" defaultValue="2024-12-31" className="w-36" />

                <Button className="bg-green-600 hover:bg-green-700">
                  <Filter className="h-4 w-4 mr-1" />
                  Apply Filters
                </Button>

                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>

              {/* Active Filters */}
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  TB Cases
                  <X className="h-3 w-3 ml-1 cursor-pointer" />
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Perumbavoor Camp
                  <X className="h-3 w-3 ml-1 cursor-pointer" />
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Last 30 Days
                  <X className="h-3 w-3 ml-1 cursor-pointer" />
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-red-500" />
                      <span className="text-xs text-red-600 font-medium">+12%</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">147</p>
                    <p className="text-sm text-gray-600">Active Cases</p>
                    <p className="text-xs text-gray-500 mt-1">↑ 23 new cases this week</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Alert</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">+8%</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">89</p>
                    <p className="text-sm text-gray-600">Recovered</p>
                    <p className="text-xs text-gray-500 mt-1">↑ 16 recovered this week</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Good</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">High Risk Camps</p>
                    <p className="text-xs text-gray-500 mt-1">⚠ Requires immediate attention</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Alert</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">34</p>
                    <p className="text-sm text-gray-600">Medical Staff</p>
                    <p className="text-xs text-gray-500 mt-1">● 24/7 monitoring active</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Online</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Disease Trend Analysis */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Disease Trend Analysis</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    7D
                  </Badge>
                  <Badge className="bg-green-600 text-white text-xs">30D</Badge>
                  <Badge variant="outline" className="text-xs">
                    90D
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                  {/* Simplified line chart representation */}
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-8 bg-red-500 rounded-t mb-2"></div>
                    <span className="text-xs text-gray-600">Week 1</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-32 w-8 bg-red-500 rounded-t mb-2"></div>
                    <span className="text-xs text-gray-600">Week 2</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-28 w-8 bg-green-500 rounded-t mb-2"></div>
                    <span className="text-xs text-gray-600">Week 3</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-8 bg-green-500 rounded-t mb-2"></div>
                    <span className="text-xs text-gray-600">Week 4</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-40 w-8 bg-red-500 rounded-t mb-2"></div>
                    <span className="text-xs text-gray-600">Week 5</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-36 w-8 bg-green-500 rounded-t mb-2"></div>
                    <span className="text-xs text-gray-600">Week 6</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>New Cases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Resolved Cases</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disease Distribution */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Disease Distribution</CardTitle>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 flex items-center justify-center">
                  {/* Simplified pie chart representation */}
                  <div className="w-48 h-48 rounded-full relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-red-500"
                      style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 35%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-yellow-500"
                      style={{ clipPath: "polygon(50% 50%, 100% 35%, 100% 65%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-blue-500"
                      style={{ clipPath: "polygon(50% 50%, 100% 65%, 85% 100%, 50% 100%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-purple-500"
                      style={{ clipPath: "polygon(50% 50%, 50% 100%, 15% 100%, 0% 65%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 bg-green-500"
                      style={{ clipPath: "polygon(50% 50%, 0% 65%, 0% 0%, 50% 0%)" }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>TB 35.0%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Dengue 22.0%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Malaria 20.0%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Respiratory 18.0%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Others 5.0%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* District-wise Disease Comparison */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>District-wise Disease Comparison</CardTitle>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Last 30 Days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end justify-between gap-4 px-4">
                {/* District bars */}
                {[
                  { name: "Thiruvananthapuram", tb: 15, dengue: 8, malaria: 5, respiratory: 12 },
                  { name: "Kochi", tb: 25, dengue: 18, malaria: 12, respiratory: 15 },
                  { name: "Kozhikode", tb: 12, dengue: 15, malaria: 8, respiratory: 10 },
                  { name: "Thrissur", tb: 8, dengue: 12, malaria: 6, respiratory: 18 },
                  { name: "Kannur", tb: 6, dengue: 10, malaria: 4, respiratory: 8 },
                ].map((district, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-end gap-1 mb-2">
                      <div className="w-4 bg-red-500 rounded-t" style={{ height: `${district.tb * 4}px` }}></div>
                      <div className="w-4 bg-yellow-500 rounded-t" style={{ height: `${district.dengue * 4}px` }}></div>
                      <div className="w-4 bg-blue-500 rounded-t" style={{ height: `${district.malaria * 4}px` }}></div>
                      <div
                        className="w-4 bg-purple-500 rounded-t"
                        style={{ height: `${district.respiratory * 4}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 text-center">{district.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>TB</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Dengue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Malaria</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Respiratory</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disease Hotspot Map */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Disease Hotspot Map</CardTitle>
                <p className="text-sm text-gray-600">
                  Real-time visualization of disease distribution across Kerala camps
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Healthy (0-2 cases)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Rising (3-8 cases)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Outbreak (9+ cases)</span>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Maximize2 className="h-4 w-4 mr-1" />
                  Full Screen
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                {/* Kerala Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 relative">
                    {/* Simplified Kerala map representation with colored regions */}
                    <div className="absolute inset-0 bg-gradient-to-b from-green-400 via-yellow-400 to-red-400 opacity-70 rounded-lg"></div>

                    {/* Camp Details Popup */}
                    <div className="absolute top-16 left-16 bg-white p-3 rounded-lg shadow-lg border text-sm">
                      <h4 className="font-semibold mb-2">Camp Details</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Perumbavoor Camp</span>
                          <span className="text-red-600 font-medium">15 cases</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Aluva Camp</span>
                          <span className="text-yellow-600 font-medium">6 cases</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Kochi Port Camp</span>
                          <span className="text-green-600 font-medium">2 cases</span>
                        </div>
                      </div>
                    </div>

                    {/* Location markers */}
                    <div className="absolute top-20 left-32 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></div>
                    <div className="absolute top-32 left-28 w-3 h-3 bg-yellow-600 rounded-full border-2 border-white"></div>
                    <div className="absolute top-28 left-40 w-3 h-3 bg-green-600 rounded-full border-2 border-white"></div>
                    <div className="absolute bottom-32 left-24 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></div>
                    <div className="absolute bottom-28 right-32 w-3 h-3 bg-yellow-600 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
