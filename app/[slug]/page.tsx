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

<<<<<<<<< Temporary merge branch 1


    return (
        <div className="container mx-auto p-36 pt-10">

            {doctorData && (
                doctorData.length === 0 ? (
                    <h1 className="text-3xl font-bold mb-2">No Data Found</h1>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-2"> {doctorData.length} Best in Hub</h1>
                        {doctorData.map((doctor: any) => (
                            <div key={doctor.id}>
                                <Card className="w-full">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-shrink-0">
                                                <Link href={`/id/${doctor.id}`}>
                                                    {/* <Image
                                                        src={doctor?.image}
                                                        alt="Image"
                                                        width={100}
                                                        height={100}
                                                        className="rounded-full"
                                                    /> */}

                                                    <Avatar className="h-16 w-16">
                                                        {doctor.image && <AvatarImage src={doctor.image} />}
                                                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>

                                                    </Avatar>
                                                </Link>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h2 className="text-xl font-bold">{doctor?.name}</h2>
                                                    <Badge variant="secondary" className="bg-yellow-400 text-white">PLATINUM DOCTOR</Badge>
                                                </div>
                                                <p className="text-gray-600 mb-2">{doctor?.specialization}</p>
                                                <p className="text-gray-600 mb-4">MBBS, MCPS (Gynecology and Obstetrcian)</p>
                                                <div className="flex gap-8 mb-4">
                                                    <div>
                                                        <p className="font-bold">{doctor?.experience} Years</p>
                                                        <p className="text-gray-600">Experience</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold flex items-center">
                                                            99% <Star className="w-4 h-4 text-yellow-400 ml-1" />
                                                        </p>
                                                        <p className="text-gray-600">Satisfied Patients</p>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-blue-50 rounded-lg inline-flex items-center gap-2 mb-4">
                                                    <Video className="w-5 h-5 text-blue-600" />
                                                    <span>Online Video Consultation (Online)</span>
                                                    <span className="font-bold">Rs. 1,400</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                {/* <Button className="w-full">
                                                    <Video className="w-5 h-5 mr-2" />
                                                    Video Consultation
                                                </Button> */}
                                                <Link href={`/id/${doctor.id}`}>
                                                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Book Appointment</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </>
                )
            )}

        </div>
    )
}
=========
   return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-36">
         <Header isShown={true} />

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
                                             {doctor.image && <AvatarImage src={doctor.image} />}
                                             <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                       </Link>
                                    </div>
                                    <div className="flex-grow">
                                       <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                          <h2 className="text-xl font-bold">{doctor?.name}</h2>
                                          <Badge variant="secondary" className="bg-yellow-400 text-white w-fit">
                                             PLATINUM DOCTOR
                                          </Badge>
                                       </div>
                                       <p className="text-gray-600 mb-2">{doctor?.specialization}</p>
                                       <p className="text-gray-600 mb-4">
                                          MBBS, MCPS (Gynecology and Obstetrcian)
                                       </p>
                                       <div className="flex flex-wrap gap-8 mb-4">
                                          <div>
                                             <p className="font-bold">{doctor?.experience} Years</p>
                                             <p className="text-gray-600">Experience</p>
                                          </div>
                                          <div>
                                             <p className="font-bold flex items-center">
                                                99% <Star className="w-4 h-4 text-yellow-400 ml-1" />
                                             </p>
                                             <p className="text-gray-600">Satisfied Patients</p>
                                          </div>
                                       </div>
                                       <div className="p-4 bg-blue-50 rounded-lg inline-flex items-center gap-2 mb-4 flex-wrap">
                                          <Video className="w-5 h-5 text-blue-600" />
                                          <span>Online Video Consultation (Online)</span>
                                          <span className="font-bold">Rs. 1,400</span>
                                       </div>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full md:w-auto">
                                       <Link href={`/id/${doctor.id}`} className="w-full">
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
>>>>>>>>> Temporary merge branch 2
