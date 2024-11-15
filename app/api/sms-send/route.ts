import { sendSms } from "@/lib/twilio";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { to, message } = await request.json();

  console.log({ message });
  console.log({ to });

  try {
    sendSms(to, message);
    return NextResponse.json({ success: true, message: 'SMS sent!' });
  } catch (error: unknown) {
    console.log('ERROR IN SEND SMS', error);

    // Narrowing the type of error to check if it's an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    } else {
      return NextResponse.json({ success: false, error: 'Unknown error occurred' });
    }
  }
}
