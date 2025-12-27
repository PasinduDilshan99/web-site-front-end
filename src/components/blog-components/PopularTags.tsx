// app/blog/[id]/components/PopularTags.tsx
import { BlogTag } from "@/types/blog-types";
import React from "react";

interface PopularTagsProps {
  tagList: BlogTag[];
  loadingTags: boolean;
  onTagClick: (tagName: string) => void;
}

const PopularTags: React.FC<PopularTagsProps> = ({ tagList, loadingTags, onTagClick }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-200">
      <h3 className="text-xl font-bold text-purple-900 mb-6">Popular Tags</h3>
      {loadingTags ? (
        <div className="text-center py-4">
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">Loading tags...</p>
        </div>
      ) : tagList.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tagList.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick(tag.name)}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-amber-50 text-purple-700 rounded-full text-sm hover:from-purple-100 hover:to-amber-100 transition-colors cursor-pointer border border-purple-200"
            >
              #{tag.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">No tags available</div>
      )}
    </div>
  );
};

export default PopularTags;