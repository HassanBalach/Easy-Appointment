import React from "react";
import Image from "next/image";
import Link from "next/link";

const specialities = [
   { field: "Gynecologist", image: "gynecologist.png", alt: "Gynecologist" },
   { field: "Dermatologist", image: "dermatologist.png", alt: "Dermatologist" },
   { field: "Orthopedic Surgeon", image: "orthopedic-surgeon.png", alt: "Orthopedic Surgeon" },
   { field: "ENT Specialist", image: "ent-specialist.png", alt: "ENT Specialist" },
   { field: "Diabetes", image: "diabetes.png", alt: "Diabetes Specialist" },
   { field: "Eye-Specialist", image: "eye-specialist.png", alt: "Eye Specialist" },
   { field: "Fever", image: "fever.png", alt: "Fever Treatment Specialist" },
   { field: "Cardiologist", image: "cardiologist.png", alt: "Cardiologist" },
   { field: "Pregnancy", image: "pregnancy.png", alt: "Pregnancy Specialist" },
   { field: "Hematologist", image: "hematologist.png", alt: "Hematologist" },
   { field: "Urologist", image: "urologist.png", alt: "Urologist" },
   { field: "General Physician", image: "general-physician.png", alt: "General Physician" },
]


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
            {specialities.map((specialty, index) => (
               <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center"
               >
                  {/* Image Container */}
                  <Link href={`/search-results?term=${specialty.field}`}>
                     <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full shadow-md mb-2 overflow-hidden ${specialty.field === "General Physician" ? "ml-3" : ""
                           } 
                        ${specialty.field === "Orthopedic Surgeon" ? "ml-4" : ""}
                        }`}
                     >
                        <Image
                           src={`/images/${specialty.image}`}
                           alt={`${specialty.alt}`}
                           width={80}
                           height={80}
                           className="rounded-full object-cover w-full h-full"
                           loading="lazy"
                        />
                     </div>
                     {/* Specialty Name */}
                     <p className="text-xs sm:text-sm font-medium text-gray-700">
                        {specialty.field.replace("-", " ")}
                     </p>
                  </Link>
               </div>
            ))}
         </div>
      </section>
   );
}

export default Speciality;
