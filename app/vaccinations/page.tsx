import { AlertTriangle, Calendar, Download, MapPin, Bell, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VaccinationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert Banner */}
      <Alert className="bg-yellow-50 border-yellow-200 rounded-none border-x-0 border-t-0">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800 flex items-center justify-between">
          <span>
            You have 3 pending vaccinations. Please schedule your appointments to maintain complete immunization
            coverage.
          </span>
          <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700">
            <X className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>

      <div className="p-6">
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white h-16 flex flex-col items-center justify-center gap-2">
            <Calendar className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold">Schedule Appointment</div>
              <div className="text-xs opacity-90">Book vaccination slot</div>
            </div>
          </Button>

          <Button className="bg-green-500 hover:bg-green-600 text-white h-16 flex flex-col items-center justify-center gap-2">
            <Download className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold">Download Certificate</div>
              <div className="text-xs opacity-90">Get vaccination proof</div>
            </div>
          </Button>

          <Button className="bg-gray-600 hover:bg-gray-700 text-white h-16 flex flex-col items-center justify-center gap-2">
            <MapPin className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold">Find Centers</div>
              <div className="text-xs opacity-90">Locate nearby clinics</div>
            </div>
          </Button>

          <Button className="bg-purple-500 hover:bg-purple-600 text-white h-16 flex flex-col items-center justify-center gap-2">
            <Bell className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold">Set Reminders</div>
              <div className="text-xs opacity-90">Never miss a dose</div>
            </div>
          </Button>
        </div>

        {/* Vaccination Status Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Vaccinations */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <span>Pending Vaccinations</span>
                </div>
                <Badge className="bg-red-500 text-white">3 Due</Badge>
              </CardTitle>
              <p className="text-sm text-gray-600">Vaccines requiring attention</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hepatitis B */}
              <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">Hepatitis B (2nd Dose)</h4>
                    <p className="text-sm text-gray-600">Adult vaccination series</p>
                    <p className="text-sm text-gray-600">Due: March 15, 2024</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-red-500 text-white mb-2">MISSED</Badge>
                    <p className="text-xs text-red-600">7 days overdue</p>
                  </div>
                </div>
                <Button className="bg-red-500 hover:bg-red-600 text-white">Schedule Now</Button>
              </div>

              {/* COVID-19 Booster */}
              <div className="border-l-4 border-orange-500 pl-4 py-3 bg-orange-50 rounded-r-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">COVID-19 Booster</h4>
                    <p className="text-sm text-gray-600">mRNA vaccine booster</p>
                    <p className="text-sm text-gray-600">Due: March 28, 2024</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-orange-500 text-white mb-2">DUE SOON</Badge>
                    <p className="text-xs text-orange-600">5 days left</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">Schedule Now</Button>
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Remind Later
                  </Button>
                </div>
              </div>

              {/* Seasonal Flu */}
              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">Seasonal Flu</h4>
                    <p className="text-sm text-gray-600">Annual influenza vaccine</p>
                    <p className="text-sm text-gray-600">Due: April 10, 2024</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-500 text-white mb-2">UPCOMING</Badge>
                    <p className="text-xs text-blue-600">18 days left</p>
                  </div>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Schedule Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* Completed Vaccinations */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Completed Vaccinations</span>
                </div>
                <Badge className="bg-green-500 text-white">8 Complete</Badge>
              </CardTitle>
              <p className="text-sm text-gray-600">Successfully administered vaccines</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* COVID-19 2nd Dose */}
              <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">COVID-19 Vaccine (2nd Dose)</h4>
                    <p className="text-sm text-gray-600 mb-2">Pfizer-BioNTech mRNA vaccine</p>
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                      <div>
                        <p className="font-medium">Date Administered</p>
                        <p>February 15, 2024</p>
                      </div>
                      <div>
                        <p className="font-medium">Healthcare Provider</p>
                        <p>Dr. Priya Sharma</p>
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p>City Hospital, Delhi</p>
                      </div>
                      <div>
                        <p className="font-medium">Batch Number</p>
                        <p>PF-2024-0215</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COVID-19 1st Dose */}
              <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">COVID-19 Vaccine (1st Dose)</h4>
                    <p className="text-sm text-gray-600 mb-2">Pfizer-BioNTech mRNA vaccine</p>
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                      <div>
                        <p className="font-medium">Date Administered</p>
                        <p>January 25, 2024</p>
                      </div>
                      <div>
                        <p className="font-medium">Healthcare Provider</p>
                        <p>Dr. Priya Sharma</p>
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p>City Hospital, Delhi</p>
                      </div>
                      <div>
                        <p className="font-medium">Batch Number</p>
                        <p>PF-2024-0125</p>
                      </div>
                    </div>
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
