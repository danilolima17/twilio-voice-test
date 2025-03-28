"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CallRecord {
  id: string
  phoneNumber: string
  timestamp: string
  status: string
}

export function CallHistory() {
  const [calls, setCalls] = useState<CallRecord[]>([])

  useEffect(() => {
    // In a real app, you would fetch call history from your database
    // This is just a mock implementation
    const mockCalls: CallRecord[] = [
      {
        id: "CA1234567890abcdef",
        phoneNumber: "+1234567890",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: "completed",
      },
      {
        id: "CA0987654321fedcba",
        phoneNumber: "+10987654321",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        status: "failed",
      },
    ]

    setCalls(mockCalls)
  }, [])

  if (calls.length === 0) return null

  return (
    <Card className="w-full max-w-md mt-6">
      <CardHeader>
        <CardTitle>Recent Calls</CardTitle>
        <CardDescription>Your recent call history</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {calls.map((call) => (
            <div key={call.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <p className="font-medium">{call.phoneNumber}</p>
                <p className="text-xs text-muted-foreground">{new Date(call.timestamp).toLocaleString()}</p>
              </div>
              <Badge variant={call.status === "completed" ? "default" : "destructive"}>{call.status}</Badge>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

