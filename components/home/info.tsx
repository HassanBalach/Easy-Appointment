import * as React from "react";
import { ArrowRight } from "lucide-react"; // You can use any icon library or an SVG

export default function InfoCards() {
   const cardData = [
      {
         title: "Find Doctor",
         description: "For treatment when registering via the website",
      },
      {
         title: "Free Consultation",
         description: "For all types of medical service available here",
      },
      {
         title: "Get Your Solution",
         description:
            "Here, we'll assess, create a plan of care, and consult the best physician.",
      },
   ];

   return (
      <div className="mx-auto max-w-5xl">
         <div className="flex justify-center gap-4 py-6">
            {cardData.map((card, index) => (
               <div
                  key={index}
                  className="flex flex-col justify-between p-6 bg-purple-100 rounded-2xl w-96 h-40"
               >
                  <div>
                     <h3 className="font-semibold text-lg mb-2">
                        {card.title}
                     </h3>
                     <p className="text-sm text-gray-700">{card.description}</p>
                  </div>
                  <div className="flex justify-end">
                     <ArrowRight className="w-5 h-5 text-gray-700" />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
