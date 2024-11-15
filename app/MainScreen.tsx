"use client";
import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { searchDoctor } from "@/lib/action";
import Header from "@/components/Header";
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

   const [isSearchFocused, setIsSearchFocused] = React.useState(true);
   const searchRef = React.useRef<HTMLDivElement | null>(null);

   React.useEffect(() => {
      function handleClickOutside(event: globalThis.MouseEvent) {
         if (
            searchRef.current &&
            !searchRef.current?.contains(event.target as Node)
         ) {
            setIsSearchFocused(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleSearch = async () => {
      await searchDoctor(searchTerm);

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
         console.log("Change")
         {/* Hero and Search Bar */}
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <section className="relative py-8 sm:py-8 md:py-10 lg:pb-6 max-w-5xl mx-auto rounded-xl bg-gradient-to-l from-[#9FD3C7] to-white">
               <div className="px-4 mx-auto max-w-5xl sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-8">
                     <div className="lg:w-1/2 h-full mt-8 sm:mt-8">
                        <div className="text-center lg:text-left">
                           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 md:text-3xl lg:text-4xl xl:text-5xl">
                              Find The Best Doctors Near You
                           </h1>
                        </div>
                        <div className="relative p-3 mt-8 sm:mt-8 lg:mt-10">
                           <DialogTrigger asChild>
                              <div className="relative">
                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                 <Input
                                    readOnly
                                    placeholder="Search doctors, specialties, conditions..."
                                    className="w-full pl-10 pr-4 py-5 h-14 text-base font-medium text-gray-600 bg-gray-100 rounded-xl shadow-xl hover:border-gray-300 focus:border-blue-500 transition-colors duration-200 cursor-pointer"
                                    onClick={() => {
                                       setIsOpen(true);
                                       setIsSearchFocused(true);
                                    }}
                                 />
                              </div>
                           </DialogTrigger>
                        </div>
                     </div>
                     <div className="lg:w-1/2 mt-8 sm:mt-0 hidden sm:block">
                        <Image
                           src={"/images/hero.png"}
                           alt="hero"
                           width={500}
                           height={500}
                           className="w-full max-w-lg mx-auto"
                        />
                     </div>
                  </div>
               </div>
            </section>

            {/* Dialog Content */}
            <DialogContent className="sm:max-w-[540px] p-0 rounded-2xl sm:mx-auto mx-auto">
               <DialogHeader className="p-5 sm:p-7 border-b rounded-t-2xl">
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

               <div className="p-5 sm:p-7 space-y-5">
                  <div className="relative">
                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                     <Input
                        className="pl-10 pr-4 h-14 text-base bg-gray-50 border-gray-200 rounded-xl"
                        placeholder="Enter location"
                        value={"Hub"}
                        onChange={() => {}}
                     />
                  </div>

                  <div className="relative" ref={searchRef}>
                     <Search className="absolute left-3 top-4 h-5 w-5 text-gray-400 z-10" />
                     <div
                        className={`relative bg-gray-50 border border-gray-200 rounded-xl ${
                           isSearchFocused ? "ring-1 ring-blue-500" : ""
                        }`}
                     >
                        <Input
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           onFocus={() => {
                              setIsSearchFocused(true);
                              handleSearch();
                           }}
                           className="w-full pl-10 pr-3 py-4 bg-transparent outline-none rounded-xl text-base"
                           placeholder="Search for doctors, hospitals, specialties, services, diseases"
                        />
                        {isSearchFocused && (
                           <div className="border-t mt-3 max-h-[260px] overflow-y-auto rounded-b-lg">
                              {filteredSpecialties.map((specialty, index) => (
                                 <button
                                    key={index}
                                    className="w-full flex items-center text-base justify-between px-5 py-4 hover:bg-gray-100 text-left rounded-xl"
                                    onClick={async () => {
                                       setSearchTerm(specialty.name);
                                       setIsSearchFocused(false);
                                       setLoading(true);
                                       await router.push(
                                          `/search-results?term=${specialty.name}`
                                       );
                                       setLoading(false);
                                       setIsOpen(false);
                                    }}
                                 >
                                    <div className="flex items-center gap-4">
                                       <Search className="h-4 w-4 text-gray-400" />
                                       <span className="text-gray-900">
                                          {specialty.name}
                                       </span>
                                    </div>
                                    <span className="text-gray-500 text-sm hidden sm:inline">
                                       {specialty.description}
                                    </span>
                                 </button>
                              ))}
                           </div>
                        )}
                     </div>
                     {/* <Button
                        onClick={async () => {
                           if (!searchTerm) return;
                           setLoading(true);
                           await router.push(`/search-results?term=${searchTerm}`);
                           setLoading(false);
                           setIsOpen(false);
                        }}
                        disabled={loading}
                        className="absolute right-3 top-2 bg-[var(--primary-accent)] text-white hover:bg-[var(--primary-accent)]/90"
                     >
                        {loading ? (
                           <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Searching...
                           </div>
                        ) : (
                           "Search"
                        )}
                     </Button> */}
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