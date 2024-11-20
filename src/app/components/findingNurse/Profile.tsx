"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Chip, Modal } from "@nextui-org/react";
import ScheduleModal from "./ScheduleModal";

export interface ProfileType {
  id: string;
  name: string;
  dob: string;
  address: string;
  avatar?: string;
  medicalDescription: string;
  selectedServices: string[];
}

const serviceColors: Record<string, string> = {
  "Thay băng": "bg-blue-500",
  "Cho ăn": "bg-green-500",
  "Tiêm thuốc": "bg-red-500",
};

const Profile = () => {
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem("profiles") || "[]");
    setProfiles(storedProfiles);
  }, []);

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId === selectedProfile ? null : profileId);
    setIsScheduled(false);
  };

  const handleScheduleClick = () => {
    const selectedProfileData = profiles.find(
      (profile) => profile.id === selectedProfile
    );
    if (selectedProfileData) {
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setIsScheduled(true);
    setSelectedProfile(null);
  };

  return (
    <div>
      <div className="flex items-center mb-5">
        <p className="text-2xl font-bold">Chọn hồ sơ bệnh nhân muốn đặt</p>
        {selectedProfile && !isScheduled && (
          <Button
            className="ml-4 text-base font-bold"
            color="danger"
            onClick={handleScheduleClick}
            disabled={isScheduled} 
          >
            Đặt lịch
          </Button>
        )}
      </div>

      <div className="grid gap-6 grid-cols-3 mb-10">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="relative bg-white border rounded-lg shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
          >
            <input
              type="radio"
              checked={profile.id === selectedProfile}
              onChange={() => handleProfileSelect(profile.id)}
              className="absolute top-2 right-2 w-5 h-5 cursor-pointer"
            />
            <div className="flex items-start">
              <Avatar
                src={profile.avatar || undefined}
                alt="Avatar"
                className="w-24 h-24 mr-4 object-cover rounded-lg"
              />

              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">{profile.name}</h3>
                <p className="text-gray-500 mb-3">
                  Ngày sinh:{" "}
                  {new Date(profile.dob).toLocaleDateString() || "N/A"}
                </p>
                <p className="text-gray-500">Địa chỉ: {profile.address}</p>
              </div>
            </div>
            <div className="mt-4 text-gray-500">
              <span className="text-gray-700 font-semibold">Mô tả: </span>
              {profile.medicalDescription}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="text-gray-700 font-semibold">Dịch vụ:</p>
              {profile.selectedServices.map((service, idx) => (
                <Chip
                  key={idx}
                  className={`text-white ${
                    serviceColors[service] || "bg-gray-500"
                  }`}
                  size="md"
                >
                  {service}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ScheduleModal
        profileServices={
          profiles.find((profile) => profile.id === selectedProfile)
            ?.selectedServices || []
        }
        visible={isModalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Profile;
