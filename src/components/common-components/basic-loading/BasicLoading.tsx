import React from "react";

const BasicLoading = ({ width, height }: { width: string; height: string }) => {
  return (
    <div className={`flex items-center justify-center ${width} ${height} `}>
      <div className="flex space-x-2">
        <span className="h-3 w-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="h-3 w-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="h-3 w-3 bg-purple-600 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default BasicLoading;
