'use server'

import { ref as dbRef, child, get } from "firebase/database";
import { firestoreDatabase, realtimeDatabase } from '@/firebaseConfig';
import { collection, getDocs, where, query } from "firebase/firestore";


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

    console.log("Query:", JSON.stringify(q, null, 2));
    
    try {
        const snapShot = await getDocs(q);
        console.log("Number of documents found:", snapShot.size);

        const results: any[] = [];
        snapShot.forEach((doc) => {
            const data = doc.data();
            console.log("Document ID:", doc.id);
            console.log("Document data:", JSON.stringify(data, null, 2));
            results.push({ id: doc.id, ...data });
        });

        console.log("Search results:", JSON.stringify(results, null, 2));
        return results;
    } catch (error) {
        console.error("Error searching doctors:", error);
        throw error; // Rethrow the error for better error handling upstream
    }
}