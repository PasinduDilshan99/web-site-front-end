// components/EmptyState.tsx
export default function EmptyState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm p-8 sm:p-12 text-center max-w-md w-full">
        <svg
          className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          No Locations Found
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Try a different tour ID to explore destinations.
        </p>
      </div>
    </div>
  );
}
