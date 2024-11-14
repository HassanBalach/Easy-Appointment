import React from "react";
import Image from "next/image";
import Link from "next/link";

function Speciality() {
   return (
      <section className="my-6 sm:my-10 flex flex-col items-center justify-center max-w-5xl mx-auto px-2 sm:px-4 lg:px-5">
         {/* Section Header */}
         <div className="text-center mb-3 sm:mb-5">
            <h2 className="text-xl sm:text-xl lg:text-[2rem] font-semibold mb-1 sm:my-2">
               Find By Speciality
            </h2>
            <h3 className="text-xs sm:text-xs lg:text-sm text-gray-500 max-w-[35rem] mx-auto my-2">
               We have a wide range of doctors across different specialties to
               ensure you get the best care possible.
            </h3>
         </div>

         {/* Speciality Grid */}
         <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 w-full">
            {[
               "Gynecologist",
               "Dermatologist",
               "Orthopedic Surgeon",
               "ENT Specialist",
               "Diabetes",
               "Eye-Specialist",
               "Fever",
               "Cardiologist",
               "Pregnancy",
               "Hematologist",
               "Urologist",
               "General Physician",
            ].map((specialty) => (
               <div
                  key={specialty}
                  className="flex flex-col items-center justify-center text-center"
               >
                  {/* Image Container */}
                  <Link href={`/search-results?term=${specialty}`}>
                     <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full shadow-md mb-2 overflow-hidden ${
                           specialty === "General Physician" ? "ml-3" : ""
                        } 
                        ${specialty === "Orthopedic Surgeon" ? "ml-4" : ""}
                        }`}
                     >
                        <Image
                           src={`/images/${specialty}.png`}
                           alt={specialty}
                           width={80}
                           height={80}
                           className="rounded-full object-cover w-full h-full"
                           loading="lazy"
                        />
                     </div>
                     {/* Specialty Name */}
                     <p className="text-xs sm:text-sm font-medium text-gray-700">
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
