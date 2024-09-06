'use client'
import React from 'react';
import Timetable from '@/app/components/findingNurse/TimeTable';
import Review from '@/app/components/findingNurse/Review';

const DetailNurse = () => {
    const nurseDetails = {
        name: 'Nguyễn Thị A',
        education: 'Cử nhân Điều dưỡng - Đại học Y Hà Nội',
        experience: '5 năm kinh nghiệm tại Bệnh viện Bạch Mai',
        specialties: 'Chăm sóc bệnh nhân sau phẫu thuật, quản lý thuốc',
        certifications: ['Chứng chỉ Điều dưỡng viên', 'Chứng chỉ Sơ cấp cứu'],
        bio: 'Tận tâm và chuyên nghiệp trong việc chăm sóc bệnh nhân, luôn đặt lợi ích của bệnh nhân lên hàng đầu.'
    };

    const handleTimetableSubmit = (selectedSlots: string[]) => {
        console.log('Selected time slots:', selectedSlots);
    };

    return (
        <div className="bg-white p-6">
            <div className="flex gap-x-10 mb-8">
                <div className="w-60 h-60 flex-shrink-0">
                    <img
                        src="/path-to-nurse-image.jpg"
                        alt="Nurse Image"
                        className="w-full h-full object-cover rounded-lg border border-gray-300"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-4">{nurseDetails.name}</h1>
                    <p className="text-lg mb-2"><strong>Trình độ học vấn:</strong> {nurseDetails.education}</p>
                    <p className="text-lg mb-2"><strong>Kinh nghiệm làm việc:</strong> {nurseDetails.experience}</p>
                    <p className="text-lg mb-2"><strong>Chuyên môn:</strong> {nurseDetails.specialties}</p>
                    <p className="text-lg mb-2"><strong>Chứng chỉ:</strong></p>
                    <ul className="list-disc ml-6 mb-4">
                        {nurseDetails.certifications.map((cert, index) => (
                            <li key={index} className='mb-1'>{cert}</li>
                        ))}
                    </ul>
                    <p className="text-lg"><strong>Tiểu sử:</strong> {nurseDetails.bio}</p>
                </div>
            </div>

            {/* Timetable Component */}
            <Timetable onSubmit={handleTimetableSubmit} />

            {/* Review Component */}
            <Review />
        </div>
    );
};

export default DetailNurse;