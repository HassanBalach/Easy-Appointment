"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import React, { useRef, useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchDoctor } from "@/lib/action";
import Header from "@/components/Header";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import Speciality from "@/components/home/speciality";
import DoctorsCarousel from "@/components/home/doctors-caraousel";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import Testimonials from "@/components/home/testimonials";

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
   const [loading, setLoading] = useState(false);
   const [searchLoading, setSearchLoading] = useState(false);
   const dropdownRef = useRef<HTMLDivElement | null>(null);

   const [isSearchFocused, setIsSearchFocused] = React.useState(false);
   const searchRef = React.useRef<HTMLDivElement | null>(null);

   React.useEffect(() => {
      function handleClickOutside(event: any) {
         if (searchRef.current && !searchRef.current?.contains(event.target)) {
            setIsSearchFocused(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleSearch = async () => {
      setSearchLoading(true);
      await searchDoctor(searchTerm);
      setSearchLoading(false);
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
   // Display the loader if loading is true
   if (loading) {
      return <Loader />;
   }

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
      <div className="shadow-2xl">
         <Header isShown={true} />

         {/* Hero and Search Bar */}
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <section className="relative py-3 sm:py-6 md:py-8 lg:pb-4 max-w-5xl mx-auto rounded-xl bg-gradient-to-l from-[#9FD3C7] to-white">
               <div className="px-4 mx-auto max-w-5xl sm:px-5 lg:px-7">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-7">
                     <div className="lg:w-1/2 h-full mt-4 sm:mt-7">
                        <div className="text-center lg:text-left">
                           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 md:text-3xl lg:text-3xl xl:text-4xl">
                              Find The Best Doctors Near You
                           </h1>
                     
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
                        <div className="relative p-2 mt-5 sm:mt-7 lg:mt-9">
                           <DialogTrigger asChild>
                              <Button className="w-full inline-flex justify-center items-center px-4 py-3 sm:px-5 sm:py-4 lg:px-4 lg:py-3 text-base sm:text-lg lg:text-base font-medium text-white bg-[var(--secondary-accent)] rounded-xl transition-all duration-200 focus:bg-[var(--button-hover-background)] hover:bg-[var(--button-hover-background)]">
                                 Search Doctors
                              </Button>
                           </DialogTrigger>
                        </div>
                     </div>
                     <div className="lg:w-1/2 mt-4 sm:mt-0 hidden sm:block">
                        <Image
                           src={"/images/hero.png"}
                           alt="hero"
                           width={450}
                           height={450}
                           className="w-full max-w-md mx-auto"
                        />
                     </div>
                  </div>
               </div>
            </section>

            {/* Dialog Content */}
            <DialogContent className="sm:max-w-[540px] p-0 rounded-2xl sm:mx-auto mx-auto">
               <DialogHeader className="p-4 sm:p-6 border-b rounded-t-2xl">
                  <div className="flex items-center justify-between">
                     <DialogTitle className="text-lg sm:text-xl font-semibold text-center flex-grow pr-6">
                        Search for doctors
                     </DialogTitle>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="h-auto w-auto p-0 absolute right-3 rounded-xl"
                        onClick={() => setIsOpen(false)}
                     />
                  </div>
               </DialogHeader>

               <div className="p-4 sm:p-6 space-y-4">
                  <div className="relative">
                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                     <Input
                        className="pl-10 pr-24 h-12 text-base bg-gray-50 border-gray-200 rounded-xl"
                        placeholder="Enter location"
                        value={"Hub"}
                        onChange={() => {}}
                     />
                     <Button
                        onClick={handleSearch}
                        variant="outline"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-9 text-sm font-medium hover:bg-[var(--primary-accent)] text-white px-4 bg-[var(--secondary-accent)] rounded-xl"
                     >
                        {searchLoading ? "Searching..." : "Search"}
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

                  <div className="relative" ref={searchRef}>
                     <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 z-10" />
                     <div
                        className={`relative bg-gray-50 border border-gray-200 rounded-xl ${
                           isSearchFocused ? "ring-1 ring-blue-500" : ""
                        }`}
                     >
                        <Input
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           onFocus={() => setIsSearchFocused(true)}
                           className="w-full pl-10 pr-3 py-3 bg-transparent outline-none rounded-xl text-base"
                           placeholder="Search for doctors, hospitals, specialties, services, diseases"
                        />
                        {isSearchFocused && (
                           <div className="border-t mt-2.5 max-h-[240px] overflow-y-auto rounded-b-lg">
                              {filteredSpecialties.map((specialty, index) => (
                                 <button
                                    key={index}
                                    className="w-full flex items-center text-base justify-between px-4 py-3 hover:bg-gray-100 text-left rounded-xl"
                                    onClick={() => {
                                       setSearchTerm(specialty.name);
                                       setIsSearchFocused(false);
                                    }}
                                 >
                                    <div className="flex items-center gap-3">
                                       <Search className="h-4 w-4 text-gray-400" />
                                       <span className="text-gray-900">
                                          {specialty.name}
                                       </span>
                                    </div>
                                    <span className="text-gray-500 text-sm">
                                       {specialty.description}
                                    </span>
                                 </button>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </DialogContent>
         </Dialog>

         <DoctorsCarousel />
         <Speciality />
         <Testimonials />
         <Footer />
      </div>
   );
}