import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  experience: string;
  satisfiedPatients: string;
  rating: number;
  imageUrl?: string; // Made optional to align with Zod schema
  isPlatinum: boolean;
  onlineConsultationFee: number;
}

interface DoctorCardProps {
  doctors: Doctor[];
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doctor) => (
        <Card key={doctor.id} className="p-4">
          <div className="flex items-start space-x-4">
            <img
              src={doctor?.imageUrl || '/default-image.jpg'} // Fallback to default image
              alt={doctor.name}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{doctor.name}</h3>
                {doctor.isPlatinum && (
                  <Badge variant="secondary" className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                    PLATINUM DOCTOR
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{doctor.title}</p>
              <p className="text-xs text-gray-500">{doctor.qualifications}</p>
              <div className="flex items-center mt-2 space-x-4">
                <span className="text-sm">{doctor.experience} Experience</span>
                <span className="text-sm flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {doctor.rating} ({doctor.satisfiedPatients} Satisfied Patients)
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-2 bg-blue-50 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Online Video Consultation</span>
              <span className="text-sm font-bold">Rs. {doctor.onlineConsultationFee}</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 transition-colors">
            Book Appointment
          </button>
        </Card>
      ))}
    </div>
  );
};

export default DoctorCard;
