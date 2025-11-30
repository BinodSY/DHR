"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LanguageSwitcher({ language, setLanguage }) {
  return (
    <div className="flex justify-end mb-4">
      <Select onValueChange={setLanguage} value={language}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ml">മലയാളം</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
