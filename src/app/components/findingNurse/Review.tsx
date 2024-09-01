'use client'
import React from 'react';

interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

const reviews: Review[] = [
    {
        id: 1,
        user: 'Trần Văn B',
        rating: 5,
        comment: 'Điều dưỡng rất tận tình và chu đáo, tôi rất hài lòng.',
        date: '01/08/2024',
    },
    {
        id: 2,
        user: 'Nguyễn Thị C',
        rating: 4,
        comment: 'Dịch vụ rất tốt, điều dưỡng rất thân thiện.',
        date: '10/07/2024',
    },
    {
        id: 3,
        user: 'Lê Minh D',
        rating: 3,
        comment: 'Dịch vụ ổn nhưng cần cải thiện thời gian chờ đợi.',
        date: '15/06/2024',
    },
];

const Review: React.FC = () => {
    return (
        <div className="mt-8 p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">Đánh giá về điều dưỡng</h2>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} className="mb-4">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{review.user}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <p className="text-yellow-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                        <p className="mt-2">{review.comment}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Chưa có đánh giá nào.</p>
            )}
        </div>
    );
};

export default Review; 