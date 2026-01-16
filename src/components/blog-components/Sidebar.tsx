// app/blog/[id]/components/Sidebar.tsx
import { BlogDetailsData, BlogTag } from "@/types/blog-types";
import React, { useEffect, useState } from "react";
import AuthorCard from "./AuthorCard";
import RelatedBlogs from "./RelatedBlogs";
import PopularTags from "./PopularTags";
import { fetchTags } from "@/utils/blog-utils";

interface SidebarProps {
  writerName: string;
  blogCount: number;
  relatedBlogs: BlogDetailsData[];
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
  const [tagList, setTagList] = useState<BlogTag[]>([]);

  const fetchAllTags = async () => {
    try {
      const tagsData = await fetchTags();
      setTagList(tagsData);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchAllTags();
  }, []);

  return (
    <div className="lg:col-span-1 space-y-8">
      <AuthorCard writerName={writerName} blogCount={blogCount} />
      <RelatedBlogs relatedBlogs={relatedBlogs} writerName={writerName} />
      <PopularTags
        tagList={tagList}
        loadingTags={loadingTags}
        onTagClick={onTagClick}
      />
    </div>
  );
};

export default Sidebar;
