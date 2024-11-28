import { ModalSubmit } from "@/app/components/historyTransaction/HistoryTransaction";
import http from "@/lib/http";
import { CreateRes } from "@/types/technique";

const feedbackApiRequest = {
  createReviews: (id: string, body: ModalSubmit) =>
    http.post<CreateRes>(`/appointments/${id}/reviews`, body),
};

export default feedbackApiRequest;
