import React from "react";

function Footer() {
   return (
      <footer className="bg-gray-900 text-white py-8">
         <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               <div>
                  <h3 className="text-xl font-bold mb-4">healthdoc</h3>
                  <p className="text-sm">
                     Book appointments with the best doctors and specialists
                     such as Gynecologists, Skin Specialists, Child Specialists,
                     Surgeons, etc. We provide convenient access to trusted
                     healthcare professionals.
                  </p>
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-4">Services</h3>
                  <ul className="space-y-2">
                     <li>Consult Online</li>
                     <li>In-Clinic Appointments</li>
                     <li>Laboratory Tests</li>
                     <li>Procedures & Surgeries</li>
                     <li>Health Check-ups</li>
                     <li>Emergency Care</li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-4">Contact</h3>
                  <ul className="space-y-2">
                     <li>Phone: +123 456 789</li>
                     <li>Email: info@healthdoc.com</li>
                     <li>Address: 123 Medical Street, City</li>
                     <li>Support: support@healthdoc.com</li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <ul className="flex space-x-4">
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
         <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
            <p>&copy; 2024 healthdoc. All rights reserved.</p>
         </div>
      </footer>
   );
}

export default Footer;
