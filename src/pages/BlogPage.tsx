"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BlogDetailsData,
  BlogFilters,
  PaginationState,
  BlogComment,
  BlogCommentReply,
  BlogReaction,
  EnhancedBlogData,
} from "@/types/blog-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import BlogHeroSection from "@/components/blog-components/BlogHeroSection";
// Import BlogFilter from its own file instead of including it here
import BlogFilter from "@/components/blog-components/BlogFilter";
import BlogCard from "@/components/blog-components/BlogCard";
import { BlogService } from "@/services/blogService";
import BlogPageLoading from "@/components/blog-components/BlogPageLoading";

// Utility functions for URL params management
const filtersToUrlParams = (
  filters: BlogFilters,
  page: number,
  itemsPerPage: number
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.writer) params.set("writer", filters.writer);
  if (filters.category) params.set("category", filters.category);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  
  // Date range
  if (filters.dateRange[0]) params.set("startDate", filters.dateRange[0]);
  if (filters.dateRange[1]) params.set("endDate", filters.dateRange[1]);

  // Pagination
  params.set("page", page.toString());
  params.set("itemsPerPage", itemsPerPage.toString());

  return params;
};

const urlParamsToFilters = (params: URLSearchParams): BlogFilters => {
  return {
    search: params.get("search") || "",
    writer: params.get("writer") || "",
    category: params.get("category") || "",
    sortBy: (params.get("sortBy") as BlogFilters["sortBy"]) || "recent",
    dateRange: [
      params.get("startDate") || "",
      params.get("endDate") || "",
    ] as [string, string],
  };
};

const urlParamsToPagination = (
  params: URLSearchParams
): { page: number; itemsPerPage: number } => {
  return {
    page: Number(params.get("page")) || 1,
    itemsPerPage: Number(params.get("itemsPerPage")) || 9,
  };
};

// Main component wrapped with Suspense for useSearchParams
const BlogPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [blogs, setBlogs] = useState<EnhancedBlogData[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<EnhancedBlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<BlogFilters>(() =>
    urlParamsToFilters(new URLSearchParams(searchParams?.toString()))
  );

  // Pagination state from URL params
  const [pagination, setPagination] = useState<PaginationState>(() => {
    const { page, itemsPerPage } = urlParamsToPagination(
      new URLSearchParams(searchParams?.toString())
    );
    return {
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  });

  // Items per page options
  const itemsPerPageOptions = [3, 6, 9, 12, 18, 24];

  // Extract unique writers from blogs
  const writers = [...new Set(blogs.map((blog) => blog.writer_name))];

  // Helper function to count total comments including replies
  const countTotalComments = (comments: BlogComment[] | null): number => {
    if (!comments || !Array.isArray(comments)) return 0;

    let total = comments.length;

    const countReplies = (replies: BlogCommentReply[]): number => {
      if (!replies || !Array.isArray(replies)) return 0;

      let replyCount = replies.length;
      replies.forEach((reply) => {
        if (reply.replies && Array.isArray(reply.replies)) {
          replyCount += countReplies(reply.replies);
        }
      });
      return replyCount;
    };

    comments.forEach((comment) => {
      if (comment.replies && Array.isArray(comment.replies)) {
        total += countReplies(comment.replies);
      }
    });

    return total;
  };

  // Helper function to calculate total reactions
  const calculateTotalReactions = (
    blogReactions: BlogReaction[] | null,
  ): number => {
    if (!blogReactions || !Array.isArray(blogReactions)) return 0;

    return blogReactions.reduce(
      (total, reaction) => total + (reaction.count || 0),
      0,
    );
  };

  // Enhance blog data with calculated properties
  const enhanceBlogData = (blog: BlogDetailsData): EnhancedBlogData => {
    const totalReactions =
      blog.likeCount || calculateTotalReactions(blog.blog_reactions);

    const commentCount = countTotalComments(blog.comments);

    return {
      ...blog,
      blogCategory: blog.blogCategory || "Uncategorized",
      totalReactions,
      commentCount,
    };
  };

  // Update URL when filters or pagination change
  const updateUrlParams = useCallback(
    (newFilters: BlogFilters, page: number, itemsPerPage: number) => {
      const params = filtersToUrlParams(newFilters, page, itemsPerPage);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  // Fetch blogs using the service
  const fetchBlogs = async (writer?: string, search?: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      let result;

      if (writer) {
        result = await BlogService.fetchBlogsByWriter(writer);
      } else if (search) {
        result = await BlogService.fetchBlogsByTag(search);
      } else {
        result = await BlogService.fetchActiveBlogs();
      }

      if (result.error) {
        throw new Error(result.error);
      }

      // Enhance the data with calculated properties
      const enhancedBlogs = result.data.map(enhanceBlogData);

      // Extract unique categories from blogs
      const uniqueCategories = [
        ...new Set(
          result.data
            .map((blog: BlogDetailsData) => blog.blogCategory)
            .filter(
              (category: string | null) => category && category.trim() !== "",
            ),
        ),
      ] as string[];

      setBlogs(enhancedBlogs);
      setCategories(uniqueCategories.sort());
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch - runs only once on mount
  useEffect(() => {
    const writer = searchParams?.get("writer");
    const search = searchParams?.get("search");
    fetchBlogs(writer || undefined, search || undefined);
  }, []); // Empty dependency array - runs only once on mount

  // Apply filters to blogs
  const applyFilters = useCallback((): void => {
    let filtered = [...blogs];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.subtitle.toLowerCase().includes(searchLower) ||
          blog.description.toLowerCase().includes(searchLower) ||
          blog.writer_name.toLowerCase().includes(searchLower) ||
          (blog.blogCategory &&
            blog.blogCategory.toLowerCase().includes(searchLower)),
      );
    }

    // Writer filter
    if (filters.writer) {
      filtered = filtered.filter((blog) => blog.writer_name === filters.writer);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (blog) => blog.blogCategory === filters.category,
      );
    }

    // Date range filter
    if (filters.dateRange[0] || filters.dateRange[1]) {
      filtered = filtered.filter((blog) => {
        const blogDate = new Date(blog.blog_created_at);
        const startDate = filters.dateRange[0]
          ? new Date(filters.dateRange[0])
          : null;
        const endDate = filters.dateRange[1]
          ? new Date(filters.dateRange[1])
          : null;

        if (startDate && endDate) {
          return blogDate >= startDate && blogDate <= endDate;
        } else if (startDate) {
          return blogDate >= startDate;
        } else if (endDate) {
          return blogDate <= endDate;
        }
        return true;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "recent":
          return (
            new Date(b.blog_created_at).getTime() -
            new Date(a.blog_created_at).getTime()
          );

        case "likes":
          const aLikes = a.likeCount || a.totalReactions || 0;
          const bLikes = b.likeCount || b.totalReactions || 0;
          return bLikes - aLikes;

        case "comments":
          const aComments = a.commentCount || 0;
          const bComments = b.commentCount || 0;
          return bComments - aComments;

        case "date-asc":
          return (
            new Date(a.blog_created_at).getTime() -
            new Date(b.blog_created_at).getTime()
          );

        case "date-desc":
          return (
            new Date(b.blog_created_at).getTime() -
            new Date(a.blog_created_at).getTime()
          );

        default:
          return 0;
      }
    });

    setFilteredBlogs(filtered);
    
    // Reset to page 1 when filters change
    if (pagination.currentPage !== 1) {
      handlePageChange(1);
    }
  }, [filters, blogs]);

  // Apply filters when blogs or filters change
  useEffect(() => {
    applyFilters();
  }, [filters, blogs, applyFilters]);

  // Watch for URL params changes and update state
  useEffect(() => {
    const urlFilters = urlParamsToFilters(
      new URLSearchParams(searchParams?.toString()),
    );
    const { page, itemsPerPage } = urlParamsToPagination(
      new URLSearchParams(searchParams?.toString()),
    );

    setFilters(urlFilters);
    setPagination({
      currentPage: page,
      itemsPerPage: itemsPerPage,
    });
  }, [searchParams]);

  // Handle window resize for responsive items per page
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newItemsPerPage = 9;

      if (width < 640) {
        newItemsPerPage = 6;
      } else if (width < 768) {
        newItemsPerPage = 6;
      } else if (width < 1024) {
        newItemsPerPage = 9;
      } else if (width < 1280) {
        newItemsPerPage = 12;
      } else {
        newItemsPerPage = 18;
      }

      // Only update if different from current and no URL param
      if (newItemsPerPage !== pagination.itemsPerPage && !searchParams?.get("itemsPerPage")) {
        updateUrlParams(filters, pagination.currentPage, newItemsPerPage);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filters, pagination.currentPage, pagination.itemsPerPage, searchParams, updateUrlParams]);

  const handleFilterChange = (
    filterName: keyof BlogFilters,
    value: string | [string, string],
  ): void => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    updateUrlParams(newFilters, 1, pagination.itemsPerPage); // Reset to page 1
  };

  const resetFilters = (): void => {
    const resetFilterValues: BlogFilters = {
      search: "",
      writer: "",
      category: "",
      dateRange: ["", ""] as [string, string],
      sortBy: "recent",
    };
    setFilters(resetFilterValues);
    updateUrlParams(resetFilterValues, 1, pagination.itemsPerPage);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    const writer = searchParams?.get("writer");
    const search = searchParams?.get("search");
    fetchBlogs(writer || undefined, search || undefined);
  };

  // Pagination functions
  const handlePageChange = (page: number): void => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    updateUrlParams(filters, page, pagination.itemsPerPage);
    
    // Scroll to top of results section
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemsPerPageChange = (items: number): void => {
    updateUrlParams(filters, 1, items); // Reset to page 1
  };

  // Calculate paginated blogs
  const getPaginatedBlogs = (): EnhancedBlogData[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredBlogs.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / pagination.itemsPerPage);

  const handleBlogClick = (blogId: number) => {
    router.push(`/blogs/${blogId}`);
  };

  // Determine if we should show full filters based on URL parameters
  const hasUrlParams = searchParams?.get("writer") || searchParams?.get("search");

  if (loading) {
    return <BlogPageLoading />;
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load blogs"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
    );
  }

  const paginatedBlogs = getPaginatedBlogs();

  return (
    <div>
      <div className="mx-auto px-4 py-8 md:py-12 lg:py-16 bg-gradient-to-b from-teal-50 to-blue-50 min-h-screen">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-800 mb-4">
            {searchParams?.get("writer")
              ? `${searchParams.get("writer")}'s Blogs`
              : searchParams?.get("search")
                ? `Search Results for "${searchParams.get("search")}"`
                : "Travel Stories & Insights"}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {searchParams?.get("writer")
              ? `Discover all blogs written by ${searchParams.get("writer")}`
              : searchParams?.get("search")
                ? `Showing blogs related to "${searchParams.get("search")}"`
                : "Discover authentic travel experiences, expert tips, and inspiring stories from our community of travel writers and explorers."}
          </p>
        </div>

        {/* Filters Section */}
        <BlogFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
          writers={writers}
          categories={categories}
        />

        {/* Results Section */}
        <div id="results-section" className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-teal-800">
              {filteredBlogs.length} Blog
              {filteredBlogs.length !== 1 ? "s" : ""} Found
            </h3>

            {/* Items per page selector */}
            <div className="flex items-center gap-3 bg-teal-50 rounded-lg px-4 py-2 border border-teal-200">
              <label
                htmlFor="itemsPerPage"
                className="text-sm font-medium text-teal-700 whitespace-nowrap"
              >
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={pagination.itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="border border-teal-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-teal-700 transition-all duration-200 hover:border-teal-400"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} per page
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Blogs Grid */}
          {paginatedBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {paginatedBlogs.map((blog) => (
                  <BlogCard
                    key={blog.blog_id}
                    blog={blog}
                    onClick={handleBlogClick}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredBlogs.length}
                  itemsPerPage={pagination.itemsPerPage}
                />
              )}
            </>
          ) : (
            <NoResults onResetFilters={resetFilters} />
          )}
        </div>
      </div>
    </div>
  );
};

