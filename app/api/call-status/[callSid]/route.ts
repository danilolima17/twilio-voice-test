import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { callSid: string } }) {
  try {
    const { callSid } = params

    if (!callSid) {
      return NextResponse.json({ error: "Call SID is required" }, { status: 400 })
    }

    // Check if environment variables are defined
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      return NextResponse.json({ error: "Twilio credentials are not properly configured" }, { status: 500 })
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN

    // Create the auth header
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64")

    // Make the API request
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls/${callSid}.json`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    })

    // Parse the response
    const data = await response.json()

    if (!response.ok) {
      console.error("Twilio API error:", data)
      return NextResponse.json({ error: data.message || "Failed to fetch call status" }, { status: response.status })
    }

    return NextResponse.json({
      status: data.status,
      duration: data.duration,
      direction: data.direction,
      from: data.from,
      to: data.to,
      startTime: data.start_time,
      endTime: data.end_time,
    })
  } catch (error) {
    console.error("Error fetching call status:", error)
    return NextResponse.json({ error: "Failed to fetch call status" }, { status: 500 })
  }
}

