'use client'

import { ReactNode } from "react";
import { useDoctor } from "./DoctorContext"

interface DoctorDataWrapperProps {
    children: (data: ReturnType<typeof useDoctor>) => ReactNode; // Updated to reflect function type
}

export default function DoctorDataWrapper({ children }: DoctorDataWrapperProps) {
    const doctorData = useDoctor(); // Get the context data
    console.log({ doctorData });

    return <>{children(doctorData)}</>; // Pass doctorData to children
}
