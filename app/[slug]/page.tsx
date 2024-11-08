"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Video } from "lucide-react";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { searchDoctor } from "@/lib/action";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchId() {
   const searchParams = useSearchParams();
   const slug = searchParams?.get("term");
   const [doctorData, setDoctorData] = useState<any>(null);
   const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

   const filters = [
      "Endocrinologist",
      "Cardiologist",
      "Dermatologist",
      "Gastroenterologist",
      "Pediatrician",
      "Neurologist",
      "Psychiatrist",
      "Oncologist",
      "Gynecologist",
      "Orthopedist",
      "Ophthalmologist",
      "Pulmonologist",
      "Rheumatologist",
      "Allergist/Immunologist",
      "Otolaryngologist",
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

   const router = useRouter();

   return (
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
         <div className="w-full">
            <Header isShown={true} />
         </div>
         <div className="mx-auto flex flex-col">
            <div className="flex flex-col md:flex-row gap-6">
               {/* Sidebar for Large Screens */}
               <aside className="hidden lg:block lg:w-1/4 md:w-1/3 p-2 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  <div className="space-y-4">
                     {filters.map((filter, index) => (
                        <Button
                           key={index}
                           variant="outline"
                           className={`w-full text-left rounded-xl my-2 ${
                              selectedFilter === filter
                                 ? "bg-blue-100 border-blue-500 text-blue-700"
                                 : "bg-white border-gray-300 text-gray-800"
                           }`}
                           onClick={() => {
                              setSelectedFilter(filter);
                              router.push(`/search-results?term=${filter}`);
                           }}
                        >
                           {filter}
                        </Button>
                     ))}
                  </div>
               </aside>

               {/* Main Content */}
               <main className="flex-1">
                  {/* ShadCN Sheet for Small Screens */}
                  <div className="block lg:hidden mb-4">
                     <Sheet>
                        <SheetTrigger asChild>
                           <div className="flex justify-center">
                           <Button
                                 variant="outline"
                                 className="w-[80%] bg-[var(--primary-accent)] text-white rounded-xl"
                              >
                                 Open Filters
                              </Button>
                           </div>
                        </SheetTrigger>
                        <SheetContent side="left">
                           <SheetHeader>
                              <SheetTitle>Filters</SheetTitle>
                           </SheetHeader>
                           <div className="space-y-2 p-4">
                              {filters.map((filter, index) => (
                                 <Button
                                    key={index}
                                    variant="outline"
                                    className={`w-full text-left rounded-lg ${
                                       selectedFilter === filter
                                          ? "bg-blue-100 border-blue-500 text-blue-700"
                                          : "bg-white border-gray-300 text-gray-800"
                                    }`}
                                    onClick={() => {
                                       setSelectedFilter(filter);
                                       router.push(
                                          `/search-results?term=${filter}`
                                       );
                                    }}
                                 >
                                    {filter}
                                 </Button>
                              ))}
                           </div>
                        </SheetContent>
                     </Sheet>
                  </div>

                  {/* Doctor Cards */}
                  {doctorData && (
                     <>
                        {doctorData.length === 0 ? (
                           <h1 className="text-3xl font-bold mb-2">
                              No Doctor Found
                           </h1>
                        ) : (
                           <>
                              <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
                                 {doctorData.length} Best in Hub
                              </h1>
                              <div className="space-y-6">
                                 {doctorData.map((doctor: any) => (
                                    <Card key={doctor.id} className="w-full">
                                       <CardContent className="p-6">
                                          <div className="flex flex-col sm:flex-row md:flex-row gap-6 sm:gap-8 md:gap-10">
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
                                                <div className="flex flex-col sm:flex-row md:flex-row sm:items-center gap-2 mb-2">
                                                   <h2 className="text-xl font-bold text-center sm:text-left">
                                                      {doctor?.name}
                                                   </h2>
                                                </div>
                                                <p className="text-gray-600 mb-2 text-center sm:text-left">
                                                   {doctor?.specialization}
                                                </p>
                                                <p className="text-gray-600 mb-4 text-center sm:text-left">
                                                   MBBS, MCPS (Gynecology and
                                                   Obstetrics)
                                                </p>
                                                <div className="flex flex-wrap gap-8 mb-4 justify-center sm:justify-start md:justify-start">
                                                   <div>
                                                      <p className="font-bold text-center sm:text-left">
                                                         {doctor?.experience}{" "}
                                                         Years
                                                      </p>
                                                      <p className="text-gray-600 text-center sm:text-left">
                                                         Experience
                                                      </p>
                                                   </div>
                                                   <div>
                                                      <p className="font-bold flex items-center justify-center sm:justify-start">
                                                         99%{" "}
                                                         <Star className="w-4 h-4 text-yellow-400 ml-1" />
                                                      </p>
                                                      <p className="text-gray-600 text-center sm:text-left">
                                                         Satisfied Patients
                                                      </p>
                                                   </div>
                                                </div>
                                                <div className="p-4 bg-blue-50 rounded-lg inline-flex items-center gap-2 mb-4 flex-wrap justify-center sm:justify-start">
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
                                 ))}
                              </div>
                           </>
                        )}
                     </>
                  )}
               </main>
            </div>
         </div>
      </div>
   );
}
