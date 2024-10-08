import { z } from "zod";

export const userRegistration = z.object({
  email: z
    .string()
    .min(1, { message: "Required Field" })
    .email({ message: "Please enter the valid email" }),
  password: z.string().min(8, { message: "Password must be 8 characters" }),
});


export const doctorRegistration = z.object({
    // title: z.
    name: z
        .string()
        .min(3, {message: "Name is require"})
        .max(30, {message: "name can be more than 30 characters"}),
    contact: z
        .string()
        .min(11, {message: "provide the valid contact no"}),
    email: z
        .string()
        .min(1, { message: "Required Field" })
        .email({ message: "Please enter the valid email" }),
    password: z.string().min(8, { message: "Password must be 8 characters" }),
    city: z
        .string()
        .min(3, {message: "city is require"}),
    specility: z
        .string()
        .min(1, {message: "This field is required"}),
   
    // gender: z
    //     .string()
    //     .min(1, {message: "This field is required"}),
   

    
    
})