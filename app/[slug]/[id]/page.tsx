import GetDoctorDataByID from "./GetDoctorDataByID";
import { getDoctorById } from "@/lib/action";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log({id})
    const DoctorData = await getDoctorById(id);
    return <GetDoctorDataByID doctorData={DoctorData} />
}
