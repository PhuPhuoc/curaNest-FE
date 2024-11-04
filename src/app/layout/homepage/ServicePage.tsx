import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Image1 from "../../../../public/t1.png";
import Image2 from "../../../../public/t2.png";
import Image3 from "../../../../public/t3.png";
import Image4 from "../../../../public/t4.png";

const TreatmentPage = () => {
  const treatments = [
    {
      id: 1,
      title: "Đưa đón đi khám bệnh",
      description: "Người dùng sẽ book điều dưỡng đến nhà để đưa người thân của mình đi khám ở bệnh viện nơi mà điều dưỡng đang làm việc (hoặc bệnh viện khác tùy theo yêu cầu của gia đình bệnh nhân)",
      imageSrc: Image1,
    },
    {
      id: 2,
      title: "Chăm sóc tại nhà",
      description:"Người dùng book điều dưỡng về nhà để chăm sóc cho bệnh nhân theo giờ.",
      imageSrc: Image2,
    },
    {
      id: 3,
      title: "Chăm sóc tại bệnh viện",
      description:"Người dùng book điều dưỡng trực tại bệnh viện để chăm sóc hoặc có thể làm bảo mẫu",
      imageSrc: Image3,
    },
    {
      id: 4,
      title: "Hỗ trợ phục hồi chức năng",
      description: "Người dùng book điều dưỡng để giúp bệnh nhân thực hiện các bài tập phục hồi chức năng tại nhà sau phẫu thuật hoặc chấn thương.",
      imageSrc: Image4,
    },
  ];

  return (
    <div className="p-10">
      <p className="flex justify-center items-center m-10 text-4xl font-semibold">
        CURANEST <span className="text-lime-500 ml-2">DỊCH VỤ</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-5">
        {treatments.map((treatment) => (
          <Card
            key={treatment.id}
            className="flex flex-col items-center p-5 shadow-lg rounded-xl transform transition-transform hover:scale-105"
          >
            <CardHeader className="flex flex-col items-center">
              <div className="img-box mb-3">
                <Image
                  src={treatment.imageSrc}
                  alt={treatment.title}
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-xl font-semibold">{treatment.title}</p>
            </CardHeader>
            <CardBody className="text-wrap text-left break-words text-gray-400">
              <p>{treatment.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TreatmentPage;
