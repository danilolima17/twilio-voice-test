"use server"

export async function makeCall(formData: FormData) {
  try {
    const phoneNumber = formData.get("phoneNumber") as string

    if (!phoneNumber) {
      return { success: false, message: "Phone number is required" }
    }

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      return {
        success: false,
        message: "Twilio credentials are not properly configured",
      }
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_PHONE_NUMBER

 
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64")


    const serverTwiMLUrl = "https://twilio-voice-test-yb4a.vercel.app/api/twilio-webhook";
    const urlEncodedData = new URLSearchParams()
    urlEncodedData.append("To", phoneNumber)
    urlEncodedData.append("From", fromNumber)
    urlEncodedData.append("Url", serverTwiMLUrl);


    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData.toString(),
    })

    // Parse the response
    const data = await response.json()

    if (!response.ok) {
      console.error("Twilio API error:", data)
      return {
        success: false,
        message: data.message || "Falha ao realizar ligação",
      }
    }

    return {
      success: true,
      message: "Ligação feita com sucesso!",
      callSid: data.sid,
    }
  } catch (error) {
    console.error("Error making call:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

