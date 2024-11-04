"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function Carousel() {
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

   const items = [
      {
         id: 1,
         name: "Dr. Emily Chen",
         specialty: "Cardiologist",
         image: "/placeholder.svg?height=300&width=400",
      },
      {
         id: 2,
         name: "Dr. Michael Lee",
         specialty: "Neurologist",
         image: "/placeholder.svg?height=300&width=400",
      },
      {
         id: 3,
         name: "Dr. Sarah Johnson",
         specialty: "Pediatrician",
         image: "/placeholder.svg?height=300&width=400",
      },
      {
         id: 4,
         name: "Dr. David Brown",
         specialty: "Orthopedic Surgeon",
         image: "/placeholder.svg?height=300&width=400",
      },
      {
         id: 5,
         name: "Dr. Lisa Taylor",
         specialty: "Dermatologist",
         image: "/placeholder.svg?height=300&width=400",
      },
      {
         id: 6,
         name: "Dr. James Wilson",
         specialty: "Oncologist",
         image: "/placeholder.svg?height=300&width=400",
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
                              {item.specialty}
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
