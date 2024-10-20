'use client'
import { z } from 'zod'
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { doctorSchema } from '@/lib/validation'
import { toast, useToast } from '@/hooks/use-toast'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { ChevronDownIcon, Upload, X } from 'lucide-react'
import { storage } from '@/firebaseConfig'
import { ref, uploadBytes } from "firebase/storage"
import { db } from '@/firebaseConfig'

type DoctorFormData = z.infer<typeof doctorSchema>

export default function DoctorRegistration() {
  const router = useRouter();
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    city: '',
    gender: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof DoctorFormData, string>>>({})
  const [specializations, setSpecializations] = useState<string[]>([])
  const [customSpecialization, setCustomSpecialization] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  const handleSpecializationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value && !specializations.includes(value)) {
      setSpecializations(prev => [...prev, value])
    }
  }

  const handleCustomSpecializationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomSpecialization(e.target.value)
  }

  const handleCustomSpecializationKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addCustomSpecialization()
    }
  }

  const addCustomSpecialization = () => {
    const trimmedSpecialization = customSpecialization.trim()
    if (trimmedSpecialization && !specializations.includes(trimmedSpecialization)) {
      setSpecializations(prev => [...prev, trimmedSpecialization])
      setCustomSpecialization('')
    }
  }

  const uploadImage = async (file: File, userId: string) => {
    const storageRef = ref(storage, `doctor/${userId}/{file.name}`)
    console.log({ storageRef })
    try {

      await uploadBytes(storageRef, file)
      console.log("Image uploaded successfully")


    } catch (error) {
      console.log("Error Uploading image: ", error)
    }

  }



  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)

      }
      reader.readAsDataURL(file)
    }

  }

  const removeSpecialization = (spec: string) => {
    setSpecializations(prev => prev.filter(s => s !== spec))
  }

  const predefinedSpecializations = ['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Other']


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Include custom specialization if 'Other' is selected
    const submissionData = {
      ...formData,
      specialization: [...specializations, customSpecialization]
    }


    const result = doctorSchema.safeParse(submissionData);
    console.log({ result });

    if (!result.success) {
      // Handle validation errors
      const formErrors: Partial<Record<keyof DoctorFormData, string>> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          formErrors[error.path[0] as keyof DoctorFormData] = error.message;
        }
      });
      console.log({ formErrors });
      setErrors(formErrors);

      toast({
        title: "Validation Error",
        description: result.error.errors[0]?.message,
      });

      return;
    }

    // Proceed with form submission
    toast({
      title: "Success",
      description: "Form submitted successfully",
    });

    // Authantication of Doctor using firebase auth

    const { email, password } = formData;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    // Uploading image to firebase storage

    if (userCredential) {
      const user = userCredential.user
      const userId = user.uid
      const fileInput = document.getElementById("doctor-image") as HTMLInputElement;
      const file = fileInput.files?.[0]
      console.log({ userId })

      if (file) {
        uploadImage(file, userId)
      }

      //Uplaading the data to firestore database

      const { email, password, customSpecialization, image, ...filteredData } = result.data;

      console.log({ filteredData })

      const doctorRef = doc(db, "Doctor", userId);

      try {
        await setDoc(doctorRef, filteredData)
        router.push("/")
        console.log("Doctor data added successfully")
      } catch (e) {
        console.error("Error adding document: ", e);
      }


    } else {
      console.log("Error in userCredintial")
    }


  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Doctor Registration</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
              {imagePreview ? (
                <img src={imagePreview} alt="Doctor preview" className="w-full h-full object-cover" />
              ) : (
                <Upload className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <label htmlFor="doctor-image" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
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
          <div className="flex space-x-2">
            <select
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="flex-1 px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Title</option>
              <option value="Mr">Mr.</option>
              <option value="Ms">Ms.</option>
              <option value="Dr">Dr.</option>
              <option value="Prof">Prof.</option>
            </select>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="flex-[3] px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number (e.g. 03001234567)"
            className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="space-y-2">
            <div className="relative">
              <select
                value=""
                onChange={handleSpecializationChange}
                className="w-full px-3 py-2 bg-gray-100 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Add specialization</option>
                {predefinedSpecializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <span key={spec} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                  {spec}
                  <button type="button" onClick={() => removeSpecialization(spec)} className="ml-1 text-blue-600 hover:text-blue-800">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={customSpecialization}
              onChange={handleCustomSpecializationChange}
              onKeyDown={handleCustomSpecializationKeyDown}
              placeholder="Enter custom specialization (press Enter or , to add)"
              className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
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
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
                className="form-radio text-blue-600"
              />
              <span>Female</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
        <p className="text-xs text-center mt-4 text-gray-600">
          By signing up, you agree to oladoc's Terms of use and Privacy Policy
        </p>
      </div>
    </div>
  )
}
