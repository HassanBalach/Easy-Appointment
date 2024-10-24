'use server'

import { ref as dbRef, child, get } from "firebase/database";
import {  realtimeDatabase } from '@/firebaseConfig';


//Let's retrieve the city from realtime  database

export async function cityRef() {
    const databaseRef = dbRef(realtimeDatabase)

    try {
        const snapshot = await get(child(databaseRef, 'cities'))

        if (snapshot.exists()) {

            const cities = snapshot.val()
            return cities

        } else {

            console.log("No data available");
            return []
        }
    } catch (error) {

        console.error("Error fetching city: ", error)
        throw error
    }
}

//Let's retrieve the specialization from realtime database


export async function specialityRef() {
    const databaseRef = dbRef(realtimeDatabase)

    try {
        const snapshot = await get(child(databaseRef, 'specialties'))

        if (snapshot.exists()) {

            const specialities = snapshot.val()
            const specialityNames = specialities.map((specility: { name: string; description: string }) => specility.name)
            return specialityNames;

        } else {

            console.log("No data available");
            return []

        }
    } catch (error) {
        console.error("Error fetching city: ", error)
        throw error
    }
}

