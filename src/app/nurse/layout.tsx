import NurseLayout from "@/app/layout/nurseLayout/NurseLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NurseLayout>{children}</NurseLayout>
    </div>
  );
}
