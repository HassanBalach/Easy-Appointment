import { specialityRef } from "@/lib/action";
import MainScreen from "./MainScreen";

interface dropdownDatas {
  name: string;
  description: string;
}


export default async function page() {
  const specialties = await specialityRef()
  console.log({ specialties });
  return <MainScreen specialties={specialties}  />
}

