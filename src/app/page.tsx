import HeaderHomePage from "@/app/layout/homepage/HeaderHomePage";

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
