"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, User, Stethoscope, Building } from "lucide-react"

export default function LoginPage() {
  const [activeUserType, setActiveUserType] = useState<"worker" | "doctor" | "govt">("worker")
  const [authMethod, setAuthMethod] = useState<"password" | "otp">("password")
  const [loginError, setLoginError] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    if (activeUserType === "worker") {
      // For worker login, check against registered users
      const workerAuth = (document.querySelector('input[name="workerAuth"]') as HTMLInputElement)?.value
      const workerPassword = (document.querySelector('input[name="workerPassword"]') as HTMLInputElement)?.value
      if (!workerAuth) {
        setLoginError("Please enter your mobile number or Aadhaar number")
        return
      }
      if (!workerPassword) {
        setLoginError("Please enter your password")
        return
      }
      if (workerPassword !== "12345") {
        setLoginError("Invalid password")
        return
      }

      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const user = registeredUsers.find((u: any) =>
        u.phoneNumber === workerAuth || u.aadhaarNumber === workerAuth
      )

      if (user) {
        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user))
        setLoginError("")
        router.push("/dashboard/worker")
      } else {
        setLoginError("User not found. Please register first.")
      }
    } else if (activeUserType === "govt") {
      router.push("/dashboard/govt")
    } else if (activeUserType === "doctor") {
      router.push("/dashboard/doctor")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg border-0">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Login to Your Account</h1>
            </div>
            <div className="bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Government Secured & Verified
            </div>
          </div>

          {/* User Type Selector */}
          <div className="flex mb-6 overflow-x-auto">
            <Button
              className={`flex-1 min-w-[100px] rounded-r-none text-xs sm:text-sm ${activeUserType === "worker" ? "bg-blue-800 text-white" : "bg-transparent border border-gray-300 text-gray-700"}`}
              onClick={() => {
                setActiveUserType("worker")
                setLoginError("")
              }}
            >
              <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Worker
            </Button>
            <Button
              className={`flex-1 min-w-[100px] rounded-none border-l-0 text-xs sm:text-sm ${activeUserType === "doctor" ? "bg-blue-800 text-white" : "bg-transparent border border-gray-300 text-gray-700"}`}
              onClick={() => setActiveUserType("doctor")}
            >
              <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Doctor
            </Button>
            <Button
              className={`flex-1 min-w-[100px] rounded-l-none border-l-0 text-xs sm:text-sm ${activeUserType === "govt" ? "bg-blue-800 text-white" : "bg-transparent border border-gray-300 text-gray-700"}`}
              onClick={() => setActiveUserType("govt")}
            >
              <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Govt
            </Button>
          </div>

          <div className="space-y-4">
            {/* Login Form Fields */}
            {activeUserType === "worker" && (
              <>
                <div>
                  <Label htmlFor="workerAuth" className="text-sm font-medium">
                    Mobile Number / Aadhaar Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="workerAuth"
                    name="workerAuth"
                    placeholder="Enter mobile number or Aadhaar number"
                    className="mt-1 h-11 transition-all-smooth focus:border-blue-500"
                    onChange={() => setLoginError("")}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={authMethod === "otp" ? "default" : "outline"}
                    size="sm"
                    className="flex-1 text-sm h-9 transition-all-smooth"
                    onClick={() => setAuthMethod("otp")}
                  >
                    Login with OTP
                  </Button>
                  <Button
                    variant={authMethod === "password" ? "default" : "outline"}
                    size="sm"
                    className="flex-1 text-sm h-9 transition-all-smooth"
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
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit OTP"
                        className="flex-1 h-11 transition-all-smooth focus:border-blue-500"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-11 whitespace-nowrap transition-all-smooth"
                      >
                        Send OTP
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="workerPassword" className="text-sm font-medium">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="workerPassword"
                      name="workerPassword"
                      type="password"
                      placeholder="Enter your password"
                      className="mt-1 h-11 transition-all-smooth focus:border-blue-500"
                    />
                  </div>
                )}

                {loginError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-600 text-sm">{loginError}</p>
                  </div>
                )}
              </>
            )}

            {/* Other user type forms */}
            {activeUserType === "doctor" && (
              <>
                <div>
                  <Label htmlFor="doctorId" className="text-sm font-medium">
                    Doctor ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="doctorId"
                    placeholder="Enter your Doctor ID"
                    className="mt-1 h-11 transition-all-smooth focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="doctorPassword" className="text-sm font-medium">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="doctorPassword"
                    type="password"
                    placeholder="Enter your password"
                    className="mt-1 h-11 transition-all-smooth focus:border-blue-500"
                  />
                </div>
              </>
            )}

            {activeUserType === "govt" && (
              <>
                <div>
                  <Label htmlFor="govtEmail" className="text-sm font-medium">
                    Official Government Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="govtEmail"
                    type="email"
                    placeholder="yourname@kerala.gov.in"
                    className="mt-1 h-11 transition-all-smooth focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="govtPassword" className="text-sm font-medium">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="govtPassword"
                    type="password"
                    placeholder="Enter your password"
                    className="mt-1 h-11 transition-all-smooth focus:border-blue-500"
                  />
                </div>
              </>
            )}

            {/* CAPTCHA */}
            <div>
              <Label htmlFor="captcha" className="text-sm font-medium">
                Security Code (CAPTCHA) <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 mt-1">
                <div className="bg-gray-100 px-3 py-2 rounded border font-mono text-sm flex-1 flex items-center justify-center">7K9P2X</div>
                <Button variant="outline" size="sm" className="h-11 transition-all-smooth">
                  🔄
                </Button>
              </div>
              <Input
                id="captcha"
                placeholder="Enter the code above"
                className="mt-2 h-11 transition-all-smooth focus:border-blue-500"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
              <div className="ml-auto">
                <a href="#" className="text-blue-600 text-sm hover:underline transition-all-smooth">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base transition-all-smooth hover:scale-[1.02] hover:shadow-lg"
              onClick={handleLogin}
            >
              <Shield className="h-4 w-4 mr-2" />
              सुरक्षित प्रवेश / Secure Login
            </Button>

            {/* Registration Link */}
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline transition-all-smooth">
                Register Now
              </a>
            </div>

            {/* Terms */}
            <div className="text-xs text-gray-500 text-center">
              By logging in, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline transition-all-smooth">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline transition-all-smooth">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}