// app/blog/[id]/components/BlogTags.tsx
import React from "react";
import { Tag } from "lucide-react";
import { BlogTag } from "@/types/blog-types";

interface BlogTagsProps {
  tags: BlogTag[];
  loadingTags: boolean;
  onTagClick: (tagName: string) => void;
}

const BlogTags: React.FC<BlogTagsProps> = ({ tags, loadingTags, onTagClick }) => {
  return (
    <div className="mt-8 pt-8 border-t border-purple-100">
      <div className="flex flex-wrap items-center gap-2">
        <Tag className="w-5 h-5 text-purple-600" />
        <span className="text-sm font-medium text-purple-700">Popular Tags:</span>
        {loadingTags ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-500">Loading tags...</span>
          </div>
        ) : tags.length > 0 ? (
          tags.slice(0, 8).map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick(tag.name)}
              className="px-3 py-1 bg-gradient-to-r from-purple-50 to-amber-50 text-purple-700 rounded-full text-sm hover:from-purple-100 hover:to-amber-100 transition-colors cursor-pointer border border-purple-200"
            >
              #{tag.name}
            </button>
          ))
        ) : (
          <span className="text-sm text-gray-500">No tags available</span>
        )}
      </div>
    </div>
  );
};

export default BlogTags;