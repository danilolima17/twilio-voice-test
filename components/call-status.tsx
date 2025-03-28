"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface CallStatusProps {
  callSid?: string
  initialStatus?: string
}

export function CallStatus({ callSid, initialStatus }: CallStatusProps) {
  const [status, setStatus] = useState(initialStatus || "inicializada")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!callSid) return

    setLoading(true)

    // In a real app, you would poll the Twilio API to get the call status
    // This is a simplified simulation
    const statusSequence = ["inicializada", "ligando", "em progresso", "completada"]
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex++
      if (currentIndex < statusSequence.length) {
        setStatus(statusSequence[currentIndex])
      } else {
        clearInterval(interval)
        setLoading(false)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [callSid])

  if (!callSid) return null

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Status da ligação:</p>
            <p className="text-xs text-muted-foreground">SID: {callSid}</p>
          </div>
          <Badge variant={status === "completed" ? "default" : "outline"} className="ml-auto">
            {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

