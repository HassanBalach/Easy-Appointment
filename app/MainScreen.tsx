"use client";
import React, { useRef, useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { searchDoctor } from "@/lib/action";
import Header from "@/components/header";
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

   // Display the loader if loading is true
   if (loading) {
      return <Loader />;
   }

   return (
      <div className="shadow-2xl">
         <Header isShown={true} />

         {/* Hero and Search Bar */}
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <section className="relative py-8 sm:py-10 md:py-12 lg:pb-36 max-w-7xl mx-auto rounded-2xl bg-gradient-to-l from-[#9FD3C7] to-white">
               <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-4 lg:gap-x-8">
                     <div>
                        <div className="text-center lg:text-left">
                           <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:leading-3 lg:leading-none lg:text-6xl">
                              Find The Best Doctors
                           </h1>
                           <p className="mt-4 text-xl text-gray-600 sm:mt-10 font-inter">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                           </p>
                        </div>
                        <div className="relative p-2 mt-8 sm:mt-10 lg:mt-12">
                           <DialogTrigger asChild>
                              <Button className="w-full inline-flex justify-center items-center px-6 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-6 text-lg sm:text-xl lg:text-lg font-medium text-white bg-[var(--secondary-accent)] rounded-xl transition-all duration-200 focus:bg-[var(--button-hover-background)] hover:bg-[var(--button-hover-background)]">
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

            {/* Dialog Content */}
            <DialogContent className="sm:max-w-[600px] p-0 rounded-2xl">
               <DialogHeader className="p-4 border-b rounded-t-2xl">
                  <div className="flex items-center justify-between">
                     <DialogTitle className="text-xl font-semibold text-center flex-grow pr-8">
                        Search for doctors
                     </DialogTitle>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="h-auto w-auto p-1.5 absolute right-4 rounded-xl"
                        onClick={() => setIsOpen(false)}
                     />
                  </div>
               </DialogHeader>

               <div className="p-4 space-y-2">
                  <div className="relative">
                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                     <Input
                        className="pl-10 pr-24 h-12 bg-gray-50 border-gray-200 rounded-xl"
                        placeholder="Enter location"
                        value={"Hub"}
                     />
                     <Button
                        onClick={handleSearch}
                        variant="outline"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-24 text-lg font-medium hover:bg-[var(--primary-accent)] text-white px-3 bg-[var(--secondary-accent)] rounded-xl"
                     >
                        {searchLoading ? "Searching..." : "Search"}
                     </Button>
                  </div>

                  <div className="relative" ref={searchRef}>
                     <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                     <div
                        className={`relative bg-gray-50 border border-gray-200 rounded-xl ${
                           isSearchFocused ? "ring-2 ring-blue-500" : ""
                        }`}
                     >
                        <Input
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           onFocus={() => setIsSearchFocused(true)}
                           className="w-full pl-10 pr-4 py-3 bg-transparent outline-none rounded-xl"
                           placeholder="Search for doctors, hospitals, specialties, services, diseases"
                        />
                        {isSearchFocused && (
                           <div className="border-t mt-4 max-h-[300px] overflow-y-auto rounded-b-xl">
                              {filteredSpecialties.map((specialty, index) => (
                                 <button
                                    key={index}
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 text-left rounded-xl"
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
