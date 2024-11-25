'use client';
import { Tabs, Tab } from '@nextui-org/react';
import HistoryTransactionNurse from '@/app/components/historyTransaction/HistoryTransactionNurse';
import Review from '@/app/components/findingNurse/Review';
const NurseProfileTabs = () => {
    return (
        <div className="w-full mx-auto p-5">
            <Tabs aria-label="Nurse Profile Tabs" variant="underlined">
                <Tab title="Lịch sử">
                    <HistoryTransactionNurse />
                </Tab>
                <Tab title="Phản hồi">
                    <Review />
                </Tab>
            </Tabs>
        </div>
    );
};

export default NurseProfileTabs;