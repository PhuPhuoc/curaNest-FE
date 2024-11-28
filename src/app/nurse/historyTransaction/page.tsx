"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Review from "@/app/components/findingNurse/Review";
import { useAppContext } from "@/app/app-provider";
import HistoryWalletNurse from "@/app/components/historyTransaction/HistoryWalletNurse";
import HistoryTransactionNurse from "@/app/components/historyTransaction/HistoryTransactionNurse";

const NurseProfileTabs = () => {
  const { user } = useAppContext();
  return (
    <div className="flex justify-center items-center">
      <div className=" w-full">
        <Tabs aria-label="Nurse Profile Tabs" variant="underlined">
        <Tab title="Giao dịch">
            <HistoryTransactionNurse nurseId={user?.id} />
          </Tab>
          <Tab title="Ví tiền">
            <HistoryWalletNurse nurseId={user?.id} />
          </Tab>
          <Tab title="Phản hồi">
            <Review nurseId={user?.id} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default NurseProfileTabs;
