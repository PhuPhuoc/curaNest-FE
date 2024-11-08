import { CircularProgress } from "@nextui-org/react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20">
      <CircularProgress aria-label="Loading..." />
    </div>
  );
};

export default LoadingPage;
