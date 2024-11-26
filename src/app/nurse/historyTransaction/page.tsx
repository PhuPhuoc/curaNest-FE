'use client';
import { Tabs, Tab } from '@nextui-org/react';
import HistoryTransactionNurse from '@/app/components/historyTransaction/HistoryTransactionNurse';
import Review from '@/app/components/findingNurse/Review';
const NurseProfileTabs = () => {
    return (
        <div className="flex justify-center items-center">
            <div className=" w-full">
                <Tabs aria-label="Nurse Profile Tabs" variant="underlined">
                    <Tab title="Lịch sử">
                        <HistoryTransactionNurse />
                    </Tab>
                    <Tab title="Phản hồi">
                        <Review />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default NurseProfileTabs;