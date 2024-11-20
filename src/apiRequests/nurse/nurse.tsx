import http from "@/lib/http";
import {
  CreateNurseData,
  DetailNurseRes,
  NurseRes,
  WorkScheduleRes,
} from "@/types/nurse";
import { CreateRes } from "@/types/technique";

const nurseApiRequest = {
  listNurse: (full_name?: string, phone_number?: string) => {
    if (!full_name && !phone_number) {
      return http.get<NurseRes>(`/nurses`);
    }
    const queryParams: string[] = [];
    if (full_name) {
      queryParams.push(`full_name=${encodeURIComponent(full_name)}`);
    }
    if (phone_number) {
      queryParams.push(`phone_number=${encodeURIComponent(phone_number)}`);
    }
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    return http.get<NurseRes>(`/nurses${queryString}`);
  },
  scheduleWork: (id: string, from: string, to: string) =>
    http.get<WorkScheduleRes>(
      `/nurses/${id}/get-weekly-work-schedule?from=${from}&to=${to}`
    ),
  detailNurse: (id: string, role: string) =>
    http.get<DetailNurseRes>(`/nurses/${id}?role=${role}`),
  createNurse: (body: CreateNurseData) => http.post<CreateRes>(`/nurses`, body),
};

export default nurseApiRequest;
