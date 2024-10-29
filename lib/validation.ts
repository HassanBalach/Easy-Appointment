import { z } from 'zod';

export const authenticateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').max(50, 'Name must be at most 50 characters long'),
  phoneNumber: z.string().length(11, 'Phone number must be 11 digits long').regex(/^\d+$/, 'Phone number must contain only digits'),
});



export const doctorSchema = z.object({
  title: z.string().min(1, "Title is required"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 6 characters"),
  city: z.array(z.string()).min(1, "At least one city is required"),
  specialization: z.array(z.string()).min(1, "At least one specialization is required"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  
})

type DoctorFormData = z.infer<typeof doctorSchema>