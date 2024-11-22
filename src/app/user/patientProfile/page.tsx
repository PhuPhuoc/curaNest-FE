"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Chip, Button } from "@nextui-org/react";
import InfoUser from "../infoUser";
import { Divider } from "antd";
import { infoPatient } from "@/types/customer";
import { useAppContext } from "@/app/app-provider";
import authApi from "@/apiRequests/customer/customer";
import { toast } from "react-toastify";
import { generateColor } from "@/lib/utils";

const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500"];

const PatientProfile: React.FC = () => {
  const router = useRouter();
  const { user } = useAppContext();
  const [profiles, setProfiles] = useState<infoPatient[]>([]);

  useEffect(() => {
    if (user?.id) {
      const fetchProfiles = async () => {
        try {
          const response = await authApi.profilePatient(user.id);
          const profileData = Array.isArray(response.payload.data)
            ? response.payload.data
            : [response.payload.data];
          setProfiles(profileData);
        } catch (error) {
          toast.error("Không thể tải hồ sơ bệnh nhân.");
          console.error("Failed to fetch patient profiles", error);
        }
      };
      fetchProfiles();
    }
  }, [user?.id]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-10">
        <p className="text-2xl font-bold">Thông tin khách hàng</p>
        <Button
          onClick={() => router.push("/user/createPatientProfile")}
          className="bg-lime-500 text-white font-bold px-4 py-2 rounded shadow-md transition-colors"
        >
          Tạo hồ sơ bệnh nhân
        </Button>
      </div>

      <InfoUser />

      <Divider />

      <p className="text-2xl font-bold mb-5 mt-5">Hồ sơ bệnh nhân</p>

      <div className="grid gap-6 grid-cols-1">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col p-4 w-full"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {profile.avatar ? (
                  <Avatar
                    src={profile.avatar}
                    alt="Avatar"
                    className="w-48 h-48 mr-3 object-cover"
                  />
                ) : (
                  <Avatar
                    color="default"
                    size="lg"
                    className="w-48 h-48 mr-3 rounded-none"
                  />
                )}
              </div>

              <div className="ml-4 flex-1">
                <div className="flex space-x-8">
                  <div className="text-xl font-semibold">
                    {profile.full_name}
                  </div>
                </div>

                <div className="flex space-x-12 mt-5">
                  <div className="text-gray-500 text-lg">
                    <span className="text-gray-700 font-semibold">
                      Ngày sinh:{" "}
                    </span>
                    {profile.dob}{" "}
                    {/* <span className="text-red-700 font-semibold">
                      ({profile.old} tuổi)
                    </span> */}
                  </div>

                  <div className="text-gray-500 text-lg">
                    <span className="text-gray-700 font-semibold">
                      Căn cước công dân:{" "}
                    </span>
                    {profile.citizen_id}
                  </div>

                  <div className="text-gray-500 text-lg">
                    <span className="text-gray-700 font-semibold">
                      Số điện thoại:{" "}
                    </span>
                    {profile.phone_number}
                  </div>
                </div>

                <div className="flex space-x-12 mt-5">
                  <div className="text-gray-500 text-lg">
                    <span className="text-gray-700 font-semibold">
                      Địa chỉ:{" "}
                    </span>
                    {profile.address}
                  </div>

                  <div className="text-gray-500 text-lg">
                    <span className="text-gray-700 font-semibold">
                      Phường:{" "}
                    </span>
                    {profile.ward}
                  </div>

                  <div className="text-gray-500 text-lg">
                    <span className="text-gray-700 font-semibold">Quận: </span>
                    {profile.district}
                  </div>

                  <div className="text-gray-500 text-lg">
                    <span className="text-gray-700 font-semibold">
                      Thành phố:{" "}
                    </span>
                    {profile.city}
                  </div>
                </div>

                <div className="flex space-x-12 mt-5">
                  <div className="text-gray-500 text-lg">
                    <span className="text-gray-700 font-semibold">
                      Mô tả bệnh lý:{" "}
                    </span>
                    {profile.medical_description}
                  </div>
                </div>

                <div className="flex space-x-12 mt-5">
                  <div className="text-gray-500 text-lg">
                    <span className="text-gray-700 font-semibold">
                      Lưu ý với điều dưỡng:{" "}
                    </span>
                    {profile.note_for_nurses}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5 text-lg">
                  <p className="text-gray-700 font-semibold ">Dịch vụ:</p>
                  {profile.techniques.map((technique) => (
                      <Chip
                      key={technique.id}
                      className="text-white font-bold px-4 py-2"
                      size="md"
                      style={{ backgroundColor: generateColor(technique.id) }} 
                    >
                      {technique.name}
                    </Chip>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>{""}</div>
                  <div className="flex space-x-4">
                    <Button
                      onClick={() =>
                        router.push(`/user/patientProfile/${profile.id}`)
                      }
                      className="bg-teal-400 text-white px-4 py-2 rounded shadow-md hover:bg-teal-600 transition-colors"
                    >
                      Đặt điều dưỡng
                    </Button>

                    <Button
                      // onClick={() => handleDelete(profile.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition-colors"
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientProfile;
