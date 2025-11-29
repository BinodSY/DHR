"use client"

import { useState, useEffect } from "react"
import { Mic, Phone, PhoneOff, Volume2, Settings, Play, Pause } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function VoiceTalkPage() {
  const [isRecording, setIsRecording] = useState(true)
  const [callDuration, setCallDuration] = useState(154) // 2:34 in seconds
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRecording) {
        setCallDuration((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Security Banner */}
      <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Secure Government Health Service</h3>
              <p className="text-sm text-green-700">End-to-End Encrypted • Doctor Verified • Multilingual Support</p>
            </div>
          </div>
          <Badge className="bg-green-500 text-white">Protected</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* Doctor Information */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <h3 className="font-semibold text-gray-900">Doctor Information</h3>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/professional-woman-doctor.png"
                    alt="Dr. Priya Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dr. Priya Sharma</h4>
                  <p className="text-sm text-gray-600">General Medicine Specialist</p>
                  <p className="text-xs text-gray-500">AIIMS New Delhi</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Available Now</span>
                <span className="text-xs text-gray-500 ml-auto">Response time: 2-3 min</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Languages:</span>
                  <span className="text-gray-900">Hindi, English, Bengali</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="text-gray-900">12 Years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                    <span className="text-gray-900">(4.9)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Card */}
          <Card className="bg-red-500 text-white">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Medical Emergency?</h3>
              <p className="text-sm mb-4 text-red-100">For immediate medical assistance</p>
              <Button className="w-full bg-white text-red-500 hover:bg-red-50">
                <Phone className="w-4 h-4 mr-2" />
                Call 108 Ambulance
              </Button>
            </CardContent>
          </Card>

          {/* Voice Settings */}
          <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Voice Settings</span>
          </div>
        </div>

        {/* Voice Communication Center */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Voice Communication</h2>
              <p className="text-gray-600 mb-8">Speak in your language, doctor will receive translation</p>

              {/* Audio Visualization */}
              <div className="mb-8">
                <div className="flex items-end justify-center gap-1 mb-4">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 rounded-full transition-all duration-300 ${
                        isRecording ? `bg-blue-500 animate-pulse` : "bg-gray-300"
                      }`}
                      style={{
                        height: `${Math.random() * 40 + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Microphone Button */}
                <div className="relative">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording ? "bg-blue-100 ring-4 ring-blue-200 ring-opacity-50" : "bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isRecording ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    >
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                  )}
                </div>
              </div>

              {/* Call Duration */}
              <div className="text-2xl font-mono font-bold text-gray-900 mb-6">00:{formatTime(callDuration)}</div>
              <p className="text-sm text-gray-600 mb-8">Call Duration</p>

              {/* Control Buttons */}
              <div className="flex items-center gap-4 mb-6">
                <Button size="lg" className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600">
                  <Phone className="w-6 h-6" />
                </Button>
                <Button
                  size="lg"
                  className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600"
                  onClick={() => setIsRecording(false)}
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
                <Button size="lg" className="w-14 h-14 rounded-full bg-gray-500 hover:bg-gray-600">
                  <Volume2 className="w-6 h-6" />
                </Button>
              </div>

              {isRecording && (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Recording...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Doctor Response Card */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h3 className="font-semibold text-yellow-800">Doctor Will Respond Shortly</h3>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                Your message has been received and translated. Dr. Sharma will respond within 2-3 minutes.
              </p>
              <div className="flex items-center gap-2 text-yellow-600">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-xs">Waiting for response...</span>
              </div>
            </CardContent>
          </Card>

          {/* Conversation History */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Conversation History</h3>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  Clear All
                </Button>
              </div>

              <div className="space-y-3">
                {/* User Message */}
                <div className="bg-blue-500 text-white p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </Button>
                    <div className="flex-1 bg-white/20 rounded-full h-1">
                      <div className="bg-white h-1 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-xs">0:45</span>
                  </div>
                  <p className="text-sm mb-2">मुझे सिर में दर्द हो रहा है और बुखार भी है।</p>
                  <p className="text-xs text-blue-100">Translation: I have a headache and fever.</p>
                  <p className="text-xs text-blue-200 mt-1">2:34 PM • You</p>
                </div>

                {/* Doctor Response */}
                <div className="bg-green-500 text-white p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Button size="sm" variant="ghost" className="w-6 h-6 p-0 text-white hover:bg-white/20">
                      <Play className="w-3 h-3" />
                    </Button>
                    <div className="flex-1 bg-white/20 rounded-full h-1">
                      <div className="bg-white h-1 rounded-full w-2/3"></div>
                    </div>
                    <span className="text-xs">1:20</span>
                  </div>
                  <p className="text-sm mb-2">Take paracetamol 500mg twice daily and drink plenty of water.</p>
                  <p className="text-xs text-green-100">
                    Hindi: प्रैरासिटामोल 500 मिलीग्राम दिन में दो बार लें और खूब पानी पिएं।
                  </p>
                  <p className="text-xs text-green-200 mt-1">2:36 PM • Dr. Sharma</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
