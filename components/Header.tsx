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
      <header className="bg-gray-200 shadow-lg mb-2 sm:mx-auto lg:mx-auto xl:mx-auto max-w-5xl mx-auto rounded-xl">
         <div className="container mx-auto flex items-center justify-between p-2 sm:p-3">
            {/* Logo */}
            <Link href={"/"}>
               <div className="text-lg sm:text-xl font-bold text-[var(--secondary-accent)] cursor-pointer">
                  LasDoc
               </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:block flex-1 max-w-xl mx-6">
               <nav className="flex justify-between">
                  <Link
                     href="/"
                     className="text-xs sm:text-sm text-gray-700 hover:text-green-600"
                  >
                     Home
                  </Link>
                  <Link
                     href="/doctors"
                     className="text-xs sm:text-sm text-gray-700 hover:text-green-600"
                  >
                     Doctors
                  </Link>
                  <Link
                     href="/about"
                     className="text-xs sm:text-sm text-gray-700 hover:text-green-600"
                  >
                     About
                  </Link>
                  <Link
                     href="/contact"
                     className="text-xs sm:text-sm text-gray-700 hover:text-green-600"
                  >
                     Contact Us
                  </Link>
               </nav>
            </div>

            {/* Desktop Auth Buttons */}
            <nav className="hidden lg:flex space-x-3">
               {doctor ? (
                  <Button className="text-xs sm:text-sm bg-[var(--secondary-accent)] rounded-xl px-3 py-1">
                     Joined as Doctor
                  </Button>
               ) : user ? (
                  <Button className="text-xs sm:text-sm bg-[var(--secondary-accent)] rounded-xl px-3 py-1">
                     Joined As Patient
                  </Button>
               ) : (
                  <>
                     <Link href={`/doctorRegistration`}>
                        <Button className="text-xs sm:text-sm bg-[var(--secondary-accent)] rounded-xl px-3 py-1">
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
                        className="text-xs sm:text-sm rounded-xl px-2 py-1"
                     >
                        Menu
                     </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[80vw] sm:w-[350px]">
                     <SheetHeader>
                        <SheetTitle className="flex items-center justify-between">
                           <span className="text-lg sm:text-xl font-bold text-[var(--secondary-accent)]">
                              HealthDoc
                           </span>
                        </SheetTitle>
                     </SheetHeader>
                     <div className="flex flex-col gap-3 py-3">
                        <nav className="flex flex-col space-y-4">
                           <Link
                              href="/"
                              className="text-xs sm:text-sm text-gray-700 hover:text-green-600"
                           >
                              Home
                           </Link>
                           <Link
                              href="/doctors"
                              className="text-xs sm:text-sm text-gray-700 hover:text-green-600"
                           >
                              Doctors
                           </Link>
                           <Link
                              href="/about"
                              className="text-xs sm:text-sm text-gray-700 hover:text-green-600"
                           >
                              About
                           </Link>
                           <Link
                              href="/contact"
                              className="text-xs sm:text-sm text-gray-700 hover:text-green-600"
                           >
                              Contact Us
                           </Link>
                        </nav>

                        {doctor ? (
                           <Button className="text-xs sm:text-sm bg-[var(--secondary-accent)] rounded-xl px-3 py-1">
                              Joined as Doctor
                           </Button>
                        ) : user ? (
                           <Button className="text-xs sm:text-sm bg-[var(--secondary-accent)] rounded-xl px-3 py-1">
                              Joined As Patient
                           </Button>
                        ) : (
                           <Link href={`/doctorRegistration`}>
                              <Button className="w-full text-xs sm:text-sm bg-[var(--secondary-accent)] rounded-xl px-3 py-1">
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
