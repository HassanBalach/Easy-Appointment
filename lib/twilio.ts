// lib/twilio.ts
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

console.log({ accountSid, authToken, twilioPhoneNumber });

export const sendSms = (to: string, message: string) => {
  console.log(`Sending SMS to ${to} with message: ${message}`);

  client.messages.create({
    body: message,
    to: to,
    from: twilioPhoneNumber,
  })
  .then((message) => {
    console.log(`SMS sent successfully with SID: ${message.sid}`);
  })
  .catch((error) => {
    console.error(`Error sending SMS:`, error);
  });
};
