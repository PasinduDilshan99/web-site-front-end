// components/LoadingState.tsx
export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm p-8 sm:p-12 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 text-sm sm:text-base">
          Loading tour data...
        </p>
      </div>
    </div>
  );
}
