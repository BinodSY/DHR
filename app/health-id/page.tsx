"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, User, Syringe, Pill, Calendar, FileText, TestTube, Activity } from "lucide-react"
import { apiService } from "@/api/api"

export default function HealthID() {
  const [healthId, setHealthId] = useState<string>("HID87654321")
  const [cardData, setCardData] = useState<any>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("healthCard")
    if (storedData) {
      const parsed = JSON.parse(storedData)
      const today = new Date()
      //uncomment this and remove hardcoded date after testing
      //const validUntil = new Date(parsed.validUntil)
      //hardcoded date for testing expiry
      const validUntil = new Date("2020-09-15T00:00:00Z");


      if (today <= validUntil) {
        setCardData(parsed)
      } else {
        localStorage.removeItem("healthCard") // expired
      }
    }
  }, [])

  // Handle Generate Card button
    const handleGenerateCard = async () => {
    try {
      const data = await apiService.getHealthIdCard(healthId)
      if (!data) throw new Error("API not available")
  
      localStorage.setItem("healthCard", JSON.stringify(data))
      setCardData(data)
    } catch (err) {
      console.warn("Using temporary mock data:", err)

      // Temporary mock data (simulate response)
      const tempData = {
        name: "Priya Sharma",
        age: 28,
        gender: "Female",
        location: "Mumbai, Maharashtra",
        healthId: "91-2847-5639",
        validUntil: "2029-12-31",
        photoUrl: "/professional-woman-doctor.png",
        qrCodeUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Lion_%28Panthera_leo%29_male_6y.jpg/1707px-Lion_%28Panthera_leo%29_male_6y.jpg"
      }

      localStorage.setItem("healthCard", JSON.stringify(tempData))
      setCardData(tempData)
    }
  }


  return (
    <div className="w-full min-h-screen">
      {/* Section */}
      <div className="bg-gray-50 p-8 text-center w-full">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Digital Health Identity Card</h1>
          <p className="text-gray-600">
            Official government-issued digital health ID card with secure verification and comprehensive health
            information
          </p>
        </div>

        {/* If card exists → show it, else show button */}
        {!cardData ? (
          <Button onClick={handleGenerateCard} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg">
            Show Health Card
          </Button>
        ) : (
          <div className="flex justify-center w-full">
            <div className="w-full px-4">
              <Card className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-white border-0 shadow-2xl overflow-hidden relative">
                <CardContent className="p-8 relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-left">
                      <h2 className="font-bold text-lg uppercase tracking-wide">GOVERNMENT OF INDIA</h2>
                      <p className="text-xl font-semibold">Digital Health ID Card</p>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 px-3 py-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>

                  {/* Profile Section */}
                  <div className="flex items-start justify-between gap-8">
                    {/* Left side - Profile info */}
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-white p-1">
                          <img
                            src={cardData.photo_url}
                            alt={cardData.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>

                      <div className="text-left">
                        <h1 className="text-2xl font-bold mb-4">{cardData.name}</h1>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{cardData.age} Years</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>♀</span>
                            <span>{cardData.gender}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>📍</span>
                            <span>{cardData["origin-state"]}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center - Health ID Number */}
                    <div className="text-center">
                      <p className="text-sm opacity-90 mb-2 uppercase tracking-wide">HEALTH ID NUMBER</p>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-2xl font-bold tracking-wider">{cardData.health_id}</p>
                      </div>
                    </div>

                    {/* Right side - QR Code */}
                    <div className="text-center">
                      <img src={cardData.qrCodeUrl} alt="QR Code" className="w-20 h-20 " />
                      <p className="text-xs opacity-90">Scan for Records</p>
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Valid Until: {cardData.validUntil}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">Blockchain Secured</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
