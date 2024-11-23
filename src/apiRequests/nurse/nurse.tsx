import http from "@/lib/http";
import {
  AvailableScheduleWorkRes,
  CreateNurseData,
  CreateScheduleData,
  CreateScheduleDataRes,
  DetailNurseRes,
  DetailScheduleRes,
  NurseRes,
  NurseScheduleCardRes,
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
  nurseScheduleCard: (id: string, role: string, from?: string, to?: string) => {
    let url = `appointments/card/${id}?role=${role}`;
    if (from) {
      url += `&from=${from}`;
    }
    if (to) {
      url += `&to=${to}`;
    }

    return http.get<NurseScheduleCardRes>(url);
  },
  
  detailScheduleWork: (id: string) =>
    http.get<DetailScheduleRes>(`/appointments/${id}`),
  detailNurse: (id: string, role: string) =>
    http.get<DetailNurseRes>(`/nurses/${id}?role=${role}`),
  confirmOrCancelSchedule: (id: string, confirm: string) =>
    http.post<CreateRes>(`/appointments/${id}/confirm?confirm=${confirm}`, {}),
  createNurse: (body: CreateNurseData) => http.post<CreateRes>(`/nurses`, body),

  createScheduleWork: (id: string, body: CreateScheduleData) =>
    http.post<CreateScheduleDataRes>(
      `/nurses/${id}/register-weekly-work-schedule`,
      body
    ),

  availableScheduleWork: (id: string, from: string, to: string, totalMinute: string) =>
    http.get<AvailableScheduleWorkRes>(
      `/nurses/${id}/get-suitable-time-frames?from=${from}&to=${to}&total_minute=${totalMinute}`
    ),
};

export default nurseApiRequest;