"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  X,
  Mail,
  Phone,
  Building2,
  MapPin,
  Lock,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle,
  Stethoscope,
  Bell,
} from "lucide-react"

interface DoctorProfileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function DoctorProfileSidebar({ isOpen, onClose }: DoctorProfileSidebarProps) {
  const router = useRouter()

  const doctorData = {
    name: "Dr. Ramesh Kumar",
    specialization: "General Physician",
    doctorId: "DOC-2024-001234",
    email: "dr.ramesh@health.gov.in",
    phone: "+91 98765 43210",
    hospital: "Government General Hospital",
    location: "Mumbai, Maharashtra",
    avatar: "/indian-doctor.jpg",
  }

  const handleLogout = () => {
    onClose()
    router.push("/")
  }

  return (
    <>
      {/* Sidebar Panel - No Overlay */}
      <div
        className={`fixed right-0 top-0 h-full w-[380px] bg-white shadow-xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Doctor Profile</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Profile Header */}
        <div className="p-6 bg-gradient-to-r from-teal-50 to-blue-50">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src={doctorData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-teal-600 text-white text-lg">
                {doctorData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{doctorData.name}</h3>
            <p className="text-gray-600 mb-3">{doctorData.specialization}</p>
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified Doctor
            </Badge>
          </div>
        </div>

        {/* Basic Information */}
        <div className="p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Basic Information</h4>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Stethoscope className="h-4 w-4 text-teal-600" />
                <div>
                  <p className="text-xs text-gray-500">Doctor ID / Registration</p>
                  <p className="text-sm font-medium text-gray-900">{doctorData.doctorId}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-sm font-medium text-gray-900">{doctorData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm font-medium text-gray-900">{doctorData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Hospital / Clinic</p>
                  <p className="text-sm font-medium text-gray-900">{doctorData.hospital}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900">{doctorData.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="px-6 pb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Quick Actions</h4>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50" onClick={() => {}}>
              <Lock className="h-4 w-4 mr-3 text-gray-500" />
              Change Password
            </Button>

            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50" onClick={() => {}}>
              <Settings className="h-4 w-4 mr-3 text-gray-500" />
              Account Settings
            </Button>

            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50" onClick={() => {}}>
              <Bell className="h-4 w-4 mr-3 text-gray-500" />
              Notification Preferences
            </Button>

            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50" onClick={() => {}}>
              <HelpCircle className="h-4 w-4 mr-3 text-gray-500" />
              Help & Support
            </Button>

            <div className="border-t pt-2 mt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
