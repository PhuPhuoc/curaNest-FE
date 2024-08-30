import AboutPage from "@/app/layout/homepage/AboutPage";
import HeaderHomePage from "@/app/layout/homepage/HeaderHomePage";
import SliderPage from "@/app/layout/homepage/SliderPage";
import TreatmentPage from "@/app/layout/homepage/TreatmentPage";

export default function Home() {
  return (
    <main className="bg-gray-50">
      <HeaderHomePage />
      <div className="p-20 bg-gray-800 text-white">
        <p className="text-center">Made by @me</p>
      </div>
    </main>
  );
}
