"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Chip, Button, CircularProgress } from "@nextui-org/react";
import { useAppContext } from "../app-provider";
import authApiRequest from "@/apiRequests/customer/customer";
import { toast } from "react-toastify";

interface InfoCustomerRes {
  email: string;
  user_name: string;
  avatar: string;
  user_id: string;
  citizen_id: string;
  full_name: string;
  phone_number: string;
  dob: string;
  ward: string;
  district: string;
  city: string;
  address: string;
  created_at: string;
}

const InfoUser: React.FC = () => {
  const { user } = useAppContext();
  const [profile, setProfile] = useState<InfoCustomerRes | null>(null); // Change to store a single profile

  useEffect(() => {
    if (user?.id) {
      const fetchProfile = async () => {
        try {
          const response = await authApiRequest.infoCustomer(user.id);
          setProfile(response.payload.data);
        } catch (error) {
          toast.error("Không thể tải thông tin khách hàng.");
          console.error("Failed to fetch customer info", error);
        }
      };
      fetchProfile();
    }
  }, [user]);

  if (!profile) {
    return <div>Không có thông tin khách hàng</div>;
  }

  return (
    <div className="mb-4">
      <div className="grid gap-1 grid-cols-1">
      {/* className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col p-4 w-full" */}
        <div>
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
                <div className="text-xl font-semibold">{profile.full_name}</div>
              </div>

              <div className="flex space-x-12 mt-8">
                <div className="text-gray-500 text-lg">
                  <span className="text-gray-700 font-semibold">
                    Ngày sinh:{" "}
                  </span>
                  {profile.dob}
                </div>

                <div className="text-gray-500 text-lg">
                  <span className="text-gray-700 font-semibold">Căn cước công dân: </span>
                  {profile.citizen_id}
                </div>

                <div className="text-gray-500 text-lg">
                  <span className="text-gray-700 font-semibold">
                   Email: {" "}
                  </span>
                  {profile.email}
                </div>

                <div className="text-gray-500 text-lg">
                  <span className="text-gray-700 font-semibold">
                    Số điện thoại:{" "}
                  </span>
                  {profile.phone_number}
                </div>            
              </div>

              <div className="flex space-x-20 mt-8">
                <div className="text-gray-500 text-lg">
                  <span className="text-gray-700 font-semibold">Địa chỉ: </span>
                  {profile.address}
                </div>

                <div className="text-gray-500 text-lg">
                  <span className="text-gray-700 font-semibold">Phường: </span>
                  {profile.ward}
                </div>

                <div className="text-gray-500 text-lg">
                  <span className="text-gray-700 font-semibold">Quận: </span>
                  {profile.district}
                </div>

                <div className="text-gray-500 text-lg">
                  <span className="text-gray-700 font-semibold">Thành phố: </span>
                  {profile.city}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
