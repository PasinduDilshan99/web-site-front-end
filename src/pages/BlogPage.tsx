// app/blog/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Blog, BlogFilters, PaginationState } from "@/types/blog-types";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";
import BlogHeroSection from "@/components/blog-components/BlogHeroSection";
import BlogFilter from "@/components/blog-components/BlogFilter";
import BlogCard from "@/components/blog-components/BlogCard";
import LinkBar from "@/components/common-components/linkBar/LinkBar";

// Blog categories (you can fetch these from API or hardcode based on your needs)
const BLOG_CATEGORIES = [
  "Travel Tips",
  "Destination Guides",
  "Adventure",
  "Culture & Heritage",
  "Food & Dining",
  "Beach & Relaxation",
  "City Life",
  "Budget Travel",
  "Luxury Travel",
  "Family Travel",
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [filters, setFilters] = useState<BlogFilters>({
    search: "",
    writer: "",
    category: "",
    dateRange: ["", ""],
    sortBy: "recent",
  });

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 9, // Default for blog display
  });

  // Items per page options
  const itemsPerPageOptions = [6, 9, 12, 18, 24];

  // Extract unique writers from blogs
  const writers = [...new Set(blogs.map((blog) => blog.writer_name))];

  // Calculate derived data for blogs
  const enhanceBlogData = (blog: Blog): Blog => {
    const commentCount = blog.comments ? blog.comments.length : 0;
    const totalReactions = blog.blog_reactions.reduce((total, reaction) => total + reaction.count, 0);
    
    return {
      ...blog,
      commentCount,
      totalReactions,
    };
  };

  useEffect(() => {
    fetchBlogs();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, blogs]);

  useEffect(() => {
    // Reset to first page when filters change
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [filters]);

  const handleResize = () => {
    const width = window.innerWidth;
    let itemsPerPage = 9; // default

    if (width < 640) {
      itemsPerPage = 6;
    } else if (width < 768) {
      itemsPerPage = 6;
    } else if (width < 1024) {
      itemsPerPage = 9;
    } else if (width < 1280) {
      itemsPerPage = 12;
    } else {
      itemsPerPage = 18;
    }

    setPagination((prev) => ({
      ...prev,
      itemsPerPage,
    }));
  };

  const fetchBlogs = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:8080/felicita/v0/api/blog/active",
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.code === 200 && result.data) {
        const enhancedBlogs = result.data.map(enhanceBlogData);
        setBlogs(enhancedBlogs);
        setFilteredBlogs(enhancedBlogs);
      } else {
        throw new Error(result.message || "Failed to fetch blogs");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (): void => {
    let filtered = [...blogs];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.subtitle.toLowerCase().includes(searchLower) ||
          blog.description.toLowerCase().includes(searchLower) ||
          blog.writer_name.toLowerCase().includes(searchLower)
      );
    }

    // Writer filter
    if (filters.writer) {
      filtered = filtered.filter((blog) => blog.writer_name === filters.writer);
    }

    // Category filter (based on content analysis)
    if (filters.category) {
      filtered = filtered.filter((blog) => {
        const title = blog.title.toLowerCase();
        const description = blog.description.toLowerCase();
        
        switch (filters.category) {
          case "Food & Dining":
            return title.includes('food') || description.includes('food') || description.includes('cuisine');
          case "Adventure":
            return title.includes('adventure') || description.includes('adventure') || description.includes('hiking');
          case "Culture & Heritage":
            return title.includes('culture') || description.includes('culture') || description.includes('heritage');
          case "Beach & Relaxation":
            return title.includes('beach') || description.includes('beach') || description.includes('sea');
          case "City Life":
            return title.includes('city') || description.includes('city') || description.includes('urban');
          case "Travel Tips":
            return title.includes('tips') || description.includes('tips') || description.includes('guide');
          default:
            return true;
        }
      });
    }

    // Date range filter
    if (filters.dateRange[0] || filters.dateRange[1]) {
      filtered = filtered.filter((blog) => {
        const blogDate = new Date(blog.blog_created_at);
        const startDate = filters.dateRange[0] ? new Date(filters.dateRange[0]) : null;
        const endDate = filters.dateRange[1] ? new Date(filters.dateRange[1]) : null;

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
        case 'recent':
          return new Date(b.blog_created_at).getTime() - new Date(a.blog_created_at).getTime();
        case 'likes':
          return (b.totalReactions || 0) - (a.totalReactions || 0);
        case 'comments':
          return (b.commentCount || 0) - (a.commentCount || 0);
        case 'date-asc':
          return new Date(a.blog_created_at).getTime() - new Date(b.blog_created_at).getTime();
        case 'date-desc':
          return new Date(b.blog_created_at).getTime() - new Date(a.blog_created_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredBlogs(filtered);
  };

  const handleFilterChange = (filterName: keyof BlogFilters, value: any): void => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const resetFilters = (): void => {
    setFilters({
      search: "",
      writer: "",
      category: "",
      dateRange: ["", ""],
      sortBy: "recent",
    });
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchBlogs();
  };

  // Pagination functions
  const handlePageChange = (page: number): void => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (items: number): void => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: items,
      currentPage: 1,
    }));
  };

  // Calculate paginated blogs
  const getPaginatedBlogs = (): Blog[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredBlogs.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / pagination.itemsPerPage);

  const handleBlogClick = (blogId: number) => {
    // Navigate to blog detail page
    window.location.href = `/blog/${blogId}`;
  };

  if (loading) {
    return (
      <Loading message="Loading travel stories..." variant="spinner" size="md" />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Blogs"
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
    <>
      <div>
        <LinkBar />
      </div>
      <div>
        <NavBar />
      </div>
      <div>
        <BlogHeroSection />
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Travel Stories & Insights
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover authentic travel experiences, expert tips, and inspiring stories 
            from our community of travel writers and explorers.
          </p>
        </div>

        {/* Filters Section */}
        <BlogFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
          writers={writers}
          categories={BLOG_CATEGORIES}
        />

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {filteredBlogs.length} Blog{filteredBlogs.length !== 1 ? "s" : ""} Found
            </h3>

            {/* Items per page selector */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="itemsPerPage"
                className="text-sm font-medium text-gray-700 whitespace-nowrap"
              >
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={pagination.itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
      
      <div>
        <Footer />
      </div>
    </>
  );
};

// Pagination Controls Component
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
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = 4;
    }

    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} blogs
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`px-3 py-2 rounded-md text-sm font-medium min-w-[40px] ${
              page === currentPage
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : page === "..."
                ? "cursor-default"
                : "border border-gray-300 hover:bg-gray-50 transition-colors"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Next
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
    <div className="text-gray-500 text-lg mb-4">
      No blogs found matching your filters.
    </div>
    <button
      onClick={onResetFilters}
      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
    >
      Reset Filters
    </button>
  </div>
);

export default BlogPage;