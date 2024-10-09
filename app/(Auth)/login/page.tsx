"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup  } from "firebase/auth"
import { auth } from "@/firebaseConfig";
import { useRouter } from 'next/navigation'


import { userSignIn } from "@/lib/validation"
import Link from "next/link"

export default function LoginForm() {
  const router = useRouter()


  const { toast } = useToast()
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  // const {email , password} = credentials
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

  }

  const handleSubmit = () => {

    const result = userSignIn.safeParse(credentials)
    if (!result.success) {

      const formErrors: { email?: string; password?: string } = {}
      result.error.errors.forEach((error) => {
        formErrors[error.path[0] as "email" | "password"] = error.message
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

    const email = credentials.email
    const password = credentials.password

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log({ user })

      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        // ..
      });

  }

  const handleGoogleAuth = ()=>{
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;    
      const user = result.user;  
      router.push('/')
    }).catch((error) => {
     
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
   
    });
  
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

          <Button className="w-full" onClick={handleSubmit}>
            Sign In
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
          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" onClick={handleGoogleAuth}>
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link className="underline underline-offset-4 hover:text-primary" href={`/registration`}>
            
            
              Sign Up
           
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}