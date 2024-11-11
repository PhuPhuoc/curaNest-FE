import NurseDetail from "@/app/components/nurseManagement/NurseDetail";

const Page = ({ params }: { params: { id: string } }) => {
  console.log("🚀 ~ Page ~ router:", params.id);

  return (
    <div>
      <NurseDetail id={params.id} />
    </div>
  );
};

export default Page;
