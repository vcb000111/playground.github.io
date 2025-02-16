
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Welcome to DP-IT Playground
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
        Khám phá các công cụ và trò chơi thú vị trong menu bên trái. 
        Chọn một mục để bắt đầu trải nghiệm!
      </p>
    </div>
  );
}
