"use client"

import { useState } from "react"
import { makeCall } from "@/app/actions/make-call"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"
import { CallStatus } from "./call-status"

export function CallForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [callSid, setCallSid] = useState<string | undefined>()
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)
    setError(null)

    try {
      const result = await makeCall(formData)

      if (result.success) {
        setMessage(result.message)
        setCallSid(result.callSid)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Failed to make call. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
       
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phoneNumber">Número</Label>
              <Input id="phoneNumber" name="phoneNumber" placeholder="+1234567890" required />
           
            </div>

            {message && <div className="p-3 rounded-md bg-green-50 text-green-800 text-sm">{message}</div>}

            {error && <div className="p-3 rounded-md bg-red-50 text-red-800 text-sm">{error}</div>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Phone className="mr-2 h-4 w-4 animate-pulse" />
                Ligando...
              </>
            ) : (
              <>
              
                Ligar
              </>
            )}
          </Button>
        </CardFooter>
      </form>

      {callSid && <CallStatus callSid={callSid} />}
    </Card>
  )
}

