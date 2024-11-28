import http from "@/lib/http";
import { ReviewRes } from "@/types/review";

const reviewApiRequest = {
  getReview: (id: string) => http.get<ReviewRes>(`/appointments/nurse/${id}/reviews`),
  
};

export default reviewApiRequest;
