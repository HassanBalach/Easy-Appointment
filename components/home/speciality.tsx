import React from "react";
import Image from "next/image";
import Link from "next/link";

function Speciality() {
   return (
      <section className="my-10 sm:my-16 flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="sm:my-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
               Find By Speciality
            </h2>
            <h3 className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-lg mx-auto">
               We have a wide range of doctors across different specialties to
               ensure you get the best care possible.
            </h3>
         </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 w-full">
            {[
               "Gynecologist",
               "Skin-Specialist",
               "Orthopedic-Surgeon",
               "ENT-Specialist",
               "Diabetes-Specialist",
               "Eye-Specialist",
               "Fever",
               "Cardiologist",
               "Pregnancy",
               "High-Blood-Pressure",
               "Piles",
               "Diarrhea",
            ].map((specialty, index) => (
               <div
                  key={index}
                  className="text-center flex flex-col items-center"
               >
                  <Link href={`/search-results?term=${specialty}`}>
                     <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full shadow-2xl mb-2">
                        <Image
                           src={`/images/${specialty}.png`}
                           alt={specialty}
                           width={96}
                           height={96}
                           className="rounded-full object-cover w-full h-full"
                        />
                     </div>
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
