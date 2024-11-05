// app/api/send-sms.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendSms } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  const { to, message } = await request.json();


  
  console.log({message})
  console.log({to})



  try {
    sendSms(to, message);
    return NextResponse.json({ success: true, message: 'SMS sent!' });
  } catch (error: any) {
    console.log('ERROR IN SEND SMS', error)
    return NextResponse.json({ success: false, error: error.message });
  }
}
