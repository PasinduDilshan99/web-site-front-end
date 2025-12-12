// app/blog/[id]/components/Sidebar.tsx
import { BlogTag } from "@/types/blog-types";
import React from "react";
import AuthorCard from "./AuthorCard";
import RelatedBlogs from "./RelatedBlogs";
import PopularTags from "./PopularTags";

interface SidebarProps {
  writerName: string;
  blogCount: number;
  relatedBlogs: any[];
  tags: BlogTag[];
  loadingTags: boolean;
  onTagClick: (tagName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  writerName,
  blogCount,
  relatedBlogs,
  tags,
  loadingTags,
  onTagClick,
}) => {
  return (
    <div className="lg:col-span-1 space-y-8">
      <AuthorCard writerName={writerName} blogCount={blogCount} />
      <RelatedBlogs relatedBlogs={relatedBlogs} writerName={writerName} />
      <PopularTags
        tags={tags}
        loadingTags={loadingTags}
        onTagClick={onTagClick}
      />
    </div>
  );
};

export default Sidebar;