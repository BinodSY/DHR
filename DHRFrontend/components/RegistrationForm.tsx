"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    aadhaarNumber: "",
    otp: "",
    dateOfBirth: "",
    currentAddress: "",
    originalAddress: "",
    gender: "",
    workplace: "",
    emergencyContact: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [otpSent, setOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [otpVerified, setOtpVerified] = useState(false)

  // Calculate minimum date for 18+ years old
  const getMinDate = () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    return minDate.toISOString().split('T')[0]
  }

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [countdown])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\+?[0-9\s\-()]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format"
    }

    if (!formData.aadhaarNumber.trim()) {
      newErrors.aadhaarNumber = "Aadhaar number is required"
    } else if (!/^\d{4}-\d{4}-\d{4}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Invalid format. Use XXXX-XXXX-XXXX"
    }

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP verification is required"
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = "OTP must be 6 digits"
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    } else {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      if (age < 18) {
        newErrors.dateOfBirth = "You must be 18 years or older to register"
      }
    }

    if (!formData.currentAddress.trim()) {
      newErrors.currentAddress = "Current address is required"
    }

    if (!formData.originalAddress.trim()) {
      newErrors.originalAddress = "Original address is required"
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required"
    }

    if (!formData.workplace.trim()) {
      newErrors.workplace = "Workplace is required"
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact is required"
    } else if (!/^\+?[0-9\s\-()]{10,}$/.test(formData.emergencyContact)) {
      newErrors.emergencyContact = "Invalid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }))
    if (errors.gender) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.gender
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpVerified) {
      setErrors(prev => ({ ...prev, otp: "Please verify your OTP first" }))
      return
    }
    if (validateForm()) {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        registeredAt: new Date().toISOString(),
        userType: 'worker' // Default to worker
      }

      // Add to users array
      existingUsers.push(newUser)

      // Save to localStorage (simulating JSON file)
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))

      console.log("User registered:", newUser)

      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        aadhaarNumber: "",
        otp: "",
        dateOfBirth: "",
        currentAddress: "",
        originalAddress: "",
        gender: "",
        workplace: "",
        emergencyContact: "",
      })

      // Reset OTP states
      setOtpSent(false)
      setCountdown(0)
      setOtpVerified(false)

      // Redirect to login page
      router.push("/login")
    }
  }

  return (
    <Card className="w-full max-w-md bg-white shadow-lg border-0">
      <div className="p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Create Your Account</h1>
          </div>

          <div className="bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 mb-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Government Secured & Verified
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              Full Name
            </label>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`border ${errors.fullName ? "border-red-500" : "border-slate-200"} placeholder:text-slate-400`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.26.559.676 1.06 1.196 1.413.52.353 1.053.56 1.573.56.52 0 1.053-.207 1.573-.56.52-.353.936-.854 1.196-1.413l1.548.773a1 1 0 01-.54 1.06l.74 4.435a1 1 0 01-.986.836H4a1 1 0 01-1-1V3z" />
              </svg>
              Phone Number
            </label>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="+91 XXXXX-XXXXX"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`border ${errors.phoneNumber ? "border-red-500" : "border-slate-200"} placeholder:text-slate-400`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Aadhaar Number */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              Aadhaar Number
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <Input
              type="text"
              name="aadhaarNumber"
              placeholder="XXXX-XXXX-XXXX"
              value={formData.aadhaarNumber}
              onChange={handleInputChange}
              className={`border ${
                errors.aadhaarNumber ? "border-red-500" : "border-slate-200"
              } placeholder:text-slate-400`}
            />
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 5.414l-3.293 3.293a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Your data is encrypted and secure
            </p>
            {errors.aadhaarNumber && <p className="text-red-500 text-xs mt-1">{errors.aadhaarNumber}</p>}
          </div>

          {/* OTP Verification */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              OTP Verification
              <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={formData.otp || ""}
                onChange={handleInputChange}
                className={`flex-1 border ${errors.otp ? "border-red-500" : "border-slate-200"} placeholder:text-slate-400`}
                maxLength={6}
                disabled={!otpSent}
              />
              <Button
                type="button"
                variant="outline"
                className="px-4 py-2 h-11 whitespace-nowrap transition-all-smooth hover:bg-blue-50 hover:border-blue-300"
                disabled={countdown > 0}
                onClick={() => {
                  if (!formData.aadhaarNumber) {
                    setErrors(prev => ({ ...prev, otp: "Please enter Aadhaar number first" }))
                    return
                  }
                  // Simulate OTP sending
                  alert("OTP sent to your registered mobile number")
                  setOtpSent(true)
                  setCountdown(300) // 5 minutes = 300 seconds
                  setErrors(prev => ({ ...prev, otp: "" }))
                }}
              >
                {countdown > 0 ? `${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}` : "Send OTP"}
              </Button>
            </div>

            {otpSent && (
              <div className="mb-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-green-50 border-green-300 text-green-700 hover:bg-green-100 transition-all-smooth"
                  onClick={() => {
                    if (!formData.otp.trim()) {
                      setErrors(prev => ({ ...prev, otp: "Please enter OTP first" }))
                      return
                    }
                    if (!/^\d{6}$/.test(formData.otp)) {
                      setErrors(prev => ({ ...prev, otp: "OTP must be 6 digits" }))
                      return
                    }
                    // Simulate OTP verification
                    setOtpVerified(true)
                    setErrors(prev => ({ ...prev, otp: "" }))
                    alert("OTP verified successfully!")
                  }}
                  disabled={otpVerified}
                >
                  {otpVerified ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      OTP Verified
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </div>
            )}

            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {otpSent ? "OTP sent to your registered mobile number" : "OTP will be sent to your registered mobile number"}
            </p>
            {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012-2h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Date of Birth
            </label>
            <div className="relative">
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                max={getMinDate()}
                className={`border ${errors.dateOfBirth ? "border-red-500" : "border-slate-200"}`}
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012-2h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              You must be 18 years or older to register
            </p>
            {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
          </div>

          {/* Current Address */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
              </svg>
              Current Address
            </label>
            <Input
              type="text"
              name="currentAddress"
              placeholder="Enter your current residential address"
              value={formData.currentAddress}
              onChange={handleInputChange}
              className={`border ${
                errors.currentAddress ? "border-red-500" : "border-slate-200"
              } placeholder:text-slate-400`}
            />
            {errors.currentAddress && <p className="text-red-500 text-xs mt-1">{errors.currentAddress}</p>}
          </div>

          {/* Original Address */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Original Address
            </label>
            <Input
              type="text"
              name="originalAddress"
              placeholder="Enter your permanent/hometown address"
              value={formData.originalAddress}
              onChange={handleInputChange}
              className={`border ${
                errors.originalAddress ? "border-red-500" : "border-slate-200"
              } placeholder:text-slate-400`}
            />
            {errors.originalAddress && <p className="text-red-500 text-xs mt-1">{errors.originalAddress}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM16 11a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              Gender
            </label>
            <Select value={formData.gender} onValueChange={handleSelectChange}>
              <SelectTrigger
                className={`border ${errors.gender ? "border-red-500" : "border-slate-200"} text-slate-500`}
              >
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Workplace */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
              Workplace
            </label>
            <Input
              type="text"
              name="workplace"
              placeholder="Enter your current workplace"
              value={formData.workplace}
              onChange={handleInputChange}
              className={`border ${
                errors.workplace ? "border-red-500" : "border-slate-200"
              } placeholder:text-slate-400`}
            />
            {errors.workplace && <p className="text-red-500 text-xs mt-1">{errors.workplace}</p>}
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.26.559.676 1.06 1.196 1.413.52.353 1.053.56 1.573.56.52 0 1.053-.207 1.573-.56.52-.353.936-.854 1.196-1.413l1.548.773a1 1 0 01-.54 1.06l.74 4.435a1 1 0 01-.986.836H4a1 1 0 01-1-1V3z" />
              </svg>
              Emergency Contact Number
            </label>
            <Input
              type="tel"
              name="emergencyContact"
              placeholder="+91 XXXXX-XXXXX"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              className={`border ${
                errors.emergencyContact ? "border-red-500" : "border-slate-200"
              } placeholder:text-slate-400`}
            />
            {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Register Now
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Login
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 112 0v-3a1 1 0 10-2 0v3z" />
            </svg>
            Authorised by Government of India Health Ministry
          </p>
        </div>
      </div>
    </Card>
  )
}