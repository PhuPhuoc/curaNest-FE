import MainLayout from "@/app/layout/userLayout/MainLayout";
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
        <MainLayout>{children}</MainLayout>
      </Suspense>
    </div>
  );
}
