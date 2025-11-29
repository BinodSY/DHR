import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Phone,
  Ambulance,
  Building2,
  Eye,
  Droplets,
  Stethoscope,
  HandHeart,
  Hospital,
  FileText,
} from "lucide-react"

export default function AlertsPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-xl font-semibold">Disease Alerts</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="bg-red-500 text-white p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">URGENT ALERT:</span>
            <span>Dengue cases increasing rapidly in Mumbai region. Take immediate precautions.</span>
          </div>
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            View Details
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Disease Hotspots Map</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>High Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>Medium Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Low Risk</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="absolute top-4 left-8">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-8 right-12">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-16 left-16">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-12 right-20">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-center text-gray-500">
                    <Building2 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>Interactive Map Loading...</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <span>Showing 15 active monitoring zones</span>
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    View Full Screen Map
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-red-600">1,247</div>
                  <div className="text-sm text-gray-600">Active Cases</div>
                  <div className="text-xs text-red-600 mt-1">+23% from last week</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <HandHeart className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">4,892</div>
                  <div className="text-sm text-gray-600">Recovered</div>
                  <div className="text-xs text-green-600 mt-1">+15% recovery rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Hospital className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">127</div>
                  <div className="text-sm text-gray-600">Hospitals</div>
                  <div className="text-xs text-blue-600 mt-1">Ready for patients</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-red-600">HIGH RISK ALERT</div>
                    <div className="text-sm text-gray-600">
                      Dengue cases up 30% in your area. Take precautions immediately.
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-3">● Updated 2 hours ago</div>
                <Button className="w-full bg-red-500 hover:bg-red-600">View Prevention Guidelines</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Malaria outbreak</div>
                    <div className="text-sm text-gray-600">Andheri East</div>
                  </div>
                  <div className="text-xs text-gray-500">3 hours ago</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Typhoid cases rising</div>
                    <div className="text-sm text-gray-600">Bandra West</div>
                  </div>
                  <div className="text-xs text-gray-500">6 hours ago</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">All clear</div>
                    <div className="text-sm text-gray-600">Powai</div>
                  </div>
                  <div className="text-xs text-gray-500">1 day ago</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Chikungunya alert</div>
                    <div className="text-sm text-gray-600">Thane</div>
                  </div>
                  <div className="text-xs text-gray-500">2 days ago</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Disease Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Dengue</div>
                    <Badge variant="destructive" className="text-xs">
                      High Risk
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Vector-borne disease transmitted by Aedes mosquitoes. Peak season: Post-monsoon.
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Active Cases:</span>
                    <span className="font-semibold text-red-600">647</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trend:</span>
                    <span className="font-semibold text-red-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      23%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Typhoid</div>
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      Medium Risk
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Bacterial infection spread through contaminated food and water sources.
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Active Cases:</span>
                    <span className="font-semibold text-orange-600">234</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trend:</span>
                    <span className="font-semibold text-orange-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      12%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Malaria</div>
                    <Badge variant="destructive" className="text-xs">
                      High Risk
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Parasitic disease transmitted by infected Anopheles mosquitoes.
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Active Cases:</span>
                    <span className="font-semibold text-red-600">166</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trend:</span>
                    <span className="font-semibold text-red-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      8%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Chikungunya</div>
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      Medium Risk
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Viral disease spread by Aedes mosquitoes causing fever and joint pain.
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Active Cases:</span>
                    <span className="font-semibold text-orange-600">89</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trend:</span>
                    <span className="font-semibold text-green-600 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      5%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Essential Safety Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Wear Mask</h3>
                <p className="text-sm text-gray-600">
                  Always wear a mask in public places and maintain social distancing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Clean Water</h3>
                <p className="text-sm text-gray-600">
                  Drink only boiled or filtered water to prevent waterborne diseases.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">See Doctor</h3>
                <p className="text-sm text-gray-600">Consult a doctor immediately if you experience any symptoms.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HandHeart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Hand Hygiene</h3>
                <p className="text-sm text-gray-600">Wash hands with soap frequently for at least 20 seconds.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Latest Health News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="destructive" className="text-xs">
                    URGENT
                  </Badge>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <h3 className="font-semibold mb-2">Dengue Prevention Drive Launched</h3>
                <p className="text-sm text-gray-600 mb-3">
                  BMC launches city-wide dengue prevention campaign focusing on high-risk areas...
                </p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Read More
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    UPDATE
                  </Badge>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <h3 className="font-semibold mb-2">New Testing Centers Opened</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Five new rapid testing centers for vector-borne diseases opened across Mumbai...
                </p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Read More
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                    INFO
                  </Badge>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <h3 className="font-semibold mb-2">Vaccination Drive Schedule</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Updated schedule for seasonal vaccination drives in all municipal wards...
                </p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-red-500 text-white">
          <CardHeader>
            <CardTitle className="text-white">Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Ambulance className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Emergency Ambulance</h3>
                <div className="text-2xl font-bold mb-1">108</div>
                <p className="text-sm text-white/80">24/7 Emergency Services</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Health Helpline</h3>
                <div className="text-2xl font-bold mb-1">1075</div>
                <p className="text-sm text-white/80">Health Information & Guidance</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">BMC Health Dept</h3>
                <div className="text-2xl font-bold mb-1">1916</div>
                <p className="text-sm text-white/80">Municipal Health Services</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="h-12 bg-blue-600 hover:bg-blue-700">
            <Hospital className="h-5 w-5 mr-2" />
            Find Nearby Hospital
          </Button>
          <Button
            variant="outline"
            className="h-12 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            <FileText className="h-5 w-5 mr-2" />
            Report Symptoms
          </Button>
        </div>
      </div>
    </SidebarInset>
  )
}
