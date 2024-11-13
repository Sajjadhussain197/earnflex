"use client"

import * as React from "react"
import {
  ChevronDown,
  LayoutDashboard,
  Users,
  Shield,
  HardHat,
  Building2,
  Car,
  HeartPulse,
  UserCog,
  Search,
  UserCircle,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface NavItem {
  icon: React.ElementType
  label: string
  count?: number
}

const workerCategories: NavItem[] = [
  { icon: Users, label: "All", count: 3471 },
  { icon: UserCircle, label: "Care", count: 276 },
  { icon: Shield, label: "Security", count: 741 },
  { icon: HardHat, label: "Construction", count: 884 },
  { icon: Building2, label: "Cleaning", count: 520 },
  { icon: Car, label: "Aviation", count: 171 },
  { icon: HeartPulse, label: "Hospitality", count: 195 },
  { icon: UserCog, label: "Technical", count: 23 },
]

export default function Component() {
  const [isWorkersOpen, setIsWorkersOpen] = React.useState(true)

  return (
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-emerald-600 to-emerald-400">
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-start p-4">
        <div className="flex h-8 w-24 items-center justify-center rounded-md bg-black/80">
          <div className="flex gap-0.5">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <div className="h-2 w-2 rounded-full bg-red-500" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>

        <Collapsible
          open={isWorkersOpen}
          onOpenChange={setIsWorkersOpen}
          className="space-y-1"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-white hover:bg-white/10",
                isWorkersOpen && "bg-white/10"
              )}
            >
              <Users className="mr-2 h-4 w-4" />
              Workers
              <ChevronDown
                className={cn(
                  "ml-auto h-4 w-4 transition-transform",
                  isWorkersOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {workerCategories.map((category) => (
              <Button
                key={category.label}
                variant="ghost"
                className="ml-4 w-[calc(100%-1rem)] justify-start text-sm text-white hover:bg-white/10"
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.label}
                <span className="ml-auto text-xs">({category.count})</span>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
        >
          <Search className="mr-2 h-4 w-4" />
          Compliance Anomalies
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
        >
          <UserCircle className="mr-2 h-4 w-4" />
          Service Partners
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>

      {/* Footer */}
      <div className="p-4 text-center text-xs text-white/80">
        <p>Powered by EarnFlex</p>
        <p>Version 1.0.2</p>
      </div>
    </div>
  )
}