'use client';
import React, { useState } from 'react';
import { DatePicker, DateValue, Chip } from '@nextui-org/react';
import { getLocalTimeZone, today } from "@internationalized/date";
import { format } from 'date-fns';

const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "20:00", "21:00", "22:00"
];

interface DateTimeProps {
    selectedDate: DateValue | null;
    selectedTime: string[];
    onDateChange: (date: DateValue | null) => void;
    onTimeChange: (time: string[] | null) => void;
}

function DateTime({ selectedDate, selectedTime, onDateChange, onTimeChange }: DateTimeProps) {

    const handleDateChange = (date: DateValue | null) => {
        onDateChange(date);
    };

    const handleTimeChipClick = (time: string) => {
        let updatedSelection: string[];
        if (selectedTime.includes(time)) {
            updatedSelection = selectedTime.filter((item) => item !== time);
        } else {
            updatedSelection = [...selectedTime, time];
        }
        onTimeChange(updatedSelection);
    };

    // Formate Date
    const formatDate = (date: DateValue | null) => {
        if (!date) return '';
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return format(jsDate, 'dd/MM/yyyy');
    };

    const groupedTimeSlots = [];
    for (let i = 0; i < timeSlots.length; i += 7) {
        groupedTimeSlots.push(timeSlots.slice(i, i + 7));
    }

    return (
        <div className="p-4">
            <DatePicker
                // Không chọn được ngày hôm qua
                minValue={today(getLocalTimeZone())}
                defaultValue={today(getLocalTimeZone()).subtract({ days: 1 })}
                label="Chọn ngày"
                value={selectedDate}
                onChange={handleDateChange}
                className="mb-4"
                size='lg'
            />

            {selectedDate && (
                <div>
                    <p className='mb-3 text-red-500 font-semibold'>Ngày đã chọn: {formatDate(selectedDate)}</p>
                    <div className="flex flex-col gap-2">
                        {groupedTimeSlots.map((group, index) => (
                            <div key={index} className="flex gap-2">
                                {group.map((time) => (
                                    <Chip
                                        key={time}
                                        className={`p-2 rounded-full border ${selectedTime.includes(time)
                                            ? 'bg-blue-800 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}
                                        onClick={() => handleTimeChipClick(time)}
                                        size='lg'
                                    >
                                        {time}
                                    </Chip>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DateTime;