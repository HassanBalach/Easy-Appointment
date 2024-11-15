import React from "react";

function Footer() {
   return (
      <footer className="bg-gray-900 text-white py-7 mx-auto relative bottom-0 sm:mt-7 md:mt-11">
         <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
               <div>
                  <h3 className="text-lg font-bold mb-3.5">LasDoc</h3>
                  <p className="space-y-1.8">
                     Book appointments with the best doctors and specialists
                     such as Gynecologists, Skin Specialists, Child Specialists,
                     Surgeons, etc. We provide convenient access to trusted
                     healthcare professionals.
                  </p>
               </div>
               <div>
                  <h3 className="text-lg font-bold mb-3.5">Services</h3>
                  <ul className="space-y-1.8">
                     <li>Consult Online</li>
                     <li>In-Clinic Appointments</li>
                     <li>Laboratory Tests</li>
                     <li>Procedures & Surgeries</li>
                     <li>Health Check-ups</li>
                     <li>Emergency Care</li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-bold mb-3.5">Contact</h3>
                  <ul className="space-y-1.8">
                     <li>Phone: +123 456 789</li>
                     <li>Email: themudhouse@gmail.com</li>
                     <li>Address: Zarhi street in Maymar -e- Noe Academy</li>
                     <li>Support: support@LasDoc.com</li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-bold mb-3.5">Follow Us</h3>
                  <ul className="flex space-x-3.5">
                     <li>
                        <a
                           href="https://facebook.com"
                           className="hover:text-blue-600"
                        >
                           Facebook
                        </a>
                     </li>
                     <li>
                        <a
                           href="https://twitter.com"
                           className="hover:text-blue-400"
                        >
                           Twitter
                        </a>
                     </li>
                     <li>
                        <a
                           href="https://instagram.com"
                           className="hover:text-pink-600"
                        >
                           Instagram
                        </a>
                     </li>
                     <li>
                        <a
                           href="https://linkedin.com"
                           className="hover:text-blue-700"
                        >
                           LinkedIn
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="text-center text-xs mt-7 border-t border-gray-700 pt-3.5">
            <p>&copy; 2024 Lasdoc. All rights reserved.</p>
         </div>
      </footer>
   );
}

export default Footer;
