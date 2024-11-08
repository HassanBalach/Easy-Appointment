import React from "react";
import Image from "next/image";
import Link from "next/link";

function Speciality() {
   return (
      <section className="my-10 sm:my-16 flex flex-col items-center justify-center max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
         {/* Section Header */}
         <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold my-4">
               Find By Speciality
            </h2>
            <h3 className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto my-4">
               We have a wide range of doctors across different specialties to
               ensure you get the best care possible.
            </h3>
         </div>

         {/* Speciality Grid */}
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
            {[
               "Gynecologist",
               "Skin-Specialist",
               "Orthopedic",
               "ENT-Specialist",
               "Diabetes",
               "Eye-Specialist",
               "Fever",
               "Heart-Attack",
               "Pregnancy",
               "High-Blood",
               "Piles",
               "Diarrhea",
            ].map((specialty, index) => (
               <div
                  key={index}
                  className="flex flex-col items-center text-center"
               >
                  {/* Image Container */}
                  <Link href={`/search-results?term=${specialty}`}>
                     <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-full shadow-md mb-2 overflow-hidden">
                        <Image
                           src={`/images/${specialty}.png`}
                           alt={specialty}
                           width={96}
                           height={96}
                           className="rounded-full object-cover w-full h-full"
                        />
                     </div>
                     {/* Specialty Name */}
                     <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
                        {specialty.replace("-", " ")}
                     </p>
                  </Link>
               </div>
            ))}
         </div>
      </section>
   );
}

export default Speciality;
