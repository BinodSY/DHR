"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { 
  Search, 
  Filter, 
  Heart, 
  Users, 
  Shield, 
  Stethoscope, 
  UserCheck, 
  Baby, 
  Activity,
  ArrowRight,
  X,
  LayoutGrid
} from "lucide-react"

// --- Types & Data ---

interface Scheme {
  id: number
  name: string
  description: string
  tags: string[]
  category: string
}

const healthSchemes: Scheme[] = [
  {
    id: 1,
    name: "Ayushman Bharat – PM-JAY",
    description: "Provides free health insurance up to ₹5 lakh per family for serious illnesses and hospitalisation. Covers poor families, migrant workers, unorganized workers, and low-income groups.",
    tags: ["india", "kerala", "migrant", "worker", "low-income", "hospital", "health-insurance"],
    category: "Health Insurance"
  },
  {
    id: 2,
    name: "Karunya Health Scheme (Kerala)",
    description: "Kerala government program offering financial assistance for major surgeries and treatments in empanelled hospitals. Useful for low-income families and chronic patients.",
    tags: ["kerala", "low-income", "serious-illness", "surgery", "worker"],
    category: "State Health"
  },
  {
    id: 3,
    name: "Aardram Mission – Kerala Health Reform",
    description: "Upgrades government hospitals to provide faster OP services, lab tests, and better emergency care. Free and open to all residents.",
    tags: ["kerala", "all", "hospital", "primary-care"],
    category: "Health Reform"
  },
  {
    id: 4,
    name: "E-Health Kerala",
    description: "Digital health card system allowing online registration, appointments, and access to medical records. Useful for all residents, including migrant workers.",
    tags: ["kerala", "digital", "all", "migrant", "worker", "health-records"],
    category: "Digital Health"
  },
  {
    id: 5,
    name: "Janani Suraksha Yojana (JSY)",
    description: "Cash assistance for pregnant women to promote safe institutional deliveries. Supports low-income and rural women.",
    tags: ["india", "kerala", "women", "pregnant", "mother", "delivery"],
    category: "Maternal Health"
  },
  {
    id: 6,
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    description: "Provides financial support of ₹5,000 for first-time pregnant mothers for nutrition and care. Available for women across India.",
    tags: ["india", "kerala", "women", "pregnant", "mother", "nutrition"],
    category: "Maternal Health"
  },
  {
    id: 7,
    name: "Rashtriya Swasthya Bima Yojana (RSBY)",
    description: "Health insurance for unorganized workers and BPL families, covering hospitalization expenses. Particularly beneficial for migrant and daily wage workers.",
    tags: ["india", "migrant", "worker", "daily-wage", "low-income", "insurance"],
    category: "Health Insurance"
  },
  {
    id: 8,
    name: "Kerala Migrant Workers Welfare Scheme",
    description: "Kerala's welfare program offering health assistance, accident coverage, and emergency support for interstate migrant workers. Designed specifically for migrant labor in Kerala.",
    tags: ["kerala", "migrant", "worker", "labour", "health-support"],
    category: "Worker Welfare"
  },
  {
    id: 9,
    name: "CHIS – Comprehensive Health Insurance Scheme",
    description: "Provides cashless treatment at major hospitals for low-income families with a Kerala ration card. Part of the state's health insurance initiative.",
    tags: ["kerala", "insurance", "low-income", "hospital", "worker"],
    category: "Health Insurance"
  },
  {
    id: 10,
    name: "National Tuberculosis Eradication Program",
    description: "Free TB diagnosis, medication, and nutrition support. Available for all residents, including migrant workers.",
    tags: ["india", "kerala", "all", "tb", "migrant", "worker", "free-treatment"],
    category: "Disease Control"
  }
]

