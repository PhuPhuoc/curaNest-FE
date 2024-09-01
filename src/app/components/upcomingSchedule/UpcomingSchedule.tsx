import { Card, CardBody, Button, Badge, Avatar } from "@nextui-org/react";

const scheduleData = [
  {
    id: 1,
    patientName: "John Doe",
    phone: "123-456-7890",
    title: "General Checkup",
    doctor: "Dr. Smith",
    date: "2024-09-15",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    phone: "234-567-8901",
    title: "Dental Cleaning",
    doctor: "Dr. Johnson",
    date: "2024-09-20",
    time: "2:30 PM",
    status: "Pending",
  },
  {
    id: 3,
    patientName: "Mike Brown",
    phone: "345-678-9012",
    title: "Eye Exam",
    doctor: "Dr. Williams",
    date: "2024-09-25",
    time: "11:15 AM",
    status: "Rescheduled",
  },
];

const UpcomingSchedule = () => {
  return (
    <div
      className={`container mx-auto px-4  ${
        scheduleData.length >= 4 ? "min-h-[500px] overflow-y-auto" : ""
      }`}
    >
      <h2 className="text-2xl font-bold my-4">Lịch hẹn sắp tới</h2>
      <div className="flex flex-col space-y-4 bg-white p-6 lg:mb-10 rounded-2xl">
        {scheduleData.length > 0 ? (
          scheduleData.map((appointment) => (
            <Card
              key={appointment.id}
              className="w-full transition-all duration-300 ease-in-out hover:shadow-xl "
            >
              <CardBody className="p-4">
                <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-6 sm:space-x-6">
                  <Avatar
                    name={appointment.patientName}
                    src={`https://i.pravatar.cc/150?u=${appointment.id}`}
                    className="w-24 h-24 text-large transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                  <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 w-full text-center sm:text-left">
                    <div className="col-span-2 sm:col-span-1">
                      <p className="font-semibold">Patient Name</p>
                      <p className="text-sm">{appointment.patientName}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-sm">{appointment.phone}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Appointment</p>
                      <p className="text-sm">{appointment.title}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Doctor</p>
                      <p className="text-sm">{appointment.doctor}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Date</p>
                      <p className="text-sm">
                        {new Date(appointment.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Time</p>
                      <p className="text-sm">{appointment.time}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Status</p>
                      <Badge
                        color={
                          appointment.status === "Confirmed"
                            ? "success"
                            : appointment.status === "Pending"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                    <Button
                      size="sm"
                      color="primary"
                      className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <p className="text-lg text-center text-gray-600">
            Chưa có lịch hẹn hiện tại
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingSchedule;
