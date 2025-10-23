// components/ErrorState.tsx
interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-md w-full">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-red-800 font-semibold text-sm sm:text-base mb-1">
              Error Loading Tour
            </h3>
            <p className="text-red-600 text-xs sm:text-sm">{error}</p>
            <button
              onClick={onRetry}
              className="mt-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-xs sm:text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
