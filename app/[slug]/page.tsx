"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Video, Filter, MapPin, Stethoscope, Menu } from "lucide-react";
import { searchDoctor } from "@/lib/action";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from '@/components/Header'
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function SearchId() {
   
   const searchParams = useSearchParams();
   const slug = searchParams?.get("term");
   const [doctorData, setDoctorData] = useState<any>(null);
   const [selectedSpecialty, setSelectedSpecialty] =
      React.useState("Gynecologist");
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

   const specialties = [
      "General physician",
      "Gynecologist",
      "Dermatologist",
      "Pediatricians",
      "Neurologist",
      "Gastroenterologist",
   ];

   useEffect(() => {
      async function fetchData() {
         if (slug) {
            const data = await searchDoctor(slug);
            setDoctorData(data);
         }
      }
      fetchData();
   }, [slug]);

   const Sidebar = () => (
      <nav className="w-full p-4 space-y-2 bg-white rounded-lg shadow">
         <h2 className="text-lg font-semibold mb-4">Specialties</h2>
         {specialties.map((specialty) => (
            <button
               key={specialty}
               onClick={() => {
                  setSelectedSpecialty(specialty);
                  setIsSidebarOpen(false);
               }}
               className={cn(
                  "w-full px-4 py-2 text-sm rounded-full transition-colors",
                  "hover:bg-blue-50 hover:text-blue-600",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  selectedSpecialty === specialty
                     ? "bg-blue-100 text-blue-600"
                     : "bg-white text-gray-700"
               )}
            >
               {specialty}
            </button>
         ))}
      </nav>
   );

   return (
      <>
         <Header isShown={true} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-36">
         <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Sidebar Trigger */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
               <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden mb-4">
                     <Menu className="mr-2 h-4 w-4" /> Specialties
                  </Button>
               </SheetTrigger>
               <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <Sidebar />
               </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-72">
               <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1">
               {doctorData && (
                  <>
                     {doctorData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-6 px-4">
                           <div className="text-gray-200 text-xl font-semibold mb-2">
                              No matches found
                           </div>
                           <div className="text-gray-400 text-md text-center">
                              Try searching with different keywords or browse
                              our specialties below
                           </div>
                           <div className="text-gray-400 text-md mt-1">
                              Example: "Cardiologist", "Dentist", "Skin
                              Specialist"
                           </div>
                        </div>
                     ) : (
                        <>
                           <h1 className="text-3xl font-bold mb-2">
                              {doctorData.length} Best in Hub
                           </h1>
                           {doctorData.map((doctor: any) => (
                              <div key={doctor.id} className="mb-6">
                                 <Card className="w-full">
                                    <CardContent className="p-4 sm:p-6">
                                       <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                          <div className="flex-shrink-0 flex justify-center sm:justify-start">
                                             <Link href={`/id/${doctor.id}`}>
                                                <Avatar className="h-16 w-16">
                                                   {doctor.image && (
                                                      <AvatarImage
                                                         src={doctor.image}
                                                      />
                                                   )}
                                                   <AvatarFallback>
                                                      {doctor.name.charAt(0)}
                                                   </AvatarFallback>
                                                </Avatar>
                                             </Link>
                                          </div>
                                          <div className="flex-grow">
                                             <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                                <h2 className="text-xl font-bold">
                                                   {doctor?.name}
                                                </h2>
                                                <Badge
                                                   variant="secondary"
                                                   className="bg-yellow-400 text-white w-fit"
                                                >
                                                   PLATINUM DOCTOR
                                                </Badge>
                                             </div>
                                             <p className="text-gray-600 mb-2">
                                                {doctor?.specialization}
                                             </p>
                                             <p className="text-gray-600 mb-4">
                                                MBBS, MCPS (Gynecology and
                                                Obstetrcian)
                                             </p>
                                             <div className="flex flex-wrap gap-4 sm:gap-8 mb-4">
                                                <div>
                                                   <p className="font-bold">
                                                      {doctor?.experience} Years
                                                   </p>
                                                   <p className="text-gray-600">
                                                      Experience
                                                   </p>
                                                </div>
                                                <div>
                                                   <p className="font-bold flex items-center">
                                                      99%{" "}
                                                      <Star className="w-4 h-4 text-yellow-400 ml-1" />
                                                   </p>
                                                   <p className="text-gray-600">
                                                      Satisfied Patients
                                                   </p>
                                                </div>
                                             </div>
                                             <div className="p-3 sm:p-4 bg-blue-50 rounded-lg inline-flex items-center gap-2 mb-4 flex-wrap">
                                                <Video className="w-5 h-5 text-blue-600" />
                                                <span>
                                                   Online Video Consultation
                                                   (Online)
                                                </span>
                                                <span className="font-bold">
                                                   Rs. 1,400
                                                </span>
                                             </div>
                                          </div>
                                          <div className="flex flex-col gap-4 w-full sm:w-auto">
                                             <Link
                                                href={`/id/${doctor.id}`}
                                                className="w-full"
                                             >
                                                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                                   Book Appointment
                                                </Button>
                                             </Link>
                                          </div>
                                       </div>
                                    </CardContent>
                                 </Card>
                              </div>
                           ))}
                        </>
                     )}
                  </>
               )}
            </div>
         </div>
      </div>
      </>
   );
}
