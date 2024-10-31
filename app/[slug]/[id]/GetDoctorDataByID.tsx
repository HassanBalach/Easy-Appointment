"use client"

import { useState } from "react"
import {ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { realtimeDatabase } from "@/firebaseConfig"
import { ref, push } from "firebase/database";
import {  useToast } from "@/hooks/use-toast"



export default function GetDoctorDataByID({ doctorData }: { doctorData: any }) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [showDialog, setShowDialog] = useState(false)
    const [patientName, setPatientName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [relationship, setRelationship] = useState("self")
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    
    const { toast } = useToast()
    const morningSlots = ["11:45 AM"]
    const afternoonSlots = [
        "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM", "01:15 PM",
        "01:30 PM", "01:45 PM", "02:00 PM", "02:15 PM", "02:30 PM",
        "02:45 PM"
    ]

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
        setShowDialog(true)
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!patientName.trim()) {
            newErrors.name = "Patient name is required"
        }

        if (!phoneNumber.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            newErrors.phone = "Please enter a valid 10-digit phone number"
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const data = {
        patientName,
        phoneNumber,
        email,
        relationship,
        date,
        selectedTime
    }

    const handleSubmit = () => {
        if (validateForm()) {
            const appointmentsRef = ref(realtimeDatabase, "appointments");
            console.log(data)
            push(appointmentsRef, data)
                .then(() => {
                    console.log("Appointment booked successfully");
                    toast({
                        title: "Success",
                        description: "Congratulations! Appointment booked successfully",
                    });
                })
                .catch((error) => {
                    console.error("Error booking appointment: ", error);
                });

            setShowDialog(false)
        }
    }



    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="h-16 w-16">
                            {doctorData.image && <AvatarImage src={doctorData.image} />}
                            <AvatarFallback>{doctorData.name.charAt(0)}</AvatarFallback>

                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">{doctorData.name}</h2>
                            <p className="text-sm text-muted-foreground">healthdoc Care The Patient</p>
                            <p className="text-sm font-semibold">Fee: Rs. 1,400</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border mx-auto"
                            initialFocus
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">
                            Available slots for {date ? format(date, 'MMMM d, yyyy') : 'today'}
                        </h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium mb-3">Morning Slots</h3>
                            <div className="flex flex-wrap gap-2">
                                {morningSlots.map((time) => (
                                    <Button
                                        key={time}
                                        variant={selectedTime === time ? "default" : "outline"}
                                        onClick={() => handleTimeSelect(time)}
                                        className="w-24"
                                    >
                                        {time}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium mb-3">Afternoon Slots</h3>
                            <div className="flex flex-wrap gap-2">
                                {afternoonSlots.map((time) => (
                                    <Button
                                        key={time}
                                        variant={selectedTime === time ? "default" : "outline"}
                                        onClick={() => handleTimeSelect(time)}
                                        className="w-24"
                                    >
                                        {time}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enter Patient Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Patient Name*</Label>
                            <Input
                                id="name"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                placeholder="Enter patient name"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number*</Label>
                            <div className="flex gap-2">
                                <Input
                                    className="w-[80px]"
                                    value="+92"
                                    disabled
                                />
                                <Input
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter phone number"
                                    className="flex-1"
                                />
                            </div>
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address (Optional)</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="relationship">Relationship</Label>
                            <Select value={relationship} onValueChange={setRelationship}>
                                <SelectTrigger id="relationship">
                                    <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="self">Self</SelectItem>
                                    <SelectItem value="family">Family Member</SelectItem>
                                    <SelectItem value="friend">Friend</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="bg-muted p-3 rounded-lg space-y-1">
                            <h4 className="text-sm font-medium">Your Appointment</h4>
                            <div className="flex items-center gap-2 text-sm">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={doctorData.image} />
                                    <AvatarFallback>{doctorData.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{doctorData.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {date && selectedTime ? `${format(date, 'MMM dd')}, ${selectedTime}` : ''}
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleSubmit} className="w-full">
                        Continue
                    </Button>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <ThumbsUp className="h-4 w-4 text-primary" />
                        </div>
                        <p className="font-medium">95% patients feel satisfied after booking appointment from oladoc</p>
                    </div>
                    <p className="text-sm text-muted-foreground">It takes only 30 sec to book an appointment</p>
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-lg mb-4">Reviews About Dr. Sadaf Khalid (102)</CardTitle>
                    <ScrollArea className="h-[300px] pr-4">
                        {[1, 2, 3, 4].map((review) => (
                            <div key={review} className="mb-4 p-4 border rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <ThumbsUp className="h-4 w-4 text-primary" />
                                    <span className="font-medium">I recommend the doctor</span>
                                </div>
                                <p className="text-sm mb-2">"Very good experience."</p>
                                <div className="text-sm text-muted-foreground">
                                    <span>Verified Patient</span> • <span>5 days ago</span>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                    <Button variant="outline" className="w-full mt-4">
                        Load more reviews
                    </Button>
                </CardContent>
            </Card>
        
        </div>
    )
}