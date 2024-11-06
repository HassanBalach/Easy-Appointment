"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function FeaturedDoctors() {
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
   // E:\MyLearnings\EasyAppointment\easy-appointment\public\images\Dr.Majeed.png
   const items = [
      {
         id: 1,
         name: "",
         image: "/images/Dr.Majeed.png",
      },
      {
         id: 2,
         name: "",
         image: "/images/Doctor.jpg",
      },
      {
         id: 3,
         name: "",
         image: "/images/surger.webp",
      },
    
      {
         id: 4,
         name: "",
         image: "/images/doctor2.jpg",
      },
      {
         id: 5,
         name: "",
         image: "/images/doctor3.webp",
      },
      {
         id: 6,
         name: "",
         image: "/images/doctor4.jpg",
      },
   ];

   return (
      <div className="w-full max-w-[1440px] mx-auto overflow-hidden rounded-md">
         <div className="embla" ref={emblaRef}>
            <div className="flex">
               {[...items, ...items].map((item, index) => (
                  <div
                     key={`${item.id}-${index}`}
                     className="relative min-w-[100%] md:min-w-[50%] lg:min-w-[33.33%] xl:min-w-[25%] pl-4"
                  >
                     <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image
                           src={item.image}
                           alt={item.name}
                           fill
                           className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center">
                           <h3 className="text-xl font-bold text-white">
                              {item.name}
                           </h3>
                           <p className="text-sm text-white">
                              {/* {item.specialty} */}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
