// components/TourControls.tsx

interface TourControlsProps {
  returnToStart: boolean;
  onReturnToStartChange: (value: boolean) => void;
  locations: Location[];
}

export default function TourControls({
  returnToStart,
  onReturnToStartChange,
  locations,
}: TourControlsProps) {
  if (locations.length === 0) return null;

  return (
    <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={returnToStart}
            onChange={(e) => onReturnToStartChange(e.target.checked)}
          />
          <div
            className={`block w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors duration-200 ${
              returnToStart ? "bg-red-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform duration-200 ${
              returnToStart ? "transform translate-x-5 sm:translate-x-6" : ""
            }`}
          ></div>
        </div>
        <div className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-700 font-medium">
          Include Return Journey
        </div>
      </label>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3 h-0.5 sm:w-4 sm:h-1 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Forward Journey</span>
        </div>
        {returnToStart && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="w-3 h-0.5 sm:w-4 sm:h-1 bg-red-500 rounded border border-red-300"
              style={{ borderStyle: "dashed" }}
            ></div>
            <span className="text-gray-600">Return Journey</span>
          </div>
        )}
      </div>
    </div>
  );
}
