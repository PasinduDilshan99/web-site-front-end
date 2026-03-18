// app/blog/[id]/components/BlogContent.tsx
import React from "react";

interface BlogContentProps {
  description: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ description }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
        {description?.trim() || "No content available."}
      </div>
    </div>
  );
};

export default BlogContent;
