'use client'
import {  ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ChevronRight, Smartphone, ArrowLeft } from "lucide-react"


declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
    
  }
  var grecaptcha: any;
}




export default function ModernPhoneAuthentication() {
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")


  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth , 'recaptcha-container', {
        'size': 'normal',
        'callback': (response: any) => {
         console.log("Recaptcha verified")
         
        },
        'expired-callback': () => {
          console.log("reCAPTCHA has expired. Please try again.");
        }
      }); // pass `auth` here
    }
  }, [phoneNumber]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(phoneNumber){
      window.recaptchaVerifier.verify().then(()=>{
        sendOTP()
      }).catch((error:any)=>{
        console.error(" verifying reCAPTCHA Failed:", error);
      })

    }else{
      console.error("Phone number is required");
    }
  }

  const sendOTP = () => {
    const appVerifier = window.recaptchaVerifier;
    console.log({phoneNumber});
    console.log({appVerifier});
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      
      console.log("OTP is sent to user phone number");
      window.confirmationResult = confirmationResult;
        setStep(2); // Proceed to OTP entry step
      }).catch((error) => {
        console.error("Error sending OTP:", error);
        window.recaptchaVerifier.render().then((widgetId: any) => {
          grecaptcha.reset(widgetId); // Reset reCAPTCHA
        });
      });
  }


  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Verifying OTP", otp)
    setStep(3)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <Card className="w-[380px] shadow-xl border-none bg-white">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Phone Auth</CardTitle>
          <CardDescription className="text-primary-foreground/80">Secure login with your phone</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="phone-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handlePhoneSubmit}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <Button
                   id="sign-in-button"
                   onClick={handlePhoneSubmit} 
                   className="w-full" 
                    >
                    Send OTP
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="otp-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleOtpSubmit}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Verify OTP
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4"
              >
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                <p className="text-2xl font-semibold text-primary">Success!</p>
                <p className="text-muted-foreground">You're securely logged in.</p>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Add this div for reCAPTCHA */}
          <div id="recaptcha-container"></div>
        </CardContent>
        <CardFooter className="justify-between">
          {step > 1 && step < 3 && (
            <Button variant="ghost" onClick={handleBack} className="text-primary hover:text-primary/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          <Smartphone className="h-5 w-5 text-muted-foreground ml-auto" />
        </CardFooter>
      </Card>
    </div>
  )
}
