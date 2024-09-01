'use client';
import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

interface TimetableProps {
    onSubmit: (selectedSlots: string[]) => void;
}

const Timetable: React.FC<TimetableProps> = ({ onSubmit }) => {
    const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: boolean }>({});
    const [weekDays, setWeekDays] = useState<string[]>([]);

    useEffect(() => {
        const getCurrentWeekDays = () => {
            const today = new Date();
            const dayOfWeek = today.getDay(); 
            const currentWeekDays: string[] = [];

            for (let i = 1; i <= 6; i++) {
                const first = today.getDate() - dayOfWeek + i;
                const day = new Date(today.setDate(first)).toLocaleDateString('vi-VN');
                currentWeekDays.push(day);
            }

            setWeekDays(currentWeekDays);
        };

        getCurrentWeekDays();
    }, []);

    const hours = ['8:00', '9:00', '10:00', '11:00', '12:00'];

    const handleSlotClick = (day: string, hour: string) => {
        const key = `${day}-${hour}`;
        setSelectedSlots((prevSelectedSlots) => ({
            ...prevSelectedSlots,
            [key]: !prevSelectedSlots[key],
        }));
    };

    const handleSubmit = () => {
        const selectedTimes = Object.entries(selectedSlots)
            .filter(([_, selected]) => selected)
            .map(([slot]) => slot);

        onSubmit(selectedTimes);
    };

    const handleReset = () => {
        setSelectedSlots({});
    };

    return (
        <div className="border rounded-lg p-3 shadow-md bg-white">
            <p className='text-2xl font-bold mb-4 text-center'>Lịch làm việc</p>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-3 bg-gray-100"></th>
                            {weekDays.map((day, index) => (
                                <th key={index} className="border p-3 bg-gray-100 text-center">
                                    {`Thứ ${index + 2}`}
                                    <p className='mt-1'>{day}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map((hour) => (
                            <tr key={hour}>
                                <td className="border p-3 font-semibold text-center bg-gray-50 mb-2">{hour}</td>
                                {weekDays.map((day) => {
                                    const key = `${day}-${hour}`;
                                    return (
                                        <td
                                            key={key}
                                            className={`border p-3 cursor-pointer text-center transition-colors duration-200 ${selectedSlots[key] ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
                                                }`}
                                            onClick={() => handleSlotClick(day, hour)}
                                        >
                                            {selectedSlots[key] && '✔'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <Button
                    size="lg"
                    onClick={handleReset}
                    color='danger'
                    className="rounded-lg"
                >
                    Đặt lại
                </Button>

                <Button
                    size="lg"
                    onClick={handleSubmit}
                    color='primary'
                    className="rounded-lg"
                >
                    Tạo
                </Button>
            </div>
        </div>
    );
};

export default Timetable;