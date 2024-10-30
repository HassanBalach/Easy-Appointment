'use server'

import { ref as dbRef, child, get } from "firebase/database";
import { firestoreDatabase, realtimeDatabase } from '@/firebaseConfig';
import { collection, getDocs, where, query } from "firebase/firestore";
import { storage } from "@/firebaseConfig";
import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";

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





export async function searchDoctor(searchTerm: string) {
    if (!searchTerm) {
        console.log("Search term is empty");
        return [];
    }

    console.log("Searching for:", searchTerm);

    const doctorRef = collection(firestoreDatabase, "Doctor");
    const q = query(doctorRef, where("specialization", "array-contains", searchTerm));

    try {
        const snapShot = await getDocs(q);
        console.log("Number of documents found:", snapShot.size);

        // Extract data from each document
        const results = snapShot.docs.map(doc => doc.data());

        // Log only the necessary information
        console.log("Search results:", results.map(result => ({
            name: result.name,
            specialization: result.specialization
        })));

        return results;
    } catch (error) {
        console.error("Error searching doctors:", error);
        throw error; // Rethrow the error for better error handling upstream
    }
}
