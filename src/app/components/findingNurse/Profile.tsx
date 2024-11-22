"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Chip, Modal } from "@nextui-org/react";
import ScheduleModal from "./ScheduleModal";
import { useAppContext } from "@/app/app-provider";
import { infoPatient } from "@/types/customer";
import authApi from "@/apiRequests/customer/customer";
import { toast } from "react-toastify";
import { generateColor } from "@/lib/utils";

interface ProfileProps {
  id: string;
}

const Profile = ({ id }: ProfileProps) => {
  const { user } = useAppContext();
  const [profiles, setProfiles] = useState<infoPatient[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

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

      <div className="grid gap-6 grid-cols-2 mb-10">
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
                <h3 className="text-lg font-semibold mb-2">
                  {profile.full_name}
                </h3>

                <div className="text-gray-500 mb-3">
                  <span className="text-gray-700 font-semibold">
                    Ngày sinh:{" "}
                  </span>
                  {profile.dob}
                </div>

                <div className="text-gray-500 mb-3">
                  <span className="text-gray-700 font-semibold">
                    Căn cước công dân:{" "}
                  </span>
                  {profile.citizen_id}
                </div>

                <div className="text-gray-500 mb-3">
                  <span className="text-gray-700 font-semibold">
                    Số điện thoại:{" "}
                  </span>
                  {profile.phone_number}
                </div>
              </div>
            </div>

            <div className="mt-4 text-gray-500">
              <span className="text-gray-700 font-semibold">Địa chỉ: </span>
              {profile.address}
            </div>

            <div className="flex mt-4 text-gray-500 space-x-4">
              <div>
                <span className="text-gray-700 font-semibold">Phường: </span>
                {profile.ward}
              </div>

              <div>
                <span className="text-gray-700 font-semibold">Quận: </span>
                {profile.district}
              </div>

              <div>
                <span className="text-gray-700 font-semibold">Thành phố: </span>
                {profile.city}
              </div>
            </div>

            <div className="mt-4 text-gray-500">
              <span className="text-gray-700 font-semibold">
                Mô tả bệnh lý:{" "}
              </span>
              {profile.medical_description}
            </div>

            <div className="mt-4 text-gray-500">
              <span className="text-gray-700 font-semibold">
                Lưu ý với điều dưỡng:{" "}
              </span>
              {profile.note_for_nurses}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <p className="text-gray-700 font-semibold">Dịch vụ:</p>
              {profile.techniques.map((technique, index: number) => (
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
          </div>
        ))}
      </div>

      <ScheduleModal
        id={id}
        profileServices={
          profiles
            .find((profile) => profile.id === selectedProfile)
            ?.techniques.map((technique) => technique.name) || []
        }
        visible={isModalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Profile;
