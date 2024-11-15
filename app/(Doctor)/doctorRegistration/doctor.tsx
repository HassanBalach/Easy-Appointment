"use client";
import { z } from "zod";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { doctorSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useState, ChangeEvent } from "react";
import { ChevronDownIcon, Upload, X } from "lucide-react";
import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestoreDatabase } from "@/firebaseConfig";
import Image from "next/image";

type DoctorFormData = z.infer<typeof doctorSchema> & {
   gender: "male" | "female" | null;
};

// Define a type for the image parameter
type ImageData = {
   name: string;
   base64: string;
};
type Specialties = {
   name: string;
   description: string;
};

// Define a type for Doctor Data
type DoctorData = Omit<DoctorFormData, 'email' | 'password' | 'image'> & {
   image: string | null;
};

export default function DoctorRegistration({
   cities,
   specialities,
}: {
   cities: string[];
   specialities: Specialties[];
}) {
   const router = useRouter();
   const { toast } = useToast();
   const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      password: "",
      gender: null,
      city: [],
      specialization: [],
      image: null,
      experience: "",
   });

   const [errors, setErrors] = useState<
      Partial<Record<keyof DoctorFormData, string>>
   >({});
   console.log(errors)
   const [selectedSpecializations, setSelectedSpecializations] = useState<
      string[]
   >([]);
   const [selectedCities, setSelectedCities] = useState<string[]>([]);
   const [imagePreview, setImagePreview] = useState<string | null>(null);

   const handleInputChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSpecializationChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value && !selectedSpecializations.includes(value)) {
         setSelectedSpecializations((prev) => [...prev, value]);
      }
   };

   const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value && !selectedCities.includes(value)) {
         setSelectedCities((prev) => [...prev, value]);
      }
   };

   const removeSpecialization = (spec: string) => {
      setSelectedSpecializations((prev) => prev.filter((s) => s !== spec));
   };

   const removeCity = (city: string) => {
      setSelectedCities((prev) => prev.filter((c) => c !== city));
   };

   const registerUser = async (email: string, password: string) => {
      try {
         const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
         );
         console.log("User registered successfully");
         return userCredential.user; // User object
      } catch (error) {
         console.error("Error registering user:", error);
      }
   };

   const uploadImage = async (image: ImageData) => {
      console.log("Uploading image:", image);
      const storageRef = ref(storage, `images/${image.name}`);
      console.log("Storage Reference:", storageRef);
      await uploadString(storageRef, image.base64, "data_url"); // Ensure image is in base64 format
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
      return downloadURL; // This is the URL to save in Firestore
   };

   const saveUserData = async (user: User, filteredData: DoctorData) => {
      const doctorRef = doc(firestoreDatabase, "Doctor", user.uid);

      try {

         await setDoc(doctorRef, filteredData);
         router.push("/");

      } catch (e) {
         console.error("Error adding document: ", e);
      }
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const combinedData = {
         ...formData,
         city: selectedCities,
         specialization: selectedSpecializations,
         image: imagePreview,
      };

      //  console.log({ combinedData });

      const result = doctorSchema.safeParse(combinedData);

      // console.log({ result });

      if (!result.success) {
         const formErrors: Partial<Record<keyof DoctorFormData, string>> = {};
         result.error.errors.forEach((error) => {
            if (error.path[0]) {
               formErrors[error.path[0] as keyof DoctorFormData] =
                  error.message;
            }
         });
         setErrors(formErrors);

         toast({
            title: "Validation Error",
            description: result.error.errors[0]?.message,
         });

         return;
      }

      toast({
         title: "Success",
         description: "Wait for submitting form successfully",
      });

      // Authenticate Doctor using Firebase Auth
      try {
         const { email, password, image } = result.data;
         const user = await registerUser(email, password);
         if (user) {
            let imageUrl = null;

            if (image) {
               const imageData: ImageData = {
                  name: "your_image_name_here", // Replace with actual image name logic
                  base64: image,
               };
               imageUrl = await uploadImage(imageData);

            }
            const { /*email, password, */ ...filteredData } = result.data;
            console.log({ filteredData });

            const doctorRef = { ...filteredData, image: imageUrl };

            // console.log({ doctorRef });

            await saveUserData(user, doctorRef);
            console.log("User registered and data saved!");
         } else {
            console.error("User registration failed.");
         }
      } catch (error) {
         console.error("Error registering user or saving data:", error);
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
         <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
               Doctor Registration
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
               <div className="flex flex-col items-center mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
                     {imagePreview ? (
                        <Image
                           src={imagePreview}
                           alt="Doctor preview"
                           className="w-full h-full object-cover"
                           width={128}
                           height={128}
                        />
                     ) : (
                        <Upload className="w-12 h-12 text-gray-400" />
                     )}
                  </div>
                  <label
                     htmlFor="doctor-image"
                     className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition duration-300"
                  >
                     Upload Image
                  </label>
                  <input
                     id="doctor-image"
                     type="file"
                     accept="image/*"
                     onChange={handleImageChange}
                     className="hidden"
                  />
               </div>
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-3 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number (e.g. 03001234567)"
                  className="w-full px-3 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-3 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-3 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Experience (e.g., 5 years)"
                  className="w-full px-3 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <div className="space-y-2">
                  <div className="relative">
                     <select
                        value=""
                        onChange={handleCityChange}
                        className="w-full px-3 py-2 bg-gray-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="">Add city</option>
                        {cities.map((city) => (
                           <option key={city} value={city}>
                              {city}
                           </option>
                        ))}
                     </select>
                     <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {selectedCities.map((city) => (
                        <span
                           key={city}
                           className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center"
                        >
                           {city}
                           <button
                              type="button"
                              onClick={() => removeCity(city)}
                              className="ml-1 text-green-600 hover:text-green-800"
                           >
                              <X size={14} />
                           </button>
                        </span>
                     ))}
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="relative">
                     <select
                        value=""
                        onChange={handleSpecializationChange}
                        className="w-full px-3 py-2 bg-gray-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="">Add specialization</option>
                        {specialities.map((spec) => (
                           <option key={spec.name} value={spec.name}>
                              {spec.name}
                           </option>
                        ))}
                     </select>
                     <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {selectedSpecializations.map((spec) => (
                        <span
                           key={spec}
                           className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                        >
                           {spec}
                           <button
                              type="button"
                              onClick={() => removeSpecialization(spec)}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                           >
                              <X size={14} />
                           </button>
                        </span>
                     ))}
                  </div>
               </div>
               <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                     <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600"
                     />
                     <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                     <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600"
                     />
                     <span>Female</span>
                  </label>
               </div>
               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out"
               >Register</button>
            </form>
            <p className="text-xs text-center mt-4 text-gray-600">
               By signing up, you agree to oladoc&apos;s Terms of use and Privacy Policy
            </p>
         </div>
      </div>
   );
}
