"use client";

import { Button } from "@/components/ui/button";
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
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/loader";

export default function SearchId() {
   const searchParams = useSearchParams();
   const slug = searchParams?.get("term");
   const [doctorData, setDoctorData] = useState<any>(null);
   const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
   const [isSheetOpen, setIsSheetOpen] = useState(false);

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
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto">
         <div className="w-full">
            <Header isShown={true} />
         </div>
         <div className="mx-auto flex flex-col">
            {
               <div className="flex flex-col md:flex-row gap-5">
                  {/* Sidebar and Filters */}
                  <aside className="hidden lg:block lg:w-1/4 md:w-1/3 p-1 rounded-lg">
                     <h2 className="text-sm font-semibold mb-2.7">Filters</h2>
                     <div className="space-y-3.15">
                        {filters.map((filter, index) => (
                           <Button
                              key={index}
                              variant="outline"
                              className={`w-[90%] text-left rounded-lg my-2 ${
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
                     <div className=" lg:hidden mb-3.5 flex justify-center">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                           <SheetTrigger asChild>
                              <Button
                                 variant="outline"
                                 className="w-[72%] bg-[var(--secondary-accent)] text-white rounded-xl"
                              >
                                 Open Filters
                              </Button>
                           </SheetTrigger>
                           <SheetContent side="left">
                              <SheetHeader>
                                 <SheetTitle>Filters</SheetTitle>
                              </SheetHeader>
                              <div className="space-y-1.5 p-3.5">
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
                                          setIsSheetOpen(false);
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
                              <h1 className="text-2xl font-bold mb-1.5">
                                 No Doctor Found
                              </h1>
                           ) : (
                              <>
                                 <h1 className="text-2xl font-bold mb-5 text-center sm:text-left">
                                    {doctorData.length} Best in Hub
                                 </h1>
                                 <div className="space-y-3 sm:space-y-5">
                                    {doctorData.map((doctor: any) => (
                                       <Card key={doctor.id} className="w-full">
                                          <CardContent className="p-4 sm:p-5">
                                             <div className="flex flex-col sm:flex-row md:flex-row gap-4 sm:gap-7 md:gap-9">
                                                <Link href={`/id/${doctor.id}`}>
                                                   <Avatar className="h-14 w-14">
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
                                                <div className="flex-grow">
                                                   <h2 className="text-lg font-bold text-center sm:text-left">
                                                      {doctor?.name}
                                                   </h2>
                                                   <p className="text-gray-600 mb-1.5 text-center sm:text-left">
                                                      {doctor?.specialization}
                                                   </p>
                                                   <p className="text-gray-600 mb-3 text-center sm:text-left">
                                                      MBBS, MCPS
                                                   </p>
                                                   <div className="flex flex-wrap gap-5 sm:gap-7 mb-3 justify-center sm:justify-start md:justify-start">
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
                                                            <Star className="w-3.5 h-3.5 text-yellow-400 ml-1" />
                                                         </p>
                                                         <p className="text-gray-600 text-center sm:text-left">
                                                            Satisfied Patients
                                                         </p>
                                                      </div>
                                                   </div>
                                                   <div className="p-3 sm:p-3.5 bg-blue-50 rounded-lg inline-flex items-center gap-1.5 mb-3">
                                                      <Video className="w-4 h-4 text-blue-600" />
                                                      <span>
                                                         Online Video
                                                         Consultation
                                                      </span>
                                                      <span className="font-bold">
                                                         Rs. 1,400
                                                      </span>
                                                   </div>
                                                </div>
                                                <Link
                                                   href={`/id/${doctor.id}`}
                                                   className="w-full sm:w-auto"
                                                >
                                                   <Button className="w-full bg-[var(--secondary-accent)] text-white rounded-lg">
                                                      Book Appointment
                                                   </Button>
                                                </Link>
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
            }
         </div>
      </div>
   );
}
