import React from "react";

const RatingStars = ({ rating }: { rating: number }) => {
   return (
      <div className="flex items-center">
         {[...Array(rating)].map((_, index) => (
            <svg
               key={index}
               className="w-2 h-2 sm:w-3 sm:h-3 text-[#FDB241]"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
            >
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
         ))}
      </div>
   );
};

const reviews = [
   {
      rating: 5,
      text: "Welcome to LasDoc, your friendly healthcare hub! We're making quality care easily accessible, thanks to innovative tech and compassionate experts.",
      name: "Hassan Qazy",
      role: "Co-founder of LasDoc", 
      // image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female-1.png"
   },
   {
      rating: 5,
      text: "LasDoc is your modern healthcare buddy! We're bringing doctors to your doorstep (or device!) with cutting-edge tech and a warm, caring touch.",
      name: "Siraj Burfat",
      role: "Co-founder of LasDoc",
      // image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
   },
   {
      rating: 5,
      text: "Meet LasDoc, your partner in health! Our innovative platform connects you with top medical minds, making healthcare easy, approachable, and totally stress-free.",
      name: "Ghulam Mubeen ", 
      role: "Founder of TheMudHouseStudio",
      // image: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female-2.png"
   }
];

function Testimonials() {
   return (
      <section className="py-4 sm:py-6 md:py-8 max-w-4xl mx-auto px-3 sm:px-4 lg:px-5">
         <div className="px-2 mx-auto max-w-4xl sm:px-4 lg:px-5">
            <div className="text-center">
               <p className="text-xs sm:text-sm font-medium text-gray-600 font-pj">
               Founders vision 
               </p>
               <h2 className="mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-gray-900 font-pj">
               Your Voice, Your Health
               </h2>
            </div>

            <div className="mt-3 sm:mt-5 text-center md:mt-8 md:order-3">
               <a
                  href="#"
                  className="pb-0.5 sm:pb-1 text-xs sm:text-sm font-bold leading-5 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
               >
                Innovated by TheMudHouseStudio
               </a>
            </div>

            <div className="relative mt-4 sm:mt-6 md:mt-10 md:order-2">
               <div className="absolute -inset-x-1 inset-y-8 sm:inset-y-10 md:-inset-x-1 md:-inset-y-4">
                  <div
                     className="w-full h-full max-w-4xl mx-auto rounded-xl sm:rounded-2xl opacity-30 blur-lg filter"
                     style={{
                        background:
                           "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                     }}
                  ></div>
               </div>

               <div className="relative grid max-w-md grid-cols-1 gap-3 sm:gap-4 mx-auto md:max-w-none lg:gap-6 md:grid-cols-3">
                  {reviews.map((review, index) => (
                     <div key={index} className="flex flex-col overflow-hidden shadow-lg sm:shadow-xl">
                        <div className="flex flex-col justify-between flex-1 p-2.5 sm:p-3 bg-white lg:py-4 lg:px-4">
                           <div className="flex-1">
                              <RatingStars rating={review.rating} />
                              <blockquote className="flex-1 mt-2 sm:mt-3">
                                 <p className="text-xs sm:text-sm leading-relaxed text-gray-900 font-pj">
                                    {review.text}
                                 </p>
                              </blockquote>
                           </div>

                           <div className="flex items-center mt-3 sm:mt-4">
                              {/* <img
                                 className="flex-shrink-0 object-cover rounded-full w-6 h-6 sm:w-7 sm:h-7"
                                 src={review.image}
                                 alt={review.name}
                              /> */}
                              <div className="ml-2 sm:ml-3">
                                 <p className="text-xs sm:text-sm font-bold text-gray-900 font-pj">
                                    {review.name}
                                 </p>
                                 <p className="mt-0.5 text-[10px] sm:text-xs font-pj text-gray-600">
                                    {review.role}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

export default Testimonials;
