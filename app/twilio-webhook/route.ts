import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const from = formData.get("From") as string;
    const to = formData.get("To") as string;

    console.log("webhook", { from, to });

    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
          <Dial callerId="${from}">${to}</Dial>
      </Response>`,
      { headers: { "Content-Type": "text/xml" } }
    );
  } catch (error) {
    console.error("erro:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
          <Say>Erro no servidor, por favor, tente novamente mais tarde.</Say>
          <Hangup/>
      </Response>`,
      { headers: { "Content-Type": "text/xml" } }
    );
  }
}
