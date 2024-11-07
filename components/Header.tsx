import React from "react";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "./ui/sheet";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "./ui/accordion";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header({ isShown }: { isShown: boolean }) {
   const user = false;
   const doctor = false;
   const router = useRouter();

   if (!isShown) return <div></div>; // Render nothing if not shown

   return (
      <header className="bg-gray-200 shadow-2xl mb-4 mx-4 sm:mx-6 lg:mx-8 xl:mx-auto max-w-7xl rounded-xl">
         <div className="container mx-auto flex items-center justify-between p-4">
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-bold text-[var(--secondary-accent)] cursor-pointer">
               QuickCare
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
               <nav className="flex justify-between">
                  <Link
                     href="/"
                     className="text-gray-700 hover:text-green-600 text-sm sm:text-base"
                  >
                     Home
                  </Link>
                  <Link
                     href="/doctors"
                     className="text-gray-700 hover:text-green-600 text-sm sm:text-base"
                  >
                     Doctors
                  </Link>
                  <Link
                     href="/about"
                     className="text-gray-700 hover:text-green-600 text-sm sm:text-base"
                  >
                     About
                  </Link>
                  <Link
                     href="/contact"
                     className="text-gray-700 hover:text-green-600 text-sm sm:text-base"
                  >
                     Contact Us
                  </Link>
               </nav>
            </div>

            {/* Desktop Auth Buttons */}
            <nav className="hidden lg:flex space-x-4">
               {doctor ? (
                  <Button className="text-sm sm:text-base bg-[var(--secondary-accent)] rounded-xl">
                     Joined as Doctor
                  </Button>
               ) : user ? (
                  <Button className="text-sm sm:text-base bg-[var(--secondary-accent)] rounded-xl">
                     Joined As Patient
                  </Button>
               ) : (
                  <>
                     <Link href={`/doctorRegistration`}>
                        <Button className="text-sm sm:text-base bg-[var(--secondary-accent)] rounded-xl">
                           Join as Doctor
                        </Button>
                     </Link>
                  </>
               )}
            </nav>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden space-x-2">
               <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10"
               >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
               </Button>
               <Sheet>
                  <SheetTrigger asChild>
                     <Button variant="outline" className="text-sm sm:text-base">
                        Menu
                     </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[85vw] sm:w-[400px]">
                     <SheetHeader>
                        <SheetTitle className="flex items-center justify-between">
                           <span className="text-xl sm:text-2xl font-bold text-orange-500">
                              healthdoc
                           </span>
                        </SheetTitle>
                     </SheetHeader>
                     <div className="flex gap-4 py-4">
                        <Button
                           variant="outline"
                           onClick={() => router.push("/doctorRegistration")}
                           className="flex-1 text-sm sm:text-base"
                        >
                           Doctor Login
                        </Button>
                     </div>
                     <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                           <AccordionItem value="doctors">
                              <AccordionTrigger className="text-sm sm:text-base">
                                 Doctors
                              </AccordionTrigger>
                              <AccordionContent className="text-xs sm:text-sm">
                                 Book in-person or video consultation with top
                                 doctors
                              </AccordionContent>
                           </AccordionItem>
                           <AccordionItem value="hospitals">
                              <AccordionTrigger className="text-sm sm:text-base">
                                 Hospitals
                              </AccordionTrigger>
                              <AccordionContent className="text-xs sm:text-sm">
                                 Find and book hospital appointments
                              </AccordionContent>
                           </AccordionItem>
                           <AccordionItem value="labs">
                              <AccordionTrigger className="text-sm sm:text-base">
                                 Labs and Diagnostics
                              </AccordionTrigger>
                              <AccordionContent className="text-xs sm:text-sm">
                                 Lab Tests with Free Home Sample collection
                              </AccordionContent>
                           </AccordionItem>
                           <AccordionItem value="surgeries">
                              <AccordionTrigger className="text-sm sm:text-base">
                                 Surgeries
                              </AccordionTrigger>
                              <AccordionContent className="text-xs sm:text-sm">
                                 Book surgery with top doctors
                              </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                        <div>
                           <h3 className="font-semibold mb-2 text-sm sm:text-base">
                              Health Blog
                           </h3>
                           <p className="text-xs sm:text-sm text-gray-600">
                              Learn more about health from over 50+ topics
                           </p>
                        </div>
                        <div>
                           <h3 className="font-semibold mb-2 text-sm sm:text-base">
                              Are you a doctor?
                           </h3>
                           <p className="text-xs sm:text-sm text-gray-600">
                              Grow your practice 2x by signing up with healthdoc
                           </p>
                        </div>
                     </div>
                  </SheetContent>
               </Sheet>
            </div>
         </div>
      </header>
   );
}

export default Header;
