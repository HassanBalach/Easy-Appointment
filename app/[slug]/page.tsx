"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Video, Filter, MapPin, Stethoscope, Clock } from "lucide-react";
import Image from "next/image";
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
<<<<<<< HEAD
    const searchParams = useSearchParams();
    const slug = searchParams?.get('term');
    const [doctorData, setDoctorData] = useState<any>(null)
=======
   const searchParams = useSearchParams();
   const slug = searchParams.get("term");
   const [doctorData, setDoctorData] = useState<any>(null);
   const [filters, setFilters] = useState({
      experience: "all",
      fees: "all",
      availability: "all",
   });
>>>>>>> 24d08aff0544948f7f9be51958c79ce9e36b578d

   useEffect(() => {
      async function fetchData() {
         if (slug) {
            const data = await searchDoctor(slug);
            setDoctorData(data);
         }
      }
      fetchData();
   }, [slug]);

<<<<<<< HEAD
=======
   return (
      <div className="container mx-auto px-36">
         <Header isShown={true} />

         {doctorData && (
            <>
               {/* Filter Section */}
               <div className="my-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 flex-wrap">
                     <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        <span className="font-semibold">Filters:</span>
                     </div>
>>>>>>> 24d08aff0544948f7f9be51958c79ce9e36b578d

                     <Button
                        variant="outline"
                        className="flex items-center gap-2"
                     >
                        <MapPin className="w-4 h-4" />
                        Location
                     </Button>

                     <Button
                        variant="outline"
                        className="flex items-center gap-2"
                     >
                        <Stethoscope className="w-4 h-4" />
                        Specialization
                     </Button>

<<<<<<< HEAD
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
=======
                     <Button
                        variant="outline"
                        className="flex items-center gap-2"
                     >
                        <Clock className="w-4 h-4" />
                        Availability
                     </Button>

                     <Button variant="outline">Experience: 5+ years</Button>
>>>>>>> 24d08aff0544948f7f9be51958c79ce9e36b578d

                     <Button variant="outline">Fees: ₹0-1500</Button>
                  </div>
               </div>

               {/* Sort Section */}
               <div className="mb-6 flex justify-between items-center">
                  <div className="flex gap-4">
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="fees">
                           <AccordionTrigger className="text-blue-600">
                              Sort by: Fees
                           </AccordionTrigger>
                           <AccordionContent>
                              <div className="flex flex-col gap-2">
                                 <Button variant="ghost" className="justify-start">Low to High</Button>
                                 <Button variant="ghost" className="justify-start">High to Low</Button>
                              </div>
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                     <Button variant="ghost" className="text-blue-600">
                        Sort by: Experience
                     </Button>
                     <Button variant="ghost" className="text-blue-600">
                        Sort by: Rating
                     </Button>
                  </div>

                  <div className="flex gap-2">
                     <Button variant="outline" className="bg-white">
                        Available Today
                     </Button>
                     <Button variant="outline" className="bg-white">
                        Video Consult
                     </Button>
                  </div>
               </div>

               {doctorData.length === 0 ? (
                  <h1 className="text-3xl font-bold mb-2">No Data Found</h1>
               ) : (
                  <div className="my-16">
                     <h1 className="text-3xl font-bold mb-2">
                        {doctorData.length} Best in Hub
                     </h1>
                     {doctorData.map((doctor: any) => (
                        <div key={doctor.id} className="mb-4">
                           <Card className="w-full">
                              <CardContent className="p-6">
                                 <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0">
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
                                       <div className="flex items-center gap-2 mb-2">
                                          <h2 className="text-xl font-bold">
                                             {doctor?.name}
                                          </h2>
                                          <Badge
                                             variant="secondary"
                                             className="bg-yellow-400 text-white"
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
                                       <div className="flex gap-8 mb-4">
                                          <div>
                                             <p className="font-bold">
                                                5 Years
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
                                       <div className="p-4 bg-blue-50 rounded-lg inline-flex items-center gap-2 mb-4">
                                          <Video className="w-5 h-5 text-blue-600" />
                                          <span>
                                             Online Video Consultation (Online)
                                          </span>
                                          <span className="font-bold">
                                             Rs. 1,400
                                          </span>
                                       </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                       <Link href={`/id/${doctor.id}`}>
                                          <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                             Book Appointment
                                          </Button>
                                       </Link>
                                       <Button
                                          variant="outline"
                                          className="w-full"
                                       >
                                          View Profile
                                       </Button>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        </div>
                     ))}
                  </div>
               )}
            </>
         )}
      </div>
   );
}
