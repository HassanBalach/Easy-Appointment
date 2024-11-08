"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Doctor {
   id: number;
   available: boolean;
   imageUrl: string;
}

const imageUrls = [
   "/images/Doctor.jpg",
   "/images/doctor2.jpg",
   "/images/doctor4.jpg",
   "/images/Dr.Majeed.png",
   "/images/surger.webp",
];

export default function DoctorsCarousel() {
   const [emblaRef] = useEmblaCarousel(
      {
         loop: true,
         dragFree: true,
         containScroll: "trimSnaps",
      },
      [
         Autoplay({
            playOnInit: true,
            delay: 2500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
         }),
      ]
   );

   const doctors: Doctor[] = Array(5)
      .fill(null)
      .map((_, index) => ({
         id: index + 1,
         
          
         available: true,
         imageUrl: imageUrls[index % imageUrls.length], // Loop through the images
      }));

   return (
      <div className="py-6 sm:py-8 md:py-10 px-6 sm:px-8 lg:px-10 mx-auto max-w-7xl">
         <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
               Top Doctors to Book
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
               Simply browse through our extensive list of trusted doctors.
            </p>
         </div>

         <div className="embla overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
               {doctors.map((doctor) => (
                  <div
                     key={doctor.id}
                     className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_40%] min-w-0 pl-4 sm:pl-6 cursor-pointer"
                  >
                     <Card className="overflow-hidden bg-slate-50 h-full relative rounded-xl">
                        {doctor.available && (
                           <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                              Available
                           </div>
                        )}
                        <div className="aspect-[4/3] relative">
                           <img
                              src={doctor.imageUrl}
                              alt="Doctor"
                              className="object-cover w-full h-full"
                           />
                           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-center text-white p-2">
                              
                           </div>
                        </div>
                     </Card>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
