"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  CheckCircle,
  FileText,
  Clock,
  IndianRupee,
  Bell,
  Heart,
  Leaf,
  GraduationCap,
  Briefcase,
} from "lucide-react"

export default function BenefitsPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Government Benefits</h1>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Check Your Scheme Eligibility</h2>
            <p className="text-blue-100 mb-8">Find out which government schemes you qualify for instantly</p>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter your Aadhaar number, Income, Age, Location..."
                    className="h-12 text-gray-700"
                  />
                </div>
                <Button className="h-12 px-8 bg-blue-700 hover:bg-blue-800">
                  <Search className="w-4 h-4 mr-2" />
                  Check Eligibility
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Quick Search:</span>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                  <Heart className="w-4 h-4 mr-1" />
                  Health Schemes
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Education
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                  <Leaf className="w-4 h-4 mr-1" />
                  Agriculture
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                  <Briefcase className="w-4 h-4 mr-1" />
                  Employment
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Eligible Schemes</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-gray-600">Active Applications</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">₹45,000</p>
                  <p className="text-sm text-gray-600">Total Benefits Received</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Latest Updates */}
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Latest Updates</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900">Your PM-KISAN application has been approved!</span>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">New Ayushman Bharat card ready for download</span>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Government Schemes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Your Government Schemes</h3>
              <p className="text-gray-600">Manage your benefits and check eligibility status</p>
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all-categories">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="employment">Employment</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-status">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="eligible">Eligible</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ayushman Bharat */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Eligible
                  </Badge>
                </div>

                <h4 className="text-lg font-semibold mb-2">Ayushman Bharat</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Free healthcare coverage up to ₹5 lakh per family per year for secondary and tertiary care
                  hospitalization.
                </p>

                <Button className="w-full bg-blue-700 hover:bg-blue-800">Apply Now</Button>
              </CardContent>
            </Card>

            {/* PM-KISAN */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    <FileText className="w-3 h-3 mr-1" />
                    Applied
                  </Badge>
                </div>

                <h4 className="text-lg font-semibold mb-2">PM-KISAN</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Income support of ₹6,000 per year to all farmer families across the country in three equal
                  installments.
                </p>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Download Card</Button>
              </CardContent>
            </Card>

            {/* e-SHRAM */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Eligible
                  </Badge>
                </div>

                <h4 className="text-lg font-semibold mb-2">e-SHRAM</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Digital platform for unorganized workers with accident insurance coverage of ₹2 lakh and disability
                  benefits.
                </p>

                <Button className="w-full bg-blue-700 hover:bg-blue-800">Apply Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
