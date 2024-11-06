"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchDoctor } from "@/lib/action";
import Header from "@/components/Header";
import FeaturedDoctors from "@/components/FeaturedDoctors";

type Specialty = {
   name: string;
   description: string;
};

export default function Component({
   specialties = [],
}: {
   specialties: Specialty[];
}) {
   const router = useRouter();
   const [isOpen, setIsOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const dropdownRef = useRef<HTMLDivElement | null>(null);

   const handleSearch = async () => {
      await searchDoctor(searchTerm);
      router.push(`/search-results?term=${encodeURIComponent(searchTerm)}`);
   };

   const filteredSpecialties = specialties.filter(
      (specialty) =>
         specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         specialty.description.toLowerCase().includes(searchTerm.toLowerCase())
   );

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [dropdownRef]);

   return (
      <div className="min-h-screen bg-gray-50">
         <Header isShown={true} />

         <main className="container mx-auto px-4 py-8 space-y-12">
            <Card className="w-full max-w-7xl mx-auto">
               <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center">
                     Find and Book the{" "}
                     <span className="text-orange-500">Best Doctors</span> near
                     you
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex flex-col space-y-4">
                     <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="relative flex-grow">
                           <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                           <Input
                              type="text"
                              placeholder="Hub"
                              className="pl-10 pr-4 py-2 w-full"
                           />
                        </div>
                        <div className="relative flex-grow" ref={dropdownRef}>
                           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                           <Input
                              type="text"
                              placeholder="Doctors, Hospital, Conditions"
                              className="pl-10 pr-4 py-2 w-full"
                              onFocus={() => setIsOpen(true)}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                           />
                           {isOpen && (
                              <Card className="absolute z-10 w-full mt-1 overflow-hidden">
                                 <CardContent className="p-0 max-h-[200px] overflow-y-auto">
                                    {filteredSpecialties.map(
                                       (specialty, index) => (
                                          <Button
                                             key={index}
                                             variant="ghost"
                                             className="w-full justify-start text-left"
                                             onClick={() => {
                                                setSearchTerm(specialty.name);
                                                setIsOpen(false);
                                             }}
                                          >
                                             <div>
                                                <div className="font-bold">
                                                   {specialty.name}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                   {specialty.description}
                                                </div>
                                             </div>
                                          </Button>
                                       )
                                    )}
                                 </CardContent>
                              </Card>
                           )}
                        </div>
                     </div>
                     <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={handleSearch}
                     >
                        Search
                     </Button>
                  </div>
               </CardContent>
            </Card>

            <section>
               <h2 className="text-2xl font-semibold mb-6">Featured Doctors</h2>
               <FeaturedDoctors />
            </section>

            <section>
               <h2 className="text-2xl font-semibold mb-6">
                  Consult best doctors online
               </h2>
               <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
                  {[
                     "Gynecologist",
                     "Skin Specialist",
                     "Child Specialist",
                     "Orthopedic Surgeon",
                     "ENT Specialist",
                     "Diabetes Specialist",
                     "Eye Specialist",
                  ].map((specialty, index) => (
                     <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm">{specialty}</p>
                     </div>
                  ))}
               </div>
            </section>

            <section>
               <h2 className="text-2xl font-semibold mb-6">
                  Search doctor by condition
               </h2>
               <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
                  {[
                     "Fever",
                     "Heart Attack",
                     "Pregnancy",
                     "High Blood Pressure",
                     "Piles",
                     "Diarrhea",
                     "Acne",
                  ].map((condition, index) => (
                     <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm">{condition}</p>
                     </div>
                  ))}
               </div>
            </section>

            <section>
               <h2 className="text-2xl font-semibold mb-4">
                  Our Esteemed Partners
               </h2>
               <p className="mb-4">
                  Avail Exclusive partnership benefits for your brand, clients
                  and employees.
               </p>
               <Button variant="outline">Partner with healthdoc</Button>
               <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-6">
                  {[...Array(8)].map((_, index) => (
                     <div
                        key={index}
                        className="bg-gray-200 h-12 rounded"
                     ></div>
                  ))}
               </div>
            </section>
         </main>

         <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
               <div className="grid md:grid-cols-4 gap-8">
                  <div>
                     <h3 className="text-xl font-bold mb-4">healthdoc</h3>
                     <p className="text-sm">
                        Book appointments with the best Doctors and Specialists
                        such as Gynecologists, Skin Specialists, Child
                        Specialists, Surgeons, etc.
                     </p>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold mb-4">Services</h3>
                     <ul className="space-y-2">
                        <li>Consult Online</li>
                        <li>In-Clinic Appointments</li>
                        <li>Laboratory Tests</li>
                        <li>Surgeries</li>
                     </ul>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold mb-4">About</h3>
                     <ul className="space-y-2">
                        <li>Our Story</li>
                        <li>Contact Us</li>
                        <li>Careers</li>
                        <li>FAQs</li>
                     </ul>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                     <div className="flex space-x-4">
                        <Facebook className="w-6 h-6" />
                        <Twitter className="w-6 h-6" />
                        <Instagram className="w-6 h-6" />
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}
