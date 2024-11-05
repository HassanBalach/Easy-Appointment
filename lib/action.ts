'use server'

import { ref as dbRef, child, get } from "firebase/database";
import { firestoreDatabase, realtimeDatabase } from '@/firebaseConfig';
import { collection, getDocs, where, query, doc, getDoc } from "firebase/firestore";


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

            const specialities = snapshot.val();
            return specialities;

        } else {

            console.log("No data available");
            return []

        }
    } catch (error) {
        console.error("Error fetching city: ", error)
        throw error
    }
}

// Define an interface for the expected document structure
interface Doctor {
    id: string;
    name: string;
    specialization: string[];
}

export async function searchDoctor(searchTerm: string) {
    if (!searchTerm) {
        console.log("Search term is empty");
        return [];
    }

    // console.log("Searching for:", searchTerm);

    const doctorRef = collection(firestoreDatabase, "Doctor");
    const q = query(doctorRef, where("specialization", "array-contains", searchTerm));

    try {
        const snapShot = await getDocs(q);
        // console.log("Number of documents found:", snapShot.size);

        // Use the Doctor interface to type the results
        const results: Doctor[] = snapShot.docs.map(doc => {
            const data = doc.data() as Doctor;
            return {
                ...data,
                id: doc.id // Ensure id is set explicitly
            };
        });

        // Log only the necessary information
        // console.log("Search results:", results.map(result => ({
        //     id: result.id,
        //     name: result.name,
        //     specialization: result.specialization
        // })));

        return results;
    } catch (error) {
        console.error("Error searching doctors:", error);
        throw error; // Rethrow the error for better error handling upstream
    }
}

export async function getDoctorById(id: string) {


     const doctorRef = doc(firestoreDatabase, "Doctor", id);
     const snapshot = await getDoc(doctorRef);

     if (snapshot.exists()) {
      
         return snapshot.data();
     } else {
         console.log("No such document! Something went wrong");
         return null;
     }

}
