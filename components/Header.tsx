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
      <header className="bg-gray-100 shadow-xl mb-4 max-w-[1400px] mx-auto rounded-lg">
         <div className="container mx-auto flex items-center justify-between px-4 py-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-orange-500">healthdoc</div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
               {doctor ? (
                  <Button>Joined as Doctor</Button>
               ) : user ? (
                  <Button>Joined As Patient</Button>
               ) : (
                  <>

                     <Link href={`/doctorRegistration`}>
                        <Button>Join as Doctor</Button>
                     </Link>
                  </>
               )}
            </nav>

            {/* Mobile Navigation */}
            <div className="flex md:hidden space-x-2">
               <Button variant="ghost" size="icon">
                  <Phone className="h-6 w-6" />
               </Button>
               <Sheet>
                  <SheetTrigger asChild>
                     <Button variant="outline">Open</Button>
                  </SheetTrigger>
                  <SheetContent>
                     <SheetHeader>
                        <SheetTitle className="flex items-center justify-between">
                           <span className="text-2xl font-bold text-orange-500">
                              healthdoc
                           </span>
                        </SheetTitle>
                     </SheetHeader>
                     <div className="flex gap-4 py-4">
                      
                        <Button
                           variant="outline"
                           onClick={() => router.push("/doctorRegistration")}
                           className="flex-1"
                        >
                           Doctor Login
                        </Button>
                     </div>
                     <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                           <AccordionItem value="doctors">
                              <AccordionTrigger>Doctors</AccordionTrigger>
                              <AccordionContent>
                                 Book in-person or video consultation with top
                                 doctors
                              </AccordionContent>
                           </AccordionItem>
                           <AccordionItem value="hospitals">
                              <AccordionTrigger>Hospitals</AccordionTrigger>
                              <AccordionContent>
                                 Find and book hospital appointments
                              </AccordionContent>
                           </AccordionItem>
                           <AccordionItem value="labs">
                              <AccordionTrigger>
                                 Labs and Diagnostics
                              </AccordionTrigger>
                              <AccordionContent>
                                 Lab Tests with Free Home Sample collection
                              </AccordionContent>
                           </AccordionItem>
                           <AccordionItem value="surgeries">
                              <AccordionTrigger>Surgeries</AccordionTrigger>
                              <AccordionContent>
                                 Book surgery with top doctors
                              </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                        <div>
                           <h3 className="font-semibold mb-2">Health Blog</h3>
                           <p className="text-sm text-gray-600">
                              Learn more about health from over 50+ topics
                           </p>
                        </div>
                        <div>
                           <h3 className="font-semibold mb-2">
                              Are you a doctor?
                           </h3>
                           <p className="text-sm text-gray-600">
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
