'use client';

import { Button } from '@nextui-org/react';
import { useState } from 'react';

// Function lấy ngày bắt đầu tuần (Thứ Hai) cho một ngày nhất định
const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const formatDate = (date: Date) => {
  const options = { weekday: 'short', day: '2-digit', month: '2-digit' } as const;
  return date.toLocaleDateString('vi-VN', options);
};

type Schedule = {
  [time: string]: {
    [day: string]: boolean;
  };
};

const WorkingSchedule = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getMonday(new Date()));

  const times = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  // Generate days of the week based on the start of the week
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(currentWeekStart);
    day.setDate(currentWeekStart.getDate() + i);
    return formatDate(day);
  });

  // Initialize the schedule with all slots as unselected
  const [schedule, setSchedule] = useState<Schedule>(() => {
    const initialSchedule: Schedule = {};
    times.forEach(time => {
      initialSchedule[time] = {};
      daysOfWeek.forEach(day => {
        initialSchedule[time][day] = false;
      });
    });
    return initialSchedule;
  });

  // Toggle the selected state of a time slot
  const handleToggle = (time: string, day: string) => {
    setSchedule(prev => ({
      ...prev,
      [time]: {
        ...prev[time],
        [day]: !prev[time][day],
      },
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const selectedDates = Object.entries(schedule).flatMap(([time, days]) =>
      Object.entries(days)
        .filter(([day, selected]) => selected)
        .map(([day]) => `${time} - ${day}`)
    );

    if (selectedDates.length > 0) {
      console.log('Selected Dates:', selectedDates);
    } else {
      console.log('No dates selected.');
    }
  };

  // Move to the next week
  const goToNextWeek = () => {
    setCurrentWeekStart(prev => {
      const nextWeek = new Date(prev);
      nextWeek.setDate(prev.getDate() + 7);
      return getMonday(nextWeek);
    });
  };

  // Move to the previous week
  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => {
      const prevWeek = new Date(prev);
      prevWeek.setDate(prev.getDate() - 7);
      return getMonday(prevWeek);
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng ký lịch làm việc</h3>

      {/* Header for year and week navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button>Năm {currentWeekStart.getFullYear()}</Button>
        <div className="flex items-center space-x-4">
          <Button onClick={goToPreviousWeek}>{'<<'}</Button>
          <span className="font-semibold">
            {formatDate(currentWeekStart)} - {formatDate(new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000))}
          </span>
          <Button onClick={goToNextWeek}>{'>>'}</Button>
        </div>
        <Button onClick={handleSubmit} color='primary'>Đăng ký</Button>
      </div>

      {/* Weekly schedule table */}
      <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2"></th>
              {daysOfWeek.map(day => (
                <th key={day} className="border border-gray-300 p-2 text-center font-semibold text-gray-600">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr key={time}>
                <td className="border border-gray-300 p-2 font-semibold text-gray-600 text-center">{time}</td>
                {daysOfWeek.map(day => (
                  <td key={day} className="border border-gray-300 p-2 text-center cursor-pointer">
                    <div
                      className={`p-4 rounded-lg ${schedule[time][day] ? 'bg-green-200' : '#d1d5db'}`}
                      onClick={() => handleToggle(time, day)}
                    >
                      {schedule[time][day] && <span className="text-green-500 font-bold">✔</span>}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkingSchedule;