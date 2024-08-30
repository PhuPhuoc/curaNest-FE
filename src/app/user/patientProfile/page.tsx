"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Chip, Button } from "@nextui-org/react"; // Import Avatar from NextUI

const serviceColors: Record<string, string> = {
  "Thay băng": "bg-blue-500",
  "Cho ăn": "bg-green-500",
  "Tiêm thuốc": "bg-red-500",
};

const PatientProfile: React.FC = () => {
  const router = useRouter();
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem("profiles") || "[]");
    setProfiles(storedProfiles);
  }, []);

  const handleDelete = (index: number) => {
    const updatedProfiles = profiles.filter((_, i) => i !== index);
    setProfiles(updatedProfiles);
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/createProfile")}
        className="bg-blue-700 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition-colors mb-6"
      >
        Tạo hồ sơ bệnh nhân
      </button>

      <div className="grid gap-6 grid-cols-1">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col p-4 w-full"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {profile.avatar ? (
                  <img
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
                  <div className="text-lg font-semibold">{profile.name}</div>
                </div>

                <div className="flex space-x-12 mt-4">
                  <div className="text-gray-500">
                    <span className="text-gray-700 font-semibold">
                      Ngày sinh:{" "}
                    </span>
                    {profile.dob
                      ? new Date(profile.dob).toLocaleDateString()
                      : "N/A"}
                  </div>

                  <div className="text-gray-500">
                    <span className="text-gray-700 font-semibold">
                      Địa chỉ:{" "}
                    </span>
                    {profile.address}
                  </div>

                  <div className="text-gray-500">
                    <span className="text-gray-700 font-semibold">
                      Số điện thoại:{" "}
                    </span>
                    {profile.phoneNumber}
                  </div>
                </div>

                <div className="flex space-x-40 mt-3">
                  <div className="text-gray-500">
                    <span className="text-gray-700 font-semibold">CCCD: </span>
                    {profile.cccd}
                  </div>
                  <div className="text-gray-500">
                    <span className="text-gray-700 font-semibold">Email: </span>
                    {profile.email}
                  </div>
                </div>

                <div className="mt-4 text-gray-500">
                  <span className="text-gray-700 font-semibold">Mô tả: </span>
                  {profile.medicalDescription}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <p className="text-gray-700 font-semibold">Dịch vụ:</p>
                    {profile.selectedServices.map(
                      (service: string, i: number) => (
                        <Chip
                          key={i}
                          className={`text-white ${
                            serviceColors[service] || "bg-gray-500"
                          }`}
                          size="md"
                        >
                          {service}
                        </Chip>
                      )
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={() => router.push("/booking")}
                      className="bg-teal-400 text-white px-4 py-2 rounded shadow-md hover:bg-teal-600 transition-colors"
                    >
                      Đặt điều dưỡng
                    </Button>

                    <Button
                      onClick={() => handleDelete(index)}
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
