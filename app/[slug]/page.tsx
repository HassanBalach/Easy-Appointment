"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Video, ChevronRight, ChevronLeft } from "lucide-react";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { searchDoctor } from "@/lib/action";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchId() {
   const searchParams = useSearchParams();
   const slug = searchParams?.get("term");
   const [doctorData, setDoctorData] = useState<any>(null);

   const filters = [
      "Gynecologist",
      "Skin-Specialist",
      "Orthopedic-Surgeon",
      "ENT-Specialist",
      "Diabetes-Specialist",
      "Eye-Specialist",
      "Fever",
      "Heart-Attack",
      "Pregnancy",
      "High-Blood-Pressure",
      "Piles",
      "Diarrhea",
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

   return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-36">
         <Header isShown={true} />

         {/* Filter Buttons */}
         <div className="relative w-full hidden sm:block my-6">
            <div className="flex gap-2 flex-wrap px-4 pt-2">
               {filters.map((filter) => (
                  <Button
                     key={filter}
                     variant="outline"
                     className="shrink-0 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                     {filter}
                  </Button>
               ))}
            </div>
         </div>

         {/* Small Screen Filter Modal */}
         <div className="sm:hidden">
            <Sheet>
               <SheetTrigger asChild>
                  <div className="flex justify-center items-center">
                     <Button
                        variant="outline"
                        className="w-[50%] mx-auto bg-[var(--primary-accent)] text-white text-center"
                     >
                        Open Filters
                     </Button>
                  </div>
               </SheetTrigger>
               <SheetContent side="bottom">
                  <SheetHeader>
                     <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 p-4">
                     {filters.map((filter) => (
                        <Button
                           key={filter}
                           variant="outline"
                           className="w-full rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                           {filter}
                        </Button>
                     ))}
                  </div>
               </SheetContent>
            </Sheet>
         </div>

         {doctorData && (
            <>
               {doctorData.length === 0 ? (
                  <h1 className="text-3xl font-bold mb-2">No Doctor Found</h1>
               ) : (
                  <>
                     <h1 className="text-3xl font-bold mb-2">
                        {doctorData.length} Best in Hub
                     </h1>
                     {doctorData.map((doctor: any) => (
                        <div key={doctor.id} className="mb-6">
                           <Card className="w-full">
                              <CardContent className="p-6">
                                 <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0 flex justify-center md:justify-start">
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
                                       <div className="flex flex-wrap gap-8 mb-4">
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
                                       <div className="p-4 bg-blue-50 rounded-lg inline-flex items-center gap-2 mb-4 flex-wrap">
                                          <Video className="w-5 h-5 text-blue-600" />
                                          <span>
                                             Online Video Consultation (Online)
                                          </span>
                                          <span className="font-bold">
                                             Rs. 1,400
                                          </span>
                                       </div>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full md:w-auto">
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
   );
}
