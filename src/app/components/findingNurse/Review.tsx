"use client";
import reviewApiRequest from "@/apiRequests/review/review";
import { generateColor } from "@/lib/utils";
import { Chip, CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  technique: string;
}

const Review: React.FC<{ nurseId: string | undefined }> = ({ nurseId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!nurseId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await reviewApiRequest.getReview(nurseId);
        const apiData = response.payload.data.map((review: any) => ({
          id: review.id,
          user: review.patient_name,
          rating: review.rate,
          comment: review.content,
          date: new Date(review.created_at).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          technique: review.techniques,
        }));
        setReviews(apiData);
      } catch (err: any) {
        console.log("Lỗi xảy ra khi fetch review: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [nurseId]);

  return (
    <div>
      <p className="text-2xl font-bold mt-5 mb-5">Đánh giá về điều dưỡng</p>

      <div className="p-6 border rounded-lg shadow-md bg-white">
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress size="lg" color="primary" />
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="mb-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl">{review.user}</p>
                <p className="text-gray-500">{review.date}</p>
              </div>
              <p className="text-yellow-500 text-lg">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="text-lg">{review.comment}</p>

              <div className="mt-4">
                <p className="mb-2 font-bold text-xl">Dịch vụ: </p>
                <Chip
                  className="text-white px-4 py-2"
                  size="md"
                  style={{
                    backgroundColor: generateColor(review.id.toString()),
                  }}
                >
                  {review.technique}
                </Chip>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
