"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail, Newspaper } from "lucide-react"

import { userRegistration } from "@/lib/validation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"


export default function RegistrationForm() {
  const {toast} = useToast()
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [errors , setErrors] = useState<{email?: string; password?: string}>({})
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value}));

  }

  const handleSubmit = () => {
  const result = userRegistration.safeParse(credentials)
  if (!result.success) {
   const formErrors: {email?: string; password?: string} = {}
   console.log(formErrors)
   result.error.errors.forEach((error)=>{
    console.log({error})
    formErrors[error.path[0] as "email"| "password"] = error.message

   })
   setErrors(formErrors)

   toast({
    title: "validation Error",
    description: result.error.errors[0]?.message,
   })
 
   return
  }

  toast({
    title: "Success",
    description: "Form submitted successfully",
  })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {

      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full"
              value={credentials.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          </div>
          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full"
              value={credentials.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          </div>

          <Button className="w-full">
            Sign Up
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a className="underline underline-offset-4 hover:text-primary" href="#">
              Sign in
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}