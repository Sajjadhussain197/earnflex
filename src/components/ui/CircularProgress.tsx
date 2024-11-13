"use client"

import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export default function ProgressCircle({ value = 56 }: { value?: number }) {
  const data = [
    { name: "Progress", value: value },
    { name: "Remaining", value: 100 - value }
  ]

  return (
    
    <ChartContainer className="h-14 w-14" config={{ /* your config here */ }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            // label={({ value }) => `${value}%`}
          >
            <Cell fill="purple" />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* <span className="text-2xl font-bold">{value}%</span> */}
      </div>
    </ChartContainer>
  )
}