export default function BenefitsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ageFilter, setAgeFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")
  const [workerTypeFilter, setWorkerTypeFilter] = useState("all")

  // --- Logic ---

  const filteredSchemes = useMemo(() => {
    return healthSchemes.filter(scheme => {
      const term = searchTerm.toLowerCase()
      const searchMatch = term === "" ||
        scheme.name.toLowerCase().includes(term) ||
        scheme.description.toLowerCase().includes(term) ||
        scheme.tags.some(tag => tag.toLowerCase().includes(term))

      const ageMatch = ageFilter === "all" || scheme.tags.includes(ageFilter)
      const genderMatch = genderFilter === "all" || scheme.tags.includes(genderFilter)
      const stateMatch = stateFilter === "all" || scheme.tags.includes(stateFilter)
      const workerTypeMatch = workerTypeFilter === "all" || scheme.tags.includes(workerTypeFilter)

      return searchMatch && ageMatch && genderMatch && stateMatch && workerTypeMatch
    })
  }, [searchTerm, ageFilter, genderFilter, stateFilter, workerTypeFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setAgeFilter("all")
    setGenderFilter("all")
    setStateFilter("all")
    setWorkerTypeFilter("all")
  }

  const hasActiveFilters = searchTerm !== "" || ageFilter !== "all" || genderFilter !== "all" || stateFilter !== "all" || workerTypeFilter !== "all"

  // --- UI Helpers ---

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Health Insurance": return <Shield className="w-5 h-5" />
      case "State Health": return <Activity className="w-5 h-5" />
      case "Health Reform": return <Stethoscope className="w-5 h-5" />
      case "Digital Health": return <UserCheck className="w-5 h-5" />
      case "Maternal Health": return <Baby className="w-5 h-5" />
      case "Worker Welfare": return <Users className="w-5 h-5" />
      case "Disease Control": return <Heart className="w-5 h-5" />
      default: return <Heart className="w-5 h-5" />
    }
  }

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-gray-50 font-sans">
       
      {/* --- HERO SECTION --- */}
      <div
        className="relative overflow-hidden bg-gradient-to-r from-[#6558FF]/90 to-[#008afb]/90 pt-16 pb-24 lg:pt-24 lg:pb-32"
        style={{
          backgroundImage: `url('/benefits.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-1/2 left-10 w-64 h-64 rounded-full bg-[#FF6727] blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm px-4 py-1.5 text-sm">
            Government Health Initiatives
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Find the Right <span className="text-[#FF6727] bg-white px-2 rounded-md transform -skew-x-6 inline-block">Support</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover health insurance, welfare schemes, and medical support programs tailored to your profile.
          </p>

          {/* Floating Search Bar */}
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="bg-white p-2 rounded-2xl shadow-2xl flex items-center gap-2 transform transition-all hover:scale-[1.01]">
              <div className="pl-4 text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <Input
                placeholder="Search by keyword (e.g., 'migrant', 'pregnant', 'insurance')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none shadow-none text-lg h-14 focus-visible:ring-0 text-gray-700 placeholder:text-gray-400"
              />
              <Button className="h-12 px-8 rounded-xl bg-[#6558FF] hover:bg-[#5346d6] text-white font-semibold shadow-lg hidden sm:flex">
                Search
              </Button>
            </div>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="text-blue-100 text-sm font-medium mr-1 my-auto">Popular:</span>
            {["Migrant Worker", "Pregnant Women", "BPL Family", "Kerala", "Tuberculosis"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
        
        {/* Filters Panel */}
        <Card className="shadow-xl border-none mb-10 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#6558FF] via-[#008afb] to-[#FF6727]"></div>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-2 text-gray-800">
                <div className="p-2 bg-blue-50 rounded-lg text-[#6558FF]">
                  <Filter className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Filter Schemes</h3>
              </div>
              
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 h-9 px-3 text-sm"
                >
                  <X className="w-4 h-4 mr-1.5" /> Clear Filters
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FilterSelect label="Age Group" value={ageFilter} onChange={setAgeFilter} 
                options={[
                  {val: "18+", label: "18+"}, {val: "adult", label: "Adult"}, 
                  {val: "senior", label: "Senior"}, {val: "child", label: "Child"}
                ]} 
              />
              <FilterSelect label="Gender" value={genderFilter} onChange={setGenderFilter} 
                options={[
                  {val: "men", label: "Men"}, {val: "women", label: "Women"}, 
                  {val: "pregnant", label: "Pregnant / Mother"}
                ]} 
              />
              <FilterSelect label="Region" value={stateFilter} onChange={setStateFilter} 
                options={[
                  {val: "india", label: "All India"}, {val: "kerala", label: "Kerala Only"}
                ]} 
              />
              <FilterSelect label="Worker Type" value={workerTypeFilter} onChange={setWorkerTypeFilter} 
                options={[
                  {val: "migrant", label: "Migrant Worker"}, {val: "daily-wage", label: "Daily Wage"}, 
                  {val: "unorganized", label: "Unorganized Sector"}
                ]} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <LayoutGrid className="text-gray-400 w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-800">Available Schemes</h2>
          </div>
          <Badge variant="secondary" className="px-3 py-1 bg-blue-100 text-[#6558FF] font-bold">
            {filteredSchemes.length} Results
          </Badge>
        </div>

        {/* --- RESULTS GRID --- */}
        {filteredSchemes.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No schemes found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We couldn't find any schemes matching your current filters. Try removing some filters or searching for a general term.
            </p>
            <Button onClick={clearFilters} className="bg-[#6558FF] hover:bg-[#5346d6]">
              View All Schemes
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <Card 
                key={scheme.id} 
                className="group flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Card Header with Category Color Coding */}
                <div className="relative h-1.5 w-full bg-gradient-to-r from-[#6558FF] to-[#008afb]"></div>
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <Badge className="mb-3 bg-blue-50 text-[#6558FF] hover:bg-blue-100 border-none font-semibold px-2.5 py-1">
                        {scheme.category}
                      </Badge>
                      <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-[#6558FF] transition-colors">
                        {scheme.name}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#008afb] shrink-0 group-hover:bg-[#008afb] group-hover:text-white transition-colors duration-300">
                      {getCategoryIcon(scheme.category)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {scheme.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {scheme.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-[11px] font-medium px-2 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-gray-50 bg-gray-50/30">
                  <Button className="w-full bg-white border-2 border-[#FF6727] text-[#FF6727] hover:bg-[#FF6727] hover:text-white font-semibold transition-all group-hover:shadow-md">
                    Check Eligibility <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// --- Sub-component for Filters to keep code clean ---
function FilterSelect({ label, value, onChange, options }: { 
  label: string, 
  value: string, 
  onChange: (val: string) => void,
  options: {val: string, label: string}[] 
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block ml-1">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-gray-50 border-gray-200 focus:ring-[#6558FF] h-11">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any {label}</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt.val} value={opt.val}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}