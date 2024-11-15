import { DoctorData } from "@/types";
import GetDoctorDataByID from "./GetDoctorDataByID";
import { getDoctorById } from "@/lib/action";

export default async function Page({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   try {
      const { id } = await params; // Awaiting Promise
      const doctorData = (await getDoctorById(id)) as DoctorData; // Fetching doctor data using the id

      // Check if doctor data exists
      if (!doctorData) {
         return <h1 className="text-red-500 text-xl">Doctor not found</h1>;
      }

      return <GetDoctorDataByID doctorData={doctorData as DoctorData} />;
   } catch (error) {
      console.error("Error fetching doctor data:", error);
      return (
         <h1 className="text-red-500 text-xl">Error fetching doctor data</h1>
      );
   }
}
