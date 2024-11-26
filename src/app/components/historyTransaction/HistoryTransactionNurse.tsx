'use client';
import { Card, CardHeader, CardBody, Chip, Avatar } from '@nextui-org/react';

const HistoryTransactionNurse = () => {
    const transactions = [
        { id: 1, customer: 'Nguyen Van A', status: 'Thành công', date: '01/09/2024', address: '123 Le Van Viet', phone: '0123456789', serviceType: 'Consultation', avatarUrl: 'https://via.placeholder.com/50' },
        { id: 2, customer: 'Le Thi B', status: 'Thất bại', date: '15/08/2024', address: '456 Elm St', phone: '0987654321', serviceType: 'Checkup', avatarUrl: 'https://via.placeholder.com/50' },
        { id: 3, customer: 'Tran Van C', status: 'Hủy giao dịch', date: '28/07/2024', address: '789 Oak St', phone: '1234567890', serviceType: 'Emergency', avatarUrl: 'https://via.placeholder.com/50' },
    ];

    const serviceColors = (serviceType: string) => {
        switch (serviceType) {
            case 'Consultation':
                return '#f9a8d4';
            case 'Checkup':
                return '#f472b6';
            case 'Emergency':
                return '#ec4899';
            default:
                return '#697177';
        }
    };

    const getChipColor = (status: string) => {
        switch (status) {
            case 'Thành công':
                return 'success';
            case 'Hủy giao dịch':
                return 'warning';
            case 'Thất bại':
                return 'danger';
            default:
                return 'default';
        }
    };

    return (
        <div>
            {transactions.map((transaction) => (
                <Card key={transaction.id} className="mb-4">
                    <CardHeader >
                        <div className="flex items-center">
                            <Avatar
                                src={transaction.avatarUrl}
                                style={{ width: '80px', height: '80px', marginRight: "10px" }}
                            />
                            <div>
                                <h4 className="text-lg font-semibold">{transaction.customer}</h4>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div className="flex flex-wrap gap-6 mb-4">
                            <p><strong>Ngày đặt:</strong> {transaction.date}</p>
                            <p><strong>Địa chỉ:</strong> {transaction.address}</p>
                            <p><strong>Số điện thoại:</strong> {transaction.phone}</p>
                        </div>

                        <p className='mb-4'>
                            <strong>Loại dịch vụ: </strong>
                            <Chip
                                className="text-white"
                                style={{ backgroundColor: serviceColors(transaction.serviceType) }}

                            >
                                {transaction.serviceType}
                            </Chip>
                        </p>
                        <p>
                            <strong>Trạng thái giao dịch: </strong>
                            <Chip className='text-white' color={getChipColor(transaction.status)}>{transaction.status}</Chip>
                        </p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default HistoryTransactionNurse;