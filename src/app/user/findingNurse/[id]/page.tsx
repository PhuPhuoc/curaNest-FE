"use client";
import React, { useEffect, useState } from "react";
import Review from "@/app/components/findingNurse/Review";
import Profile from "@/app/components/findingNurse/Profile";
import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { DetailNurse } from "@/types/nurse";
import { useAppContext } from "@/app/app-provider";
import { Spinner } from "@nextui-org/react";
import TimeTableCustomer from "@/app/components/findingNurse/TimeTableCustomer";

interface Profile {
  name: string;
  dob: string;
  address: string;
  medicalDescription: string;
  selectedServices: string[];
  avatar?: string;
}

const DetailNurseFinding = (props: any) => {
  const { params } = props;
  const id = params.id;
  const { user } = useAppContext();
  const [nurseList, setNurseList] = useState<DetailNurse>();
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchDetailNurse() {
    setLoading(true);
    try {
      const response = await nurseApiRequest.detailNurse(id, "admin");
      setNurseList(response.payload.data);
    } catch (error) {
      console.error("Error fetching techniques:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDetailNurse();
  }, []);

  return (
    <div className="bg-white p-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="flex gap-x-10 mb-8">
            <div className="w-60 h-60 flex-shrink-0">
              <img
                src={nurseList?.avatar}
                alt="Nurse Image"
                className="w-full h-full object-cover rounded-lg border border-gray-300"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4">
                {nurseList?.full_name}
              </h1>
              <p className="text-lg mb-2">
                <strong>Trình độ học vấn:</strong> {nurseList?.education_level}
              </p>
              <p className="text-lg mb-2">
                <strong>Kinh nghiệm làm việc:</strong>{" "}
                {nurseList?.work_experience}
              </p>
              <p className="text-lg mb-2">
                <strong>Chuyên môn:</strong> {nurseList?.expertise}
              </p>
              <p className="text-lg mb-2">
                <strong>Chứng chỉ:</strong> {nurseList?.certificate}
              </p>
              <p className="text-lg">
                <strong>Châm ngôn sống:</strong> {nurseList?.slogan}
              </p>
            </div>
          </div>
          
          <TimeTableCustomer id={id} />

          {/* PatientProfile Component */}
          {user?.role !== "user" && <Profile id={id}/>}

          {/* Review Component */}
          <Review nurseId={id}/>
        </>
      )}
    </div>
  );
};

export default DetailNurseFinding;
