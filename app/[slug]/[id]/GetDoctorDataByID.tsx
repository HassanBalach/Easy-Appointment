"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";
import { realtimeDatabase } from "@/firebaseConfig";
import { ref, push } from "firebase/database";
import { useToast } from "@/hooks/use-toast";
import {
   Accordion,
   AccordionContent,
   AccordionTrigger,
   AccordionItem,
} from "@/components/ui/accordion";

import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface DoctorData {
   id: string;
   name: string;
   specialization: string;
   experience?: number;
   about?: string;
   fee?: number;
   image?: string;
}

export default function GetDoctorDataByID({
   doctorData,
}: {
   doctorData: DoctorData;
}) {
   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
   const [selectedTime, setSelectedTime] = useState<string | null>(null);
   const [showDialog, setShowDialog] = useState(false);
   const [patientName, setPatientName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [email, setEmail] = useState("");
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
   };

   const validateForm = () => {
      const newErrors: { [key: string]: string } = {};

      if (!patientName.trim()) {
         newErrors.name = "Patient name is required";
      }

      if (!phoneNumber.trim()) {
         newErrors.phone = "Phone number is required";
      } else if (!/^\d{11}$/.test(phoneNumber)) {
         newErrors.phone = "Please enter a valid 11-digit phone number";
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

         const appointmentData = {
            patientName,
            phoneNumber: formattedPhoneNumber,
            email,
            date: selectedDate.toISOString(),
            selectedTime,
         };

         try {
            await push(appointmentsRef, appointmentData);
            toast({
               title: "Success",
               description: "Congratulations! Appointment booked successfully",
            });
            setShowDialog(false);
         } catch (error) {
            console.error("Error booking appointment: ", error);
         }
      }
   };

   const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
   });

   const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
      setShowDialog(true);
   };

   return (
      <>
         <Header isShown={true} />
         <div className="mx-auto max-w-5xl">
            <div className="flex flex-col lg:flex-row gap-4 max-w-5xl w-full mx-auto mb-8 px-4">
               <Card className="w-full flex-grow p-4 lg:p-6 rounded-xl">
                  <div className="space-y-3 lg:space-y-4">
                     <div className="flex items-center gap-2">
                        <Avatar className="h-16 w-16">
                           {doctorData.image && (
                              <AvatarImage
                                 src={doctorData.image}
                                 alt={doctorData.name}
                              />
                           )}
                           <AvatarFallback>
                              {doctorData.name.charAt(0)}
                           </AvatarFallback>
                        </Avatar>
                        <h1 className="text-lg lg:text-xl font-semibold">
                           {doctorData.name}
                        </h1>

                        <CheckCircle
                           className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500"
                           aria-label="Verified"
                        />
                     </div>

                     <div>
                        <h2 className="text-xs lg:text-sm font-medium mb-1 lg:mb-2 flex items-center gap-2">
                           About{" "}
                         
                        </h2>
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-4 lg:line-clamp-none">
                              {doctorData.name} is dedicated to providing exceptional patient care through a holistic approach, emphasizing preventive measures, accurate diagnoses, and personalized treatment plans to ensure optimal health outcomes.
                           </p>
                     </div>

                     <div>
                        <h2 className="text-xs lg:text-sm font-medium mb-1 text-gray-600">
                           Appointment fee
                        </h2>
                        <p className="text-base lg:text-lg font-semibold">
                           1000
                        </p>
                     </div>
                  </div>
               </Card>
            </div>

            <div className="mx-4 sm:mx-6 lg:mx-8 my-4">
               <Accordion
                  type="single"
                  collapsible
                  className="w-full border-2 border-gray-200 rounded-xl max-w-4xl mx-auto"
               >
                  <AccordionItem value="booking">
                     <AccordionTrigger className="text-lg lg:text-xl bg-gray-200 px-4 py-4 rounded-t-xl">
                        Hospital:
                        Zahid Medical Center

                     </AccordionTrigger>
                     <AccordionContent className="px-4 py-4">
                        <div className="flex flex-col gap-8">
                           <div className="text-center">
                              <h2 className="text-lg md:text-xl font-semibold">
                                 Select Your Preferred Slot
                              </h2>
                           </div>

                           <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4 sm:gap-6 w-full">
                              {weekDates.map((date) => (
                                 <div
                                    key={date.toString()}
                                    className={`cursor-pointer p-3 rounded-xl text-center transition-colors ${date.toDateString() ===
                                       selectedDate?.toDateString()
                                       ? "bg-blue-500 text-white"
                                       : "bg-gray-100 hover:bg-blue-100"
                                       }`}
                                    onClick={() => {
                                       setSelectedDate(date);
                                       setSelectedTime(null);
                                    }}
                                 >
                                    <div
                                       className={`${date.toDateString() ===
                                          selectedDate?.toDateString()
                                          ? "text-white"
                                          : "text-gray-500"
                                          }`}
                                    >
                                       {format(date, "EEE")}
                                    </div>
                                    <div className="text-lg font-semibold">
                                       {format(date, "d")}
                                    </div>
                                 </div>
                              ))}
                           </div>

                           {selectedDate && (
                              <div className="w-full">
                                 <h3 className="text-lg font-medium text-center md:text-left">
                                    Select a Time for{" "}
                                    {format(selectedDate, "MMM dd, yyyy")}
                                 </h3>
                                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                    {timeSlots[
                                       format(selectedDate, "yyyy-MM-dd")
                                    ]?.map((time) => (
                                       <button
                                          key={time}
                                          className={`p-2 rounded-xl border ${selectedTime === time
                                             ? "bg-blue-500 text-white border-blue-500"
                                             : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                                             }`}
                                          onClick={() => handleTimeSelect(time)}
                                       >
                                          {time}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           )}

                           <div className="bg-gray-100 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div className="text-center sm:text-left font-medium">
                                 {selectedDate && selectedTime ? (
                                    <span className="text-lg">
                                       {format(selectedDate, "d MMMM, yyyy")} |{" "}
                                       {selectedTime}
                                    </span>
                                 ) : (
                                    "Select a date and time"
                                 )}
                              </div>
                              <button className="px-8 py-2 text-lg rounded-xl bg-[#D5E834] text-black hover:bg-[#c2d42f]">
                                 Book
                              </button>
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
                  <div className="space-y-2">
                     <Label htmlFor="patientName">Name</Label>
                     <Input
                        id="patientName"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                     />
                     {errors.name && (
                        <p className="text-red-500 text-xs">{errors.name}</p>
                     )}
                  </div>

                  <div>
                     <Label htmlFor="phoneNumber">Phone Number</Label>
                     <Input
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                     />
                     {errors.phone && (
                        <p className="text-red-500 text-xs">{errors.phone}</p>
                     )}
                  </div>

                  <div>
                     <Label htmlFor="email">Email Address</Label>
                     <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                     )}
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
         </div>
      </>
   );
}
