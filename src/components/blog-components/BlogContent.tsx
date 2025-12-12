// app/blog/[id]/components/BlogContent.tsx
import React from "react";

interface BlogContentProps {
  description: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ description }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div
        className="text-gray-700 leading-relaxed text-lg space-y-6"
        dangerouslySetInnerHTML={{
          __html:
            description.replace(/\n/g, "<br />") || "<p>No content available.</p>",
        }}
      />
    </div>
  );
};

export default BlogContent;