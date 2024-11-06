"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Video, Filter, MapPin, Stethoscope } from "lucide-react";

import { searchDoctor } from "@/lib/action";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";

export default function SearchId() {
   const searchParams = useSearchParams();
   const slug = searchParams?.get("term");
   const [doctorData, setDoctorData] = useState<any>(null);
   const [filters, setFilters] = useState({
      location: "all",
      specialization: "all",
      experience: "all",
      fees: "all",
      availability: "all",
   });

   useEffect(() => {
      async function fetchData() {
         if (slug) {
            const data = await searchDoctor(slug);
            setDoctorData(data);
         }
      }
      fetchData();
   }, [slug]);

   const applyFilter = (filterType: string, value: string) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
   };

   return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-36">
         <Header isShown={true} />

         {doctorData && (
            <>
               {/* Filter Section */}
               <Card className="p-6 mb-6 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                     <Filter className="w-5 h-5" /> Filters
                  </h3>
                  <div className="flex flex-wrap gap-4">
                     <Button
                        variant="default"
                        onClick={() =>
                           applyFilter("location", "specific-location")
                        }
                     >
                        <MapPin className="mr-2" /> Location
                     </Button>
                     <Button
                        variant="default"
                        onClick={() =>
                           applyFilter(
                              "specialization",
                              "specific-specialization"
                           )
                        }
                     >
                        <Stethoscope className="mr-2" /> Specialization
                     </Button>
                     <Button
                        variant="default"
                        onClick={() => applyFilter("availability", "today")}
                     >
                        Availability: Today
                     </Button>
                     <Button
                        variant="default"
                        onClick={() => applyFilter("experience", "5+")}
                     >
                        Experience: 5+ years
                     </Button>
                     <Button
                        variant="default"
                        onClick={() => applyFilter("fees", "0-1500")}
                     >
                        Fees: ₹0-1500
                     </Button>
                  </div>
               </Card>

               {/* Doctor List Section */}
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
