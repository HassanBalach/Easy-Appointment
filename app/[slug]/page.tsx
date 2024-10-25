'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Video } from "lucide-react"
import Image from "next/image"
import { searchDoctor } from "@/lib/action"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"



export default function SearchId() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('term');
    const [doctorData, setDoctorData] = useState<any>(null)

    useEffect(() => {
        async function fetchData() {
            if (slug) {
                const data = await searchDoctor(slug)
                setDoctorData(data)
            }
        }
        fetchData()
    }, [slug])

    console.log({ doctorData })

    //Map the data in frontend Now,


    return (
        <div className="container mx-auto p-36 pt-10">

            <nav className="text-sm breadcrumbs mb-4">
                <ul className="flex space-x-2">
                    <li><a href="#" className="text-blue-600">HOME</a></li>
                    <li>&gt;</li>
                    <li><a href="#" className="text-blue-600">PAKISTAN</a></li>
                    <li>&gt;</li>
                    <li><a href="#" className="text-blue-600">LAHORE</a></li>
                    <li>&gt;</li>
                    <li className="text-gray-600">GYNECOLOGISTS IN LAHORE</li>
                </ul>
            </nav>
            {doctorData && (
                doctorData.length === 0 ? (
                    <h1 className="text-3xl font-bold mb-2">No Data Found</h1>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-2"> {doctorData.length} Best in Hub</h1>
                        {doctorData.map((doctor: any) => (
                            <div key={doctor.id}>
                                <Card className="w-full">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="/placeholder.svg"
                                                    alt="Dr. Iqra Ijaz"
                                                    width={100}
                                                    height={100}
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h2 className="text-xl font-bold">{doctor?.name}</h2>
                                                    <Badge variant="secondary" className="bg-yellow-400 text-white">PLATINUM DOCTOR</Badge>
                                                </div>
                                                <p className="text-gray-600 mb-2">{doctor?.specialization}</p>
                                                <p className="text-gray-600 mb-4">MBBS, MCPS (Gynecology and Obstetrcian)</p>
                                                <div className="flex gap-8 mb-4">
                                                    <div>
                                                        <p className="font-bold">5 Years</p>
                                                        <p className="text-gray-600">Experience</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold flex items-center">
                                                            99% <Star className="w-4 h-4 text-yellow-400 ml-1" />
                                                        </p>
                                                        <p className="text-gray-600">Satisfied Patients</p>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-blue-50 rounded-lg inline-flex items-center gap-2 mb-4">
                                                    <Video className="w-5 h-5 text-blue-600" />
                                                    <span>Online Video Consultation (Online)</span>
                                                    <span className="font-bold">Rs. 1,400</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <Button className="w-full">
                                                    <Video className="w-5 h-5 mr-2" />
                                                    Video Consultation
                                                </Button>
                                                <Button className="w-full bg-orange-500 hover:bg-orange-600">Book Appointment</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </>
                )
            )}

        </div>
    )
}