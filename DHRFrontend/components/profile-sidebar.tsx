"use client"
import { X, Edit, CreditCard, Gift, Globe, Settings, Trash2, RotateCcw, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface ProfileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    onClose() // Close the sidebar first
    router.push("/") // Redirect to home page
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6 relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/10 p-1"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white/20">
                <AvatarImage src="/professional-woman-doctor.png" alt="Sarah Johnson" />
                <AvatarFallback className="bg-white/10 text-white text-xl">SJ</AvatarFallback>
              </Avatar>

              <h2 className="text-xl font-bold mb-1">Sarah Johnson</h2>
              <p className="text-blue-100 text-sm mb-1">sarah.johnson@gmail.com</p>
              <p className="text-blue-200 text-xs mb-4">ID: 2024-396168</p>

              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {/* My Health ID */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">My Health ID</p>
                    <p className="text-sm text-gray-500">Digital health card access</p>
                  </div>
                </div>
              </div>

              {/* My Rewards */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Gift className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">My Rewards</p>
                    <p className="text-sm text-gray-500">2.5k available rewards</p>
                  </div>
                </div>
                <Badge className="bg-pink-500 text-white text-xs px-2 py-1">New</Badge>
              </div>

              {/* Language Preference */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Globe className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Language Preference</p>
                        <p className="text-sm text-gray-500">English & Hindi</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>हिंदी (Hindi)</DropdownMenuItem>
                  <DropdownMenuItem>বাংলা (Bengali)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Settings className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Settings</p>
                    <p className="text-sm text-gray-500">Privacy & notifications</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Bottom Actions */}
            <div className="space-y-2">
              {/* Clear Cache */}
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Clear Cache</p>
                  <p className="text-xs text-gray-500">Free up storage space</p>
                </div>
              </div>

              {/* Clear History */}
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <RotateCcw className="h-4 w-4 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Clear History</p>
                  <p className="text-xs text-gray-500">Remove browsing history</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center mb-4">
              <p className="text-xs text-gray-500">App Version: 2.1.0</p>
              <p className="text-xs text-gray-500">Last Updated: Dec 15, 2024</p>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
