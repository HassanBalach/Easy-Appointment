'use client'

import { firestoreDatabase } from "@/firebaseConfig";

import { collection, getDocs, where, query } from "firebase/firestore";
import { createContext, useContext, useState } from "react";



interface DoctorContextType {
    doctor: Doctor[]
    loading: boolean
    error: Error | null
    searchDoctor: (value: string) => Promise<void>;
}

interface Doctor {
    id: string;
    [key: string]: any;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined)


export const DoctorProvider = ({ children }: { children: React.ReactNode }) => {
    const [doctor, setDoctor] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    console.log({ doctor })

    const searchDoctor = async (value: string) => {
        setLoading(true)
        setError(null)
        try {
            const doctorCollection = collection(firestoreDatabase, "Doctor")
            const q = query(doctorCollection, where("specialization", "==", value));
            const snapShot = await getDocs(q)
            const doctorData: Doctor[] = [];

            snapShot.forEach((doc) => {
                doctorData.push({ id: doc.id, ...doc.data() })
            })

            setDoctor(doctorData)

        } catch (error: any) {
            console.log("Error fetching doctor: ", error)
            setError(error)
        } finally {
            setLoading(false)
        }
    };



    return (
        <DoctorContext.Provider value={{ doctor, loading, error, searchDoctor }}>
            {children}
        </DoctorContext.Provider>
    )

}


// Custom Hook


export const useDoctor = () => {
    const context = useContext(DoctorContext)

    console.log({ context })

    if (context === undefined) {

        throw new Error("useDoctor must be used within a DoctorProvider")
    }

    return context
}


