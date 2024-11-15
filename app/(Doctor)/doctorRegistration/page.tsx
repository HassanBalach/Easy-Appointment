import DoctorRegistration from "./doctor";
import { cityRef, specialityRef } from "@/lib/action";


export default async function Page() {

 const  cities = await cityRef() 
 const  specialities = await specialityRef() 

//  console.log({cities, specialities})


  return <DoctorRegistration  cities={cities} specialities={specialities } />
}
