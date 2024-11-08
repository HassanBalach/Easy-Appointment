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

import { useRouter } from "next/navigation";
import Link from "next/link";

function Header({ isShown }: { isShown: boolean }) {
   const user = false;
   const doctor = false;

   if (!isShown) return <div></div>; // Render nothing if not shown

   return (
      <header className="bg-gray-200 shadow-2xl mb-4 mx-4 sm:mx-6 lg:mx-8 xl:mx-auto max-w-7xl rounded-xl">
         <div className="container mx-auto flex items-center justify-between p-4">
            {/* Logo */}
            <Link href={"/"}>
               <div className="text-xl sm:text-2xl font-bold text-[var(--secondary-accent)] cursor-pointer">
                  HealthDoc
               </div>
            </Link>

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
               <Sheet>
                  <SheetTrigger asChild>
                     <Button
                        variant="outline"
                        className="text-sm sm:text-base rounded-xl"
                     >
                        Menu
                     </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[85vw] sm:w-[400px]">
                     <SheetHeader>
                        <SheetTitle className="flex items-center justify-between">
                           <span className="text-xl sm:text-2xl font-bold text-[var(--secondary-accent)]">
                              HealthDoc
                           </span>
                        </SheetTitle>
                     </SheetHeader>
                     <div className="flex flex-col gap-4 py-4">
                        <nav className="flex flex-col space-y-6">
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

                        {doctor ? (
                           <Button className="text-sm sm:text-base bg-[var(--secondary-accent)] rounded-xl">
                              Joined as Doctor
                           </Button>
                        ) : user ? (
                           <Button className="text-sm sm:text-base bg-[var(--secondary-accent)] rounded-xl">
                              Joined As Patient
                           </Button>
                        ) : (
                           <Link href={`/doctorRegistration`}>
                              <Button className="w-full text-sm sm:text-base bg-[var(--secondary-accent)] rounded-xl">
                                 Join as Doctor
                              </Button>
                           </Link>
                        )}
                     </div>
                  </SheetContent>
               </Sheet>
            </div>
         </div>
      </header>
   );
}

export default Header;
