"use client"
import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'

export default function DoctorRegistration() {
  const [title , setTitle] = useState("")
  const [name , setName] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [city , setCity] = useState("")
  const [speciality, setSpeciallity] = useState("")
  const [gender, setGender] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Doctor Registration</h2>
        <form className="space-y-4">
          <div className="flex space-x-2">
            <select 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Title</option>
              <option value="Mr">Mr.</option>
              <option value="Ms">Ms.</option>
              <option value="Dr">Dr.</option>
              <option value="Prof">Prof.</option>
            </select>
            <input
              type="text"
              placeholder="Name"
              className="flex-[3] px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>
          <input
            type="tel"
            placeholder="Phone Number (e.g. 03001234567)"
            className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
         />
          <input
            type="text"
            placeholder="City"
            className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            required
         />
         <input
            type="text"
            placeholder="Speciality"
            className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={speciality}
            onChange={(e)=>setSpeciallity(e.target.value)}
            required
         />
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="form-radio text-blue-600"
             
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="form-radio text-blue-600"
               
              />
              <span>Female</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === 'other'}
                onChange={() => setGender('other')}
                className="form-radio text-blue-600"
              />
              <span>Other </span>
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