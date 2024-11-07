"use client";

import React, { useState } from "react";
import { CalendarIcon, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { realtimeDatabase } from "@/firebaseConfig";
import { ref, push } from "firebase/database";
import { useToast } from "@/hooks/use-toast";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   Accordion,
   AccordionContent,
   AccordionTrigger,
   AccordionItem,
} from "@/components/ui/accordion";

import Header from "@/components/Header";


export default function GetDoctorDataByID({ doctorData }: { doctorData: any }) {

   const [date, setDate] = useState<Date | undefined>(new Date());
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date()
   );
   const [selectedTime, setSelectedTime] = useState<string | null>(null);
   const [showDialog, setShowDialog] = useState(false);
   const [patientName, setPatientName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [email, setEmail] = useState("");
   const [relationship, setRelationship] = useState("self");
   const [errors, setErrors] = useState<{ [key: string]: string }>({});

   const { toast } = useToast();

   const timeSlots: { [key: string]: string[] } = {
      "2024-11-06": ["08:30", "11:30", "15:00", "18:30"],
      "2024-11-07": ["09:00", "12:00", "16:00", "19:00"],
      "2024-11-08": ["08:00", "11:00", "14:00", "17:00"],
      "2024-11-09": ["08:00", "15:00", "19:00", "20:00"],
      "2024-11-10": ["08:00", "13:00", "18:00", "20:00"],
      "2024-11-11": ["08:00", "12:00", "18:00", "21:00"],
      "2024-11-16": ["08:00", "15:00", "19:00", "20:00"],
      "2024-11-17": ["08:00", "13:00", "18:00", "20:00"],
      "2024-11-18": ["08:00", "12:00", "18:00", "21:00"],
      "2024-11-19": ["08:00", "12:00", "18:00", "21:00"],
      // Add other days here as needed
   };



   const validateForm = () => {
      const newErrors: { [key: string]: string } = {};

      if (!patientName.trim()) {
         newErrors.name = "Patient name is required";
      }

      if (!phoneNumber.trim()) {
         newErrors.phone = "Phone number is required";
      } else if (!/^\d{11}$/.test(phoneNumber)) {
         newErrors.phone = "Please enter a valid 10-digit phone number";
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         newErrors.email = "Please enter a valid email address";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmitClick = async () => {
      if (validateForm()) {
         const appointmentsRef = ref(realtimeDatabase, "appointments");

         let formattedPhoneNumber = phoneNumber;

         if (!phoneNumber.startsWith("+")) {
            formattedPhoneNumber = `+92${phoneNumber}`;
         }

         const data = {
            patientName,
            phoneNumber: formattedPhoneNumber,
            email,
            relationship,
            date,
            selectedTime,
         };

         console.log(data);

         try {
            await push(appointmentsRef, data);
            console.log("Appointment booked successfully");

            // Send SMS confirmation
            const smsResponse = await fetch("/api/sms-send", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  to: data.phoneNumber, // Assuming `data` contains `phoneNumber`
                  message: `Hello ${data.patientName}, your appointment is confirmed!`,
               }),
            });

            console.log({ smsResponse });

            const result = await smsResponse.json();

            console.log({ result });

            if (result.success) {
               console.log("SMS sent successfully");
               toast({
                  title: "Success",
                  description: "Congratulations! Appointment booked successfully",
               });
            } else {
               console.error("Error SMS sending: ", result.error);
            }

            setShowDialog(false);
         } catch (error) {
            console.error("Error booking appointment: ", error);
         }
      }
   };

    const isTimeSlotDisabled = (time: string, currentDate: Date) => {
     if (!date) return false;

     const selectedDate = startOfDay(date);
     const currentDay = startOfDay(currentDate);

     if (isBefore(selectedDate, currentDay)) {
        return true;
     }

     return false;
  };

  

   const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i); // Start from today and go 6 days forward
      return date;
   });

   const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
      setShowDialog(true)

   };



   return (
      <>
         <Header isShown={true} />
         <div className="container mx-auto p-4 max-w-3xl">
            <Card className="mb-8">
               <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                     <Avatar className="h-16 w-16">
                        {doctorData.image && (
                           <AvatarImage src={doctorData.image} />
                        )}
                        <AvatarFallback>
                           {doctorData.name.charAt(0)}
                        </AvatarFallback>
                     </Avatar>
                     <div>
                        <h2 className="text-xl font-bold">{doctorData.name}</h2>
                        <p className="text-sm text-muted-foreground">
                           healthdoc Care The Patient
                        </p>
                        <p className="text-sm font-semibold">Fee: Rs. 1,400</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
            <div>
               <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="booking">
                     <AccordionTrigger className="text-xl">
                        Zahid Medical Center
                     </AccordionTrigger>
                     <AccordionContent>
                        <div className="space-y-6">
                           <div className="flex items-center justify-between">
                              <h2 className="text-lg font-medium">
                                 Select your preferred slot
                              </h2>

                           </div>

                           <div className="grid grid-cols-7 gap-4 text-center">
                              {weekDates.map((date) => (
                                 <div
                                    key={date.toString()}
                                    className={`cursor-pointer p-2 rounded-lg ${date.toDateString() === selectedDate?.toDateString()
                                          ? "bg-blue-500 text-white"
                                          : "bg-transparent"
                                       }`}
                                    onClick={() => {
                                       setSelectedDate(date);
                                       setSelectedTime(null); // Reset time when selecting a new date
                                    }}
                                 >
                                    <div className="text-sm text-muted-foreground mb-2">
                                       {format(date, "EEE")} {/* Day of the week */}
                                    </div>
                                    <div className="text-lg font-semibold">
                                       {format(date, "d")} {/* Day of the month */}
                                    </div>
                                 </div>
                              ))}
                           </div>

                           <div className="mt-4">
                              {selectedDate && (
                                 <div>
                                    <h3 className="text-lg font-medium">
                                       Select a time for{" "}
                                       {format(selectedDate, "MMM dd, yyyy")}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                       {timeSlots[
                                          format(selectedDate, "yyyy-MM-dd")
                                       ]?.map((time) => (
                                          <Button
                                             key={time}
                                             variant={
                                                selectedTime === time
                                                   ? "default"
                                                   : "outline"
                                             }
                                             className="w-full"
                                             onClick={() => handleTimeSelect(time)}
                                          >
                                             {time}
                                          </Button>
                                       ))}
                                    </div>
                                 </div>
                              )}
                           </div>

                           <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                              <div className="font-medium">
                                 {date && selectedTime ? (
                                    <span>
                                       {selectedDate &&
                                          format(
                                             selectedDate,
                                             "d MMMM, yyyy"
                                          )}{" "}
                                       |{selectedTime}
                                    </span>
                                 ) : (
                                    "Select a date and time"
                                 )}
                              </div>
                              <Button className="bg-[#D5E834] text-black hover:bg-[#c2d42f]">
                                 Book
                              </Button>
                           </div>
                        </div>
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
               <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                     <DialogTitle>Confirm Your Appointment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                     <div>
                        <Label htmlFor="name">Patient Name</Label>
                        <Input
                           id="name"
                           value={patientName}
                           onChange={(e) => setPatientName(e.target.value)}
                        />
                        {errors.name && (
                           <p className="text-xs text-red-500">{errors.name}</p>
                        )}
                     </div>
                     <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                           id="phone"
                           value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phone && (
                           <p className="text-xs text-red-500">{errors.phone}</p>
                        )}
                     </div>
                     <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                           id="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                           <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                     </div>
                     <div>
                        <Label htmlFor="relationship">Relationship</Label>
                        <Select
                           value={relationship}
                           onValueChange={setRelationship}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder="Select relationship" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="self">Self</SelectItem>
                              <SelectItem value="family">Family</SelectItem>
                              <SelectItem value="friend">Friend</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                     <Button
                        variant="outline"
                        onClick={() => setShowDialog(false)}
                     >
                        Cancel
                     </Button>
                     <Button onClick={handleSubmitClick}>Confirm</Button>
                  </div>
               </DialogContent>
            </Dialog>
            {/* <Card>
            <CardHeader>
               <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                     <ThumbsUp className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-medium">
                     95% patients feel satisfied after booking appointment from
                     oladoc
                  </p>
               </div>
               <p className="text-sm text-muted-foreground">
                  It takes only 30 sec to book an appointment
               </p>
            </CardHeader>
            <CardContent>
               <CardTitle className="text-lg mb-4">
                  Reviews About Dr. Sadaf Khalid (102)
               </CardTitle>
               <ScrollArea className="h-[300px] pr-4">
                  {[1, 2, 3, 4].map((review) => (
                     <div key={review} className="mb-4 p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                           <ThumbsUp className="h-4 w-4 text-primary" />
                           <span className="font-medium">
                              I recommend the doctor
                           </span>
                        </div>
                        <p className="text-sm mb-2">"Very good experience."</p>
                        <div className="text-sm text-muted-foreground">
                           <span>Verified Patient</span> •{" "}
                           <span>5 days ago</span>
                        </div>
                     </div>
                  ))}
               </ScrollArea>
               <Button variant="outline" className="w-full mt-4">
                  Load more reviews
               </Button>
            </CardContent>
         </Card> */}
         </div>
      </>
   );
}
