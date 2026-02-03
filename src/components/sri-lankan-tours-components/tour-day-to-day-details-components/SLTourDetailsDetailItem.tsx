export const SLTourDetailsDetailItem: React.FC<{
  label: string;
  value: string;
  description: string;
}> = ({ label, value, description }) => (
 <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-amber-200 transition-all duration-300 hover:shadow-sm sm:hover:shadow-md">
  {/* Icon Container */}
  <div className="relative flex-shrink-0">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-600/20 flex items-center justify-center shadow-sm">
      {label === "Duration" && (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )}
      {label === "Tour Type" && (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
        </svg>
      )}
      {label === "Category" && (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )}
      {label === "Best Season" && (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
        </svg>
      )}
      {!["Duration", "Tour Type", "Category", "Best Season"].includes(label) && (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  </div>

  {/* Content */}
  <div className="flex-1 min-w-0">
    <div className="flex items-baseline justify-between gap-2 mb-1">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      {/* Optional badge for important info */}
      {["Duration", "Best Season"].includes(label) && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${label === "Duration" ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
          Important
        </span>
      )}
    </div>
    
    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 truncate">
      {value}
    </h4>
    
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0 hidden sm:block" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
        {description}
      </p>
    </div>
    
    {/* Additional info for desktop */}
    <div className="hidden sm:block mt-2 text-xs text-gray-500">
      Tap card for more details
    </div>
  </div>
</div>
);
