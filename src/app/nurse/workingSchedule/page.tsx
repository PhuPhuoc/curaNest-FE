'use client';

import { Button, Calendar, Chip, DateValue } from '@nextui-org/react';
import { useState } from 'react';
import { today, getLocalTimeZone } from "@internationalized/date";

const WorkingSchedule = () => {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);

  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleDateChange = (date: DateValue | null) => {
    setSelectedDate(date);
    setSelectedTimes([]);
  };

  const handleTimeToggle = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time)); // Unselect time
    } else {
      setSelectedTimes([...selectedTimes, time]); // Select time
    }
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTimes.length > 0) {
      const dateObj = new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.day
      );

      const formattedDate = dateObj.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      console.log('Selected Date:', formattedDate);
      console.log('Selected Times:', selectedTimes.join(', '));
    } else {
      alert('Vui lòng ít nhất một khung giờ.');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng ký lịch làm việc mới</h3>

      <div className="flex flex-col md:flex-row bg-gray-50 rounded-lg shadow-lg overflow-hidden">
        {/* Left Side: Calendar */}
        <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r">
          <Calendar
            onChange={handleDateChange}
            minValue={today(getLocalTimeZone())}
            defaultValue={today(getLocalTimeZone())}
            className="text-lg"
          />
        </div>

        {/* Right Side: Time Selection */}
        <div className="w-full md:w-2/3 p-6">
          {selectedDate && (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-6">
                <p className="text-xl font-semibold text-gray-800">
                  {new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {times.map((time) => (
                  <Chip
                    key={time}
                    size='lg'
                    className={`p-3 rounded-full cursor-pointer transition-transform duration-200 ${selectedTimes.includes(time)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    onClick={() => handleTimeToggle(time)}
                  >
                    {time}
                  </Chip>
                ))}
              </div>

              <div className="mt-auto flex justify-end">
                <Button
                  onClick={handleSubmit}
                  className="py-2 px-5 text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Đăng ký
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkingSchedule;