'use client'

import { firestoreDatabase } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";



interface DoctorContextType{
    doctor: Doctor[]
    loading: boolean
    error: Error | null
   
}

interface Doctor{
    id: string;
    [key: string]: any;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined)


export const DoctorProvider = ({children}: {children: React.ReactNode})=>{
    const [doctor, setDoctor] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    console.log("Doctor:", doctor)

    useEffect(()=>{
        
    const fetchDoctor = async()=>{
        setLoading(true)
        try {
         const doctorCollection = collection(firestoreDatabase , "Doctor")
         console.log("doctorCollection:", doctorCollection)
         const snapShot = await getDocs(doctorCollection)
            console.log("snapShot:", snapShot)
         const doctorData: Doctor[] = [];

         snapShot.forEach((doc)=>{
            doctorData.push({id: doc.id, ...doc.data()})
         })

         setDoctor(doctorData)
            
        } catch (error: any) {
            console.log("Error fetching doctor: ", error)
            setError(error )
        } finally {
            setLoading(false)
        }
    };

        fetchDoctor()
    },[])

    return(
        <DoctorContext.Provider value={{doctor, loading, error}}>
            {children}
        </DoctorContext.Provider>
    )

}


// Custom Hook


export const useDoctor = ()=>{
    const context = useContext(DoctorContext)

    console.log({context})

    if(context === undefined){

        throw new Error("useDoctor must be used within a DoctorProvider")
    }

    return context
}