// Wrap with Suspense for useSearchParams
const BlogPage: React.FC = () => {
  return (
    <Suspense fallback={<BlogPageLoading />}>
      <BlogPageContent />
    </Suspense>
  );
};

export default BlogPage;

// Updated Pagination Controls Component
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-blue-200">
      <div className="text-sm text-gray-600 font-medium">
        Showing <span className="font-semibold text-teal-700">{startItem}</span>{" "}
        to <span className="font-semibold text-teal-700">{endItem}</span> of{" "}
        <span className="font-semibold text-teal-700">{totalItems}</span> blogs
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-teal-700 bg-white border-2 border-teal-300 rounded-lg hover:bg-teal-50 hover:text-teal-800 hover:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          aria-label="Previous page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-4 py-2 text-sm font-medium text-teal-700"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`min-w-[40px] px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg transform scale-105"
                    : "text-teal-700 bg-white border-2 border-teal-300 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-400 hover:shadow-md"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-teal-700 bg-white border-2 border-teal-300 rounded-lg hover:bg-teal-50 hover:text-teal-800 hover:border-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// No Results Component
const NoResults: React.FC<{ onResetFilters: () => void }> = ({
  onResetFilters,
}) => (
  <div className="text-center py-12">
    <div className="text-gray-500 text-lg mb-4 flex flex-col items-center">
      <svg
        className="w-16 h-16 text-teal-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      No blogs found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      Reset Filters
    </button>
  </div>
);

// Remove this duplicate default export
// export default FilterSection;