import React from "react";

const BasicLoading = ({ width, height }: { width: string; height: string }) => {
  return (
    <div className={`flex items-center justify-center ${width} ${height}`}>
      <div className="flex space-x-3">
        <span className="h-3 w-3 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s] shadow-lg shadow-teal-500/30" />
        <span className="h-3 w-3 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s] shadow-lg shadow-cyan-500/30" />
        <span className="h-3 w-3 bg-emerald-500 rounded-full animate-bounce shadow-lg shadow-emerald-500/30" />
      </div>
    </div>
  );
};

export default BasicLoading;