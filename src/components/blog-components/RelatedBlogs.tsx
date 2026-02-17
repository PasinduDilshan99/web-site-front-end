// app/blog/[id]/components/RelatedBlogs.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/blog-utils";
import { BlogDetailsData, BlogImage } from "@/types/blog-types";

interface RelatedBlogsProps {
  relatedBlogs: BlogDetailsData[];
  writerName: string;
}

const RelatedBlogs: React.FC<RelatedBlogsProps> = ({ relatedBlogs, writerName }) => {
  const router = useRouter();

  if (relatedBlogs.length === 0) return null;

  const getImageUrl = (image: BlogImage) => {
    if (!image?.image_url) {
      return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80";
    }
    if (image.image_url.startsWith("http")) {
      return image.image_url;
    }
    return `http://localhost:8080${image.image_url}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-teal-200">
      <h3 className="text-xl font-bold text-teal-800 mb-6">
        More from {writerName}
      </h3>
      <div className="space-y-4">
        {relatedBlogs.map((blog) => (
          <div
            key={blog.blog_id}
            onClick={() => router.push(`/blogs/${blog.blog_id}`)}
            className="group cursor-pointer p-4 rounded-xl border border-teal-100 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              {blog.images && blog.images.length > 0 && (
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={getImageUrl(blog.images[0])}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={handleImageError}
                  />
                </div>
              )}
              <div>
                <h4 className="font-semibold text-teal-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(blog.blog_created_at)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => router.push(`/blogs?writer=${writerName}`)}
        className="w-full mt-6 py-3 text-center text-teal-700 font-medium hover:text-blue-600 transition-colors border border-teal-300 rounded-xl hover:border-blue-300"
      >
        View All Blogs →
      </button>
    </div>
  );
};

export default RelatedBlogs;