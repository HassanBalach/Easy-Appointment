import React from "react";
import { Search, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100">



      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-3xl font-extrabold text-purple-700">
            health<span className="text-orange-500">doc</span>
          </div>

          {/* Nav Links for Desktop */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-base">
            <a
              href="#"
              className="text-gray-700 hover:text-purple-700 transition-colors duration-300"
            >
              Doctors
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-700 transition-colors duration-300"
            >
              Hospitals
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-700 transition-colors duration-300"
            >
              Labs & Diagnostics
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-700 transition-colors duration-300"
            >
              Surgeries
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-700 transition-colors duration-300"
            >
              Health Blog
            </a>
          </nav>

          {/* Buttons */}
          <div className="flex space-x-3">
            <Link href={`/login`}>
              <button className="border border-purple-700 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-700 hover:text-white transition-colors duration-300">
                Login/Signup
              </button>
            </Link>
            <Link href={`/doctorRegistration`}>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 shadow-md transition-transform duration-300 transform hover:scale-105">
                Join as Doctor
              </button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button className="text-purple-700 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>


      

      <main className="container mx-auto px-4 py-8  ">
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-400 to-purple-700 p-8 rounded-xl shadow-lg flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-8 overflow-hidden">
            {/* Text Section */}
            <div className="text-white max-w-lg z-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
                Find and Book the{" "}
                <span className="text-purple-700">Best Doctors</span> near you
              </h1>

              <div className="flex flex-col sm:flex-row items-center mt-4 rounded-lg overflow-hidden shadow-lg bg-white">
                <div className="flex items-center border-b sm:border-b-0 sm:border-r border-gray-200 p-3 w-full sm:w-auto">
                  <MapPin className="text-gray-400 mr-2" size={20} />
                  <input
                    type="text"
                    placeholder="Enter city"
                    defaultValue="Lahore"
                    className="w-full outline-none text-gray-700"
                  />
                  <button className="text-blue-600 font-semibold text-sm ml-2">
                    Detect
                  </button>
                </div>
                <div className="flex items-center p-3 w-full sm:w-auto">
                  <Search className="text-gray-400 mr-2" size={20} />
                  <input
                    type="text"
                    placeholder="Doctors, Hospital, Conditions"
                    className="w-full outline-none text-gray-700"
                  />
                </div>
                <button className="bg-orange-500 text-white px-6 py-3 font-bold hover:bg-orange-600 transition-all w-full sm:w-auto">
                  Search
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="Doctor"
                className="h-64 lg:h-80 rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
        {/* _____________________________________________________________________________*/}

        <section className="grid md:grid-cols-4 gap-4 mb-8 mt-8">
          {[
            "Consult Online Now",
            "In-Clinic Appointments",
            "Laboratory Tests",
            "Procedures & Surgeries",
          ].map((title, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600">
                  Description of the service goes here.
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Consult best doctors online
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {[
              "Gynecologist",
              "Skin Specialist",
              "Child Specialist",
              "Orthopedic Surgeon",
              "ENT Specialist",
              "Diabetes Specialist",
              "Eye Specialist",
            ].map((specialty, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">{specialty}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Search doctor by condition
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {[
              "Fever",
              "Heart Attack",
              "Pregnancy",
              "High Blood Pressure",
              "Piles",
              "Diarrhea",
              "Acne",
            ].map((condition, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">{condition}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Esteemed Partners</h2>
          <p className="mb-4">
            Avail Exclusive partnership benefits for your brand, clients and
            employees.
          </p>
          <Button variant="outline">Partner with healthdoc</Button>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-200 h-12 rounded"></div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">healthdoc</h3>
              <p className="text-sm">
                Book appointments with the best Doctors and Specialists such as
                Gynecologists, Skin Specialists, Child Specialists, Surgeons,
                etc.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Major Cities</h4>
              <ul className="text-sm space-y-2">
                <li>Karachi</li>
                <li>Lahore</li>
                <li>Islamabad</li>
                <li>Rawalpindi</li>
                <li>Multan</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Top Hospitals</h4>
              <ul className="text-sm space-y-2">
                <li>Doctors Hospital</li>
                <li>Hameed Latif Hospital</li>
                <li>National Hospital</li>
                <li>Fatima Memorial Hospital</li>
                <li>Omar Hospital & Cardiac Centre</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Lab Test</h4>
              <ul className="text-sm space-y-2">
                <li>MRI in Lahore</li>
                <li>X-RAY in Lahore</li>
                <li>CT Scan in Lahore</li>
                <li>Mammography in Lahore</li>
                <li>Ultrasound in Lahore</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-sm">
              &copy; 2023 healthdoc. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
