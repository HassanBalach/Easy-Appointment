"use client"; // Make sure this is a client-side component

import { useState, useEffect } from "react";
import { specialityRef } from "@/lib/action";
import MainScreen from "./MainScreen";
import Loader from "@/components/loader";

interface Specialty {
   id: number;
   name: string;
   description: string;
   // add other relevant fields
}

export default function Page() {
   const [specialties, setSpecialties] = useState<Specialty[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      async function fetchSpecialties() {
         try {
            setLoading(true);
            const data = await specialityRef();
            if (Array.isArray(data)) {
               setSpecialties(data);
            } else {
               setError("Invalid specialties data");
            }
         } catch (err) {
            console.error("Error fetching specialties:", err);
            setError("Failed to load specialties");
         } finally {
            setLoading(false);
         }
      }

      fetchSpecialties();
   }, []);

   if (loading)
      return (
         <div>
            <Loader />
         </div>
      );
   if (error) return <div>{error}</div>;

   return <MainScreen specialties={specialties} />;
}