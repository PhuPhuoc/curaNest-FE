import Image from "next/image";
import ImageAbout from "../../../../public/about-img.jpg";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 pt-0 ">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-10">
        <div className="w-full md:w-1/2">
          <Image
            src={ImageAbout}
            alt="About Image"
            className="object-cover w-full h-auto rounded-lg mt-4"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 gap-5 text-center md:text-left">
          <p className="font-semibold text-4xl ">
            ABOUT <span className="text-lime-500">CURANEST</span>
          </p>
          <p className="max-w-[500px] mx-auto md:mx-0 text-gray-500 mt-2 text-lg">
            When looking at its layout, the point of using Lorem Ipsum is that
            it has a more-or-less normal distribution of letters, as opposed to
            When looking at its layout, the point of using Lorem Ipsum is that
            it has a more-or-less normal distribution of letters, as opposed to
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
