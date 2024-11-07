"use client";
import React, { useRef, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { searchDoctor } from "@/lib/action";
import Header from "@/components/header";
import Speciality from "@/components/home/speciality";
import DoctorsCarousel from "@/components/home/doctors-caraousel";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Footer from "@/components/footer";
import Loader from "@/components/loader";

type Specialties = {
   name: string;
   description: string;
};

export default function MainScreen({
   specialties,
}: {
   specialties: Specialties[];
}) {
   const router = useRouter();
   const [isOpen, setIsOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [loading, setLoading] = useState(false); // New loading state
   const dropdownRef = useRef<HTMLDivElement | null>(null);

   const handleSearch = async () => {
      setLoading(true); // Set loading to true when search starts
      await searchDoctor(searchTerm);
      setLoading(false); // Set loading to false after search completes
      router.push(`/search-results?term=${encodeURIComponent(searchTerm)}`);
   };

   const filteredSpecialties = specialties.filter(
      (specialty) =>
         specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         specialty.description.toLowerCase().includes(searchTerm.toLowerCase())
   );

   if (loading) {
      return <Loader />;
   }

   return (
      <div className="shadow-2xl">
         {/* Header */}
         <Header isShown={true} />

         {/* Hero and Search Bar */}
         <Dialog>
            {/* Hero Section */}
            <section className="relative py-12 sm:py-16 lg:py-20 lg:pb-36 bg-[var(--primary-accent)] max-w-7xl mx-auto rounded-2xl">
               <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-4 lg:gap-x-8">
                     <div>
                        <div className="text-center lg:text-left">
                           <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:leading-3 lg:leading-none lg:text-6xl">
                              Find The Best Doctors
                           </h1>
                           <p className="mt-4 text-xl text-gray-600 sm:mt-10 font-inter">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Vehicula massa in enim luctus. Rutrum arcu.
                           </p>
                        </div>
                        <div className="relative p-2 mt-8 sm:mt-10 lg:mt-12">
                           <DialogTrigger asChild>
                              <Button
                                 className="w-full inline-flex justify-center items-center 
                    px-6 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-6 
                    text-lg sm:text-xl lg:text-lg font-medium 
                    text-white bg-[var(--secondary-accent)] rounded-xl 
                    transition-all duration-200 
                   focus:bg-[var(--button-hover-background)] hover:bg-[var(--button-hover-background)]"
                              >
                                 Search Doctors
                              </Button>
                           </DialogTrigger>
                        </div>
                     </div>

                     <div className="mr-8">
                        <Image
                           src={"/images/hero.png"}
                           alt="hero"
                           width={700}
                           height={700}
                        />
                     </div>
                  </div>
               </div>
            </section>
            {/* Search Bar */}
            <div className="container flex flex-col items-center justify-center mx-auto px-4 py-4 lg:px-32 rounded-full">
               {loading ? (
                  <Loader />
               ) : (
                  <DialogContent className="w-full max-w-7xl mx-auto py-6 px-6">
                     <DialogHeader className="flex flex-col gap-2">
                        <DialogTitle className="text-[40px] font-bold">
                           Find Doctor
                        </DialogTitle>
                        <DialogDescription className="text-lg font-medium">
                           Make changes to your profile here. Click save when
                           you're done.
                        </DialogDescription>
                     </DialogHeader>

                     <div className="flex flex-col space-y-10">
                        <div className="flex space-x-6">
                           <div className="relative flex-grow">
                              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                              <Input
                                 type="text"
                                 placeholder="Hub"
                                 className="pl-10 pr-8 py-6 w-full text-xl rounded-xl"
                              />
                           </div>
                           <div
                              className="relative flex-grow"
                              ref={dropdownRef}
                           >
                              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                              <Input
                                 type="text"
                                 placeholder="Doctors, Hospital, Conditions"
                                 className="pl-12 pr-6 py-6 w-full text-xl rounded-xl"
                                 onFocus={() => setIsOpen(true)}
                                 value={searchTerm}
                                 onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              {isOpen && (
                                 <Card className="bg-none absolute z-10 w-full mt-3 max-w-xl rounded-lg overflow-hidden shadow-2xl">
                                    <CardContent className="p-2 overflow-y-auto custom-scrollbar max-h-[300px]">
                                       {filteredSpecialties.length > 0 ? (
                                          filteredSpecialties.map(
                                             (specialty, index) => (
                                                <Button
                                                   key={index}
                                                   variant="ghost"
                                                   className="w-full justify-start text-left py-4 px-6 hover:bg-gray-100 focus:bg-gray-200 rounded-lg transition duration-200 ease-in-out mb-3"
                                                   onClick={() => {
                                                      setSearchTerm(
                                                         specialty.name
                                                      );
                                                      setIsOpen(false);
                                                   }}
                                                >
                                                   <div>
                                                      <div className="font-semibold text-gray-900 text-xl">
                                                         {specialty.name}
                                                      </div>
                                                      <div className="text-sm text-gray-600">
                                                         {specialty.description}
                                                      </div>
                                                   </div>
                                                </Button>
                                             )
                                          )
                                       ) : (
                                          <div className="text-gray-500 text-center py-4">
                                             No results found
                                          </div>
                                       )}
                                    </CardContent>
                                 </Card>
                              )}
                           </div>
                        </div>
                     </div>

                     <DialogFooter>
                        <Button
                           className="w-full bg-[var(--secondary-accent)]
                        [var(--button-hover-background)] hover:bg-[var(--button-hover-background)] text-white font-medium h-12 text-2xl rounded-xl focus:ring-[var(--primary-accent)]"
                           onClick={handleSearch}
                        >
                           Search
                        </Button>
                     </DialogFooter>
                  </DialogContent>
               )}
            </div>
         </Dialog>

         {/* Featured Doctors */}
         <DoctorsCarousel />

         {/* Specialities */}
         <Speciality />

         {/* Footer */}
         <Footer />
      </div>
   );
}
