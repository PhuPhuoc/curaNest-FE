import NurseLayout from "@/app/layout/nurseLayout/NurseLayout";
import LoadingPage from "@/app/loading";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <NurseLayout>{children}</NurseLayout>
      </Suspense>
    </div>
  );
}
