import http from "@/lib/http";
import { DetailNurseRes, NurseRes } from "@/types/nurse";

const nurseApiRequest = {
  listNurse: () => http.get<NurseRes>("/nurses"),
  detailNurse: (id: string, role: string) =>
    http.get<DetailNurseRes>(`/nurses/${id}?role=${role}`),
};

export default nurseApiRequest;
