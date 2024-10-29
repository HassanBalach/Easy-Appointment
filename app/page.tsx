"use client";

import React, { useEffect, useState } from "react";
import { Search, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FeaturedDocs } from "@/components/featuredDocs";
import Image from "next/image";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

export default function Page() {
   return (
      <div className="min-h-screen bg-white">
         <header className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Image
               src=""
               alt="oladoc logo"
               width={120}
               height={40}
               className="h-10"
            />
            <nav className="hidden lg:flex items-center space-x-6">
               <Select>
                  <SelectTrigger className="w-[140px]">
                     <SelectValue placeholder="Doctors" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="general">
                        General Practitioners
                     </SelectItem>
                     <SelectItem value="specialists">Specialists</SelectItem>
                     <SelectItem value="dentists">Dentists</SelectItem>
                  </SelectContent>
               </Select>
               <Select>
                  <SelectTrigger className="w-[140px]">
                     <SelectValue placeholder="Hospitals" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="public">Public Hospitals</SelectItem>
                     <SelectItem value="private">Private Hospitals</SelectItem>
                     <SelectItem value="clinics">Clinics</SelectItem>
                  </SelectContent>
               </Select>
               <Select>
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Labs and Diagnostics" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="blood-tests">Blood Tests</SelectItem>
                     <SelectItem value="imaging">Imaging Services</SelectItem>
                     <SelectItem value="specialized">
                        Specialized Tests
                     </SelectItem>
                  </SelectContent>
               </Select>
               <a href="#" className="text-gray-600 hover:text-gray-900">
                  Surgeries
               </a>
               <a href="#" className="text-gray-600 hover:text-gray-900">
                  Health Blog
               </a>
            </nav>
            <div className="flex items-center space-x-4">
               <Button variant="outline">Login/SignUp</Button>
               <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Join as Doctor
               </Button>
            </div>
         </header>

         <main className="container mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-[#6E2E68] to-[#2E307D] p-8 rounded-lg flex justify-between items-center">
               {/* Left Section */}
               <div>
                  <h1 className="text-4xl font-semibold text-white">
                     Find and Book the{" "}
                     <span className="text-yellow-400">Best Doctors</span> near
                     you
                  </h1>
               </div>

               {/* Search Section */}
               <div className="flex items-center bg-white rounded-full shadow-md p-2">
                  {/* Location Input */}
                  <input
                     type="text"
                     placeholder="Karachi"
                     className="p-2 w-32 outline-none border-none rounded-l-full"
                  />
                  {/* Detect Button */}
                  <button className="bg-gray-100 p-2 text-blue-600 flex items-center justify-center rounded-full">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 11c0-.364.097-.706.27-1H4a1 1 0 000 2h8.27a2 2 0 100-2h-2.54c.173.294.27.636.27 1z"
                        />
                     </svg>
                     <span className="ml-1">Detect</span>
                  </button>
                  {/* Search Input */}
                  <input
                     type="text"
                     placeholder="Doctors, Hospital, Conditions"
                     className="p-2 w-60 outline-none border-none"
                  />
                  {/* Search Button */}
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-full">
                     Search
                  </button>
               </div>

               {/* Right Section - Doctor Image */}
               <div>
                  <img
                     src="/doctor-image.png"
                     alt="Doctor"
                     className="h-40 rounded-full"
                  />
               </div>
            </div>

            <FeaturedDocs />
            <section className="mb-8">
               <h2 className="text-2xl font-semibold mb-4">
                  Consult best doctors online
               </h2>
               <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
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

            <section className="mb-8">
               <h2 className="text-2xl font-semibold mb-4">
                  Search doctor by condition
               </h2>
               <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
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

            <section className="mb-8">
               <h2 className="text-2xl font-semibold mb-4">
                  Our Esteemed Partners
               </h2>
               <p className="mb-4">
                  Avail Exclusive partnership benefits for your brand, clients,
                  and employees.
               </p>
               <Button variant="outline">Partner with healthdoc</Button>
               <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-4">
                  {[...Array(8)].map((_, index) => (
                     <div
                        key={index}
                        className="bg-gray-200 h-12 rounded"
                     ></div>
                  ))}
               </div>
            </section>
         </main>

         <footer className="bg-gray-900 text-white py-8">
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
                     <h3 className="text-xl font-bold mb-4">Links</h3>
                     <ul>
                        <li>
                           <Link
                              href="/about"
                              className="text-gray-300 hover:text-gray-400"
                           >
                              About Us
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="/services"
                              className="text-gray-300 hover:text-gray-400"
                           >
                              Services
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="/contact"
                              className="text-gray-300 hover:text-gray-400"
                           >
                              Contact Us
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="/privacy"
                              className="text-gray-300 hover:text-gray-400"
                           >
                              Privacy Policy
                           </Link>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                     <p className="text-sm">
                        <Phone className="inline mr-2" /> +92 123 456 7890
                     </p>
                     <p className="text-sm">
                        <MapPin className="inline mr-2" /> 123 Health St, City,
                        Pakistan
                     </p>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                     <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-gray-300">
                           <svg
                              className="h-6 w-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                           >
                              <path
                                 d="M22 12c0 5.243-3.582 9.623-8.537 10.932.626-1.075 1.123-2.375 1.123-3.632v-1.09h-1.799c-1.141 0-1.494-.707-1.494-1.43v-1.548h3.146l-.404-2.891h-2.742v-1.257c0-.838.234-1.426 1.44-1.426h1.536v-2.46c-.658-.095-1.517-.195-2.238-.195-2.238 0-3.755 1.125-3.755 3.88 0 1.091.195 2.238.195 2.238v2.46h-1.261c-1.141 0-1.494.707-1.494 1.43V12h2.53l-.404 2.891h-2.126v6.987C18.343 21.128 22 16.991 22 12z"
                                 clipRule="evenodd"
                              />
                           </svg>
                        </a>
                        <a href="#" className="text-white hover:text-gray-300">
                           <svg
                              className="h-6 w-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                           >
                              <path d="M12 0c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.627 0 12-5.372 12-12 0-6.627-5.373-12-12-12zm0 22c-5.519 0-10-4.481-10-10s4.481-10 10-10 10 4.481 10 10-4.481 10-10 10zm-1-15h-2v6h2v-6zm4 0h-2v6h2v-6z" />
                           </svg>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}
