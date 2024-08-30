import { Button } from "@nextui-org/react";
import Image from "next/image";
import ImageSlider from "../../../../public/slider-img.jpg";

const SliderPage = () => {
  return (
    <div className="flex flex-col items-center justify-center  p-5 pt-0 shadow-xl bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center max-w-6xl w-full">
        <div className="flex flex-col md:w-1/2 gap-5 text-center md:text-left">
          <p className="font-semibold text-6xl">
            CURANEST <span className="text-lime-500">BOOKING</span>
          </p>
          <p className="max-w-[500px] mx-auto md:mx-0 text-gray-500 mt-2 text-lg">
            when looking at its layout. The point of using Lorem Ipsum is that
            it has a more-or-less normal distribution of letters, as opposed to
          </p>
          <Button className="w-1/2 md:w-[30%] mx-auto md:mx-0 bg-lime-500 text-white py-2 rounded-lg font-semibold">
            GET STARTED
          </Button>
        </div>
        <div className="relative w-full md:w-1/2 mt-5 md:mt-0 overflow-hidden">
          <div className="flex animate-carousel space-x-5">
            <div className="min-w-full">
              <Image
                src={ImageSlider}
                alt="Slide 1"
                className="object-cover w-full h-auto rounded-lg"
              />
            </div>
            <div className="min-w-full">
              <Image
                src={ImageSlider}
                alt="Slide 2"
                className="object-cover w-full h-auto rounded-lg"
              />
            </div>
            <div className="min-w-full">
              <Image
                src={ImageSlider}
                alt="Slide 3"
                className="object-cover w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderPage;
