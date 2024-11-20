import NurseDetail from "@/app/components/nurseManagement/NurseDetail";

const Page = ({ params }: { params: { id: string } }) => {

  return (
    <div>
      <NurseDetail id={params.id} />
    </div>
  );
};

export default Page;
