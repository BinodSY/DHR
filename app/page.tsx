"use client"

import {
  Phone,
  Headphones,
  Truck,
  MessageCircle,
  Shield,
  Building2,
  Pill,
  PhoneCall,
  AlertTriangle,
  MapPin,
  Users,
  Download,
  Gift,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  Eye,
  Briefcase,
  Heart,
  User,
  Stethoscope,
  Building,
  Mail,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HealthPortal() {
  const [activeUserType, setActiveUserType] = useState<"worker" | "doctor" | "govt">("worker")
  const [authMethod, setAuthMethod] = useState<"password" | "otp">("password")
  const router = useRouter()

  const handleLogin = () => {
    if (activeUserType === "worker") {
      router.push("/dashboard/worker")
    } else if (activeUserType === "govt") {
      router.push("/dashboard/govt")
    } else if (activeUserType === "doctor") {
      router.push("/dashboard/doctor") // Placeholder for future implementation
    }
  }

  // The original `handleLogout` function is no longer relevant in this new context..
  // const handleLogout = () => {
  //   router.push("/login")
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/migrant-worker-health-logo.jpg"
              alt="Migrant Worker Digital Health Record"
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Health Portal for Migrant Workers</h1>
              <p className="text-sm text-gray-600">प्रवासी श्रमिकों के लिए स्वास्थ्य पोर्टल</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="english">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <HelpCircle className="h-4 w-4 mr-1" />
              Help
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="h-4 w-4 mr-1" />
              Emergency: 102
            </Button>
          </div>
        </div>
      </header>

      {/* Red Notice Bar with Marquee Animation */}
      <div className="bg-red-600 text-white py-2 px-4 text-sm overflow-hidden">
        <div className="container mx-auto">
          <div className="animate-marquee whitespace-nowrap">
            🚨 महत्वपूर्ण अधिसूचना है | Important Notice: COVID-19 vaccination is mandatory for all migrant workers | टोल फ्री
            हेल्पलाइन: 1800-XXX-XXXX | Toll Free Helpline: 1800-XXX-XXXX | Emergency Services Available 24/7 | आपातकालीन
            सेवाएं 24/7 उपलब्ध
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Indian Government Style Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="healthcare-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="#FF6B35" opacity="0.3" />
                  <rect x="40" y="15" width="10" height="2" fill="#138808" opacity="0.3" />
                  <rect x="44" y="11" width="2" height="10" fill="#138808" opacity="0.3" />
                  <circle cx="70" cy="70" r="3" fill="#000080" opacity="0.2" />
                  <polygon points="80,30 85,40 75,40" fill="#FF6B35" opacity="0.2" />
                </pattern>
                <pattern id="ashoka-wheel" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <circle cx="100" cy="100" r="30" fill="none" stroke="#000080" strokeWidth="1" opacity="0.1" />
                  <g transform="translate(100,100)">
                    <line x1="0" y1="-30" x2="0" y2="30" stroke="#000080" strokeWidth="0.5" opacity="0.1" />
                    <line x1="-30" y1="0" x2="30" y2="0" stroke="#000080" strokeWidth="0.5" opacity="0.1" />
                    <line x1="-21" y1="-21" x2="21" y2="21" stroke="#000080" strokeWidth="0.5" opacity="0.1" />
                    <line x1="21" y1="-21" x2="-21" y2="21" stroke="#000080" strokeWidth="0.5" opacity="0.1" />
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#healthcare-pattern)" />
              <rect width="100%" height="100%" fill="url(#ashoka-wheel)" />
            </svg>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-orange-200 rounded-full opacity-20"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-green-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 left-32 w-24 h-24 border-2 border-blue-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-40 right-10 w-12 h-12 bg-orange-100 rounded-full opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          <div>
            <h2 className="text-4xl font-bold text-orange-500 mb-2">डिजिटल स्वास्थ्य पहचान</h2>
            <div className="text-4xl font-bold text-black mb-4">
              Digital Health Identity - <span className="bg-green-600 px-3 py-1 rounded text-white">Portable</span>
              <br />& <span className="bg-green-600 px-3 py-1 rounded text-white">Secure</span>
            </div>
            <p className="text-lg text-gray-700 mb-8">
              Digital health identity for every migrant worker in India. Secure, portable, and accessible across all
              states and languages.
            </p>
            <div className="flex gap-4 mb-8">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3">
                <Download className="h-5 w-5 mr-2" />
                Download Health Report
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
                <Gift className="h-5 w-5 mr-2" />
                Check Rewards / Benefits
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/80 p-4 rounded-lg text-center backdrop-blur-sm border border-white/20">
                <div className="text-2xl font-bold text-gray-800">2.5M+</div>
                <div className="text-sm text-gray-600">Registered Workers</div>
              </div>
              <div className="bg-white/80 p-4 rounded-lg text-center backdrop-blur-sm border border-white/20">
                <div className="text-2xl font-bold text-gray-800">28</div>
                <div className="text-sm text-gray-600">States Covered</div>
              </div>
              <div className="bg-white/80 p-4 rounded-lg text-center backdrop-blur-sm border border-white/20">
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4 inline mr-1" />
                Government Secured & Verified
              </div>
            </div>

            <div className="flex mb-6">
              <Button
                className={`flex-1 rounded-r-none ${activeUserType === "worker" ? "bg-blue-800 text-white" : "bg-transparent border border-gray-300 text-gray-700"}`}
                onClick={() => setActiveUserType("worker")}
              >
                <User className="h-4 w-4 mr-1" />
                Worker
              </Button>
              <Button
                className={`flex-1 rounded-none border-l-0 ${activeUserType === "doctor" ? "bg-blue-800 text-white" : "bg-transparent border border-gray-300 text-gray-700"}`}
                onClick={() => setActiveUserType("doctor")}
              >
                <Stethoscope className="h-4 w-4 mr-1" />
                Doctor
              </Button>
              <Button
                className={`flex-1 rounded-l-none border-l-0 ${activeUserType === "govt" ? "bg-blue-800 text-white" : "bg-transparent border border-gray-300 text-gray-700"}`}
                onClick={() => setActiveUserType("govt")}
              >
                <Building className="h-4 w-4 mr-1" />
                Govt
              </Button>
            </div>

            <div className="space-y-4">
              {activeUserType === "worker" && (
                <>
                  <div>
                    <Label htmlFor="workerAuth" className="text-sm font-medium">
                      Mobile Number / Aadhaar Number <span className="text-red-500">*</span>
                    </Label>
                    <Input id="workerAuth" placeholder="Enter mobile number or Aadhaar number" className="mt-1" />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={authMethod === "otp" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAuthMethod("otp")}
                    >
                      Login with OTP
                    </Button>
                    <Button
                      variant={authMethod === "password" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAuthMethod("password")}
                    >
                      Login with Password
                    </Button>
                  </div>

                  {authMethod === "otp" ? (
                    <div>
                      <Label htmlFor="otp" className="text-sm font-medium">
                        Enter OTP <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex gap-2 mt-1">
                        <Input id="otp" placeholder="Enter 6-digit OTP" className="flex-1" />
                        <Button variant="outline" size="sm">
                          Send OTP
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="workerPassword" className="text-sm font-medium">
                        Password <span className="text-red-500">*</span>
                      </Label>
                      <Input id="workerPassword" type="password" placeholder="Enter your password" className="mt-1" />
                    </div>
                  )}
                </>
              )}

              {activeUserType === "doctor" && (
                <>
                  <div>
                    <Label htmlFor="doctorId" className="text-sm font-medium">
                      Doctor ID <span className="text-red-500">*</span>
                    </Label>
                    <Input id="doctorId" placeholder="Enter your Doctor ID" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="doctorPassword" className="text-sm font-medium">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input id="doctorPassword" type="password" placeholder="Enter your password" className="mt-1" />
                  </div>
                </>
              )}

              {activeUserType === "govt" && (
                <>
                  <div>
                    <Label htmlFor="govtEmail" className="text-sm font-medium">
                      Official Government Email <span className="text-red-500">*</span>
                    </Label>
                    <Input id="govtEmail" type="email" placeholder="yourname@kerala.gov.in" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="govtPassword" className="text-sm font-medium">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input id="govtPassword" type="password" placeholder="Enter your password" className="mt-1" />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="captcha" className="text-sm font-medium">
                  Security Code (CAPTCHA) <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2 mt-1">
                  <div className="bg-gray-100 px-3 py-2 rounded border font-mono">7K9P2X</div>
                  <Button variant="outline" size="sm">
                    🔄
                  </Button>
                </div>
                <Input id="captcha" placeholder="Enter the code above" className="mt-2" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
                <div className="ml-auto">
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3" onClick={handleLogin}>
                <Shield className="h-4 w-4 mr-2" />
                सुरक्षित प्रवेश / Secure Login
              </Button>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Register Now
                </a>
              </div>

              <div className="text-xs text-gray-500 text-center">
                By logging in, you agree to our{" "}
                <a href="#" className="text-blue-600">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Facilities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">सेवाएं और सुविधाएं / Services & Facilities</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services designed specifically for migrant workers across India
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="bg-blue-50 border-blue-200 text-center p-6">
              <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Digital Health ID</h3>
              <p className="text-sm text-gray-600">Unique health identifier for seamless access</p>
            </Card>

            <Card className="bg-green-50 border-green-200 text-center p-6">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hospital Network</h3>
              <p className="text-sm text-gray-600">Access to 5000+ empaneled hospitals</p>
            </Card>

            <Card className="bg-purple-50 border-purple-200 text-center p-6">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pill className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Medicine Delivery</h3>
              <p className="text-sm text-gray-600">Free home delivery of prescribed medicines</p>
            </Card>

            <Card className="bg-orange-50 border-orange-200 text-center p-6">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Helpline</h3>
              <p className="text-sm text-gray-600">Round-the-clock medical assistance</p>
            </Card>
          </div>

          {/* Health Records Dashboard */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">स्वास्थ्य रिकॉर्ड डैशबोर्ड / Health Records Dashboard</h2>
            <p className="text-gray-600">Complete overview of your health journey and medical history</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Health Summary</h3>
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Overall Health Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Checkup</span>
                  <span className="text-sm font-medium">15 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Vaccinations</span>
                  <span className="text-sm font-medium text-green-600">Up to date</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Recent Activities</h3>
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Health checkup completed</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Prescription refilled</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Pill className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">COVID-19 booster shot</p>
                    <p className="text-xs text-gray-500">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Upcoming</h3>
                <Briefcase className="h-5 w-5 text-orange-600" />
              </div>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm font-medium">Annual Health Checkup</p>
                  <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                  <p className="text-xs text-gray-500">Dr. Sharma • General Medicine</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="text-sm font-medium">Dental Checkup</p>
                  <p className="text-xs text-gray-500">Next week, 2:00 PM</p>
                  <p className="text-xs text-gray-500">Dr. Patel • Dentist</p>
                </div>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  View all appointments →
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits & Schemes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">लाभ और योजनाएं / Benefits & Schemes</h2>
            <p className="text-gray-600">Government welfare programs and benefits available for migrant workers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-blue-50 border-blue-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-800 p-2 rounded">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ayushman Bharat</h3>
                  <p className="text-sm text-gray-600">PM-JAY Scheme</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Free healthcare coverage up to ₹5 lakhs per family per year for eligible families.
              </p>
              <div className="flex items-center justify-between">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Learn More →
                </a>
              </div>
            </Card>

            <Card className="bg-green-50 border-green-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 p-2 rounded">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">ESIC Benefits</h3>
                  <p className="text-sm text-gray-600">Medical & Cash Benefits</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Medical care and cash benefits during sickness, maternity, disability and employment injury.
              </p>
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Eligible</span>
                <a href="#" className="text-green-600 text-sm hover:underline">
                  Apply Now →
                </a>
              </div>
            </Card>

            <Card className="bg-purple-50 border-purple-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-600 p-2 rounded">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Shramik Card</h3>
                  <p className="text-sm text-gray-600">Labour Registration</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Official registration for construction workers with access to various welfare schemes.
              </p>
              <div className="flex items-center justify-between">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Pending</span>
                <a href="#" className="text-purple-600 text-sm hover:underline">
                  Register →
                </a>
              </div>
            </Card>

            <Card className="bg-orange-50 border-orange-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-600 p-2 rounded">
                  <Pill className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Jan Aushadhi</h3>
                  <p className="text-sm text-gray-600">Generic Medicines</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Access to affordable generic medicines at Jan Aushadhi stores across India.
              </p>
              <div className="flex items-center justify-between">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Available</span>
                <a href="#" className="text-orange-600 text-sm hover:underline">
                  Find Store →
                </a>
              </div>
            </Card>

            <Card className="bg-indigo-50 border-indigo-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-600 p-2 rounded">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">State Schemes</h3>
                  <p className="text-sm text-gray-600">Regional Benefits</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                State-specific health and welfare schemes available in your current location.
              </p>
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Location Based</span>
                <a href="#" className="text-indigo-600 text-sm hover:underline">
                  Explore →
                </a>
              </div>
            </Card>

            <Card className="bg-red-50 border-red-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 p-2 rounded">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Emergency Fund</h3>
                  <p className="text-sm text-gray-600">Financial Assistance</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Emergency financial assistance for medical emergencies and critical health conditions.
              </p>
              <div className="flex items-center justify-between">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Emergency Only</span>
                <a href="#" className="text-red-600 text-sm hover:underline">
                  Apply →
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">आपातकालीन सेवाएं / Emergency Services</h2>
            <p className="text-gray-600">24/7 emergency medical assistance and helpline numbers</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-red-50 border-red-200 text-center p-6">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Emergency</h3>
              <div className="text-2xl font-bold text-red-600 mb-2">108</div>
              <p className="text-sm text-gray-600">24/7 Medical Emergency</p>
            </Card>

            <Card className="bg-blue-50 border-blue-200 text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Health Helpline</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">104</div>
              <p className="text-sm text-gray-600">Medical Consultation</p>
            </Card>

            <Card className="bg-green-50 border-green-200 text-center p-6">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ambulance</h3>
              <div className="text-2xl font-bold text-green-600 mb-2">102</div>
              <p className="text-sm text-gray-600">Free Ambulance Service</p>
            </Card>

            <Card className="bg-purple-50 border-purple-200 text-center p-6">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mental Health</h3>
              <div className="text-2xl font-bold text-purple-600 mb-2">1800-XXX</div>
              <p className="text-sm text-gray-600">Counseling Support</p>
            </Card>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Emergency Actions / त्वरित आपातकालीन कार्य</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Button className="bg-red-600 hover:bg-red-700 text-white p-6 h-auto flex-col gap-3">
              <AlertTriangle className="h-8 w-8" />
              <div>
                <div className="font-semibold">Report Emergency</div>
                <div className="text-sm opacity-90">Immediate medical emergency</div>
              </div>
            </Button>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex-col gap-3">
              <MapPin className="h-8 w-8" />
              <div>
                <div className="font-semibold">Share Location</div>
                <div className="text-sm opacity-90">Send current location to emergency services</div>
              </div>
            </Button>

            <Button className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto flex-col gap-3">
              <Users className="h-8 w-8" />
              <div>
                <div className="font-semibold">Contact Family</div>
                <div className="text-sm opacity-90">Notify emergency contacts</div>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Support & Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">सहायता और संपर्क / Support & Contact</h2>
            <p className="text-gray-600">Get help and support for all your health portal needs</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input id="phoneNumber" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input id="emailAddress" type="email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="issueCategory">Issue Category *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="account">Account Related</SelectItem>
                      <SelectItem value="benefits">Benefits & Schemes</SelectItem>
                      <SelectItem value="emergency">Emergency Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" placeholder="Describe your issue in detail..." className="mt-1" rows={4} />
                </div>
                <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white">Send Message</Button>
              </div>
            </Card>

            {/* Office Hours & Regional Offices */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-red-600">Closed</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Emergency Support:</span>
                    <span className="text-green-600">24/7 Available</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Regional Offices</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-red-500 pl-3">
                    <div className="font-medium">Northern Region</div>
                    <div className="text-gray-600">Delhi, Punjab, Haryana, UP</div>
                    <div className="text-gray-600">Phone: 011-XXXX-XXXX</div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3">
                    <div className="font-medium">Western Region</div>
                    <div className="text-gray-600">Mumbai, Gujarat, Rajasthan</div>
                    <div className="text-gray-600">Phone: 022-XXXX-XXXX</div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <div className="font-medium">Southern Region</div>
                    <div className="text-gray-600">Bangalore, Chennai, Hyderabad</div>
                    <div className="text-gray-600">Phone: 080-XXXX-XXXX</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-green-600 text-white p-6">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
                </div>
                <p className="text-sm mb-4">
                  Find quick answers to common questions about the health portal and services.
                </p>
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  View FAQ →
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Health Portal</h4>
              <p className="text-sm text-gray-400 mb-4">
                Digital health identity and comprehensive healthcare services for migrant workers across India.
              </p>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs">y</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Register Now
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Find Hospitals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Book Appointment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Download Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Emergency Services
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Ayushman Bharat
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    ESIC Benefits
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Telemedicine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Health Education
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Mental Health Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@healthportal.gov.in
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  1800-XXX-XXXX (Toll Free)
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Ministry of Health & Family Welfare
                  <br />
                  Government of India, New Delhi
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Government of India. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
