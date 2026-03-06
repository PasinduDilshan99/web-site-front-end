// app/blog/create/page.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  X,
  Edit2,
  FileText,
  Type,
  Globe,
  Eye,
  Save,
  AlertCircle,
  CheckCircle,
  Loader2,
  Calendar,
  Tag,
  Hash,
  Plus,
  Trash2,
  User as UserIcon,
  Mail,
  Shield,
} from "lucide-react";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/components/common-components/footer/Footer";
import LinkBar from "@/components/common-components/linkBar/LinkBar";
import Loading from "@/components/common-components/loading/Loading";
import { useAuth } from "@/context/AuthContext";
import { BlogService } from "@/services/blogService";
import { BLOG_CREATE_PRIVILEGE } from "@/utils/privileges";

interface BlogFormData {
  title: string;
  subtitle: string;
  description: string;
  imageUrls: string[];
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
  };
  timestamp: string;
}

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  isUploading?: boolean;
  uploadedUrl?: string;
}

const CreateBlogPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    subtitle: "",
    description: "",
    imageUrls: [],
  });

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090",
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
  ]);

  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([]);

  // Character counters
  const [charCount, setCharCount] = useState({
    title: 0,
    subtitle: 0,
    description: 0,
  });

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update character count
    if (name in charCount) {
      setCharCount((prev) => ({ ...prev, [name]: value.length }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle image file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImageFiles: ImageFile[] = [];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        setError(
          `Invalid file type: ${file.name}. Please upload JPEG, PNG, WebP, or GIF images.`,
        );
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}. Maximum size is 5MB.`);
        return;
      }

      const id = Math.random().toString(36).substr(2, 9);
      newImageFiles.push({
        id,
        file,
        preview: URL.createObjectURL(file),
        isUploading: false,
      });
    });

    setImageFiles((prev) => [...prev, ...newImageFiles]);
    e.target.value = ""; // Reset file input
  };

  // Remove image file
  const removeImageFile = (id: string) => {
    setImageFiles((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      // Revoke object URL to prevent memory leaks
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return updated;
    });
  };

  // Toggle image URL selection
  const toggleImageUrl = (url: string) => {
    setSelectedImageUrls((prev) => {
      if (prev.includes(url)) {
        return prev.filter((u) => u !== url);
      } else {
        return [...prev, url];
      }
    });
  };

  // Remove selected image URL
  const removeSelectedImageUrl = (url: string) => {
    setSelectedImageUrls((prev) => prev.filter((u) => u !== url));
  };

  // Add custom image URL
  const [customImageUrl, setCustomImageUrl] = useState("");
  const handleAddCustomImageUrl = () => {
    if (customImageUrl.trim() && isValidUrl(customImageUrl)) {
      setImageUrls((prev) => [...prev, customImageUrl.trim()]);
      setCustomImageUrl("");
    }
  };

  // Validate URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Simulate image upload
  const simulateImageUpload = async (imageFile: ImageFile): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, you would upload to your server
        // For now, we'll use a placeholder URL
        const mockUrl = `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2)}`;
        resolve(mockUrl);
      }, 1500);
    });
  };

  // Upload all images
  const uploadImages = async () => {
    const uploadedUrls: string[] = [...selectedImageUrls];

    for (const imageFile of imageFiles) {
      try {
        // Mark as uploading
        setImageFiles((prev) =>
          prev.map((img) =>
            img.id === imageFile.id ? { ...img, isUploading: true } : img,
          ),
        );

        // Simulate upload
        const url = await simulateImageUpload(imageFile);

        // Update with uploaded URL
        setImageFiles((prev) =>
          prev.map((img) =>
            img.id === imageFile.id
              ? { ...img, isUploading: false, uploadedUrl: url }
              : img,
          ),
        );

        uploadedUrls.push(url);
      } catch (error) {
        console.error("Error uploading image:", error);
        setImageFiles((prev) =>
          prev.map((img) =>
            img.id === imageFile.id ? { ...img, isUploading: false } : img,
          ),
        );
      }
    }

    return uploadedUrls;
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = "Subtitle is required";
    } else if (formData.subtitle.length > 200) {
      newErrors.subtitle = "Subtitle must be less than 200 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    } else if (formData.description.length > 5000) {
      newErrors.description = "Description must be less than 5000 characters";
    }

    const totalImages = imageFiles.length + selectedImageUrls.length;
    if (totalImages === 0) {
      newErrors.images = "Please select at least one image";
    } else if (totalImages > 10) {
      newErrors.images = "Maximum 10 images allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      // Upload images and get URLs
      const uploadedImageUrls = await uploadImages();

      // Prepare data for API
      const requestData = {
        title: formData.title.trim(),
        subTitle: formData.subtitle.trim(),
        description: formData.description.trim(),
        imageUrls: uploadedImageUrls,
      };

      console.log("Submitting blog:", requestData);

      // Call API
      const result = await BlogService.createBlog(requestData);

      if (result.success) {
        setSuccess(result.message || "Blog created successfully!");

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            title: "",
            subtitle: "",
            description: "",
            imageUrls: [],
          });
          setImageFiles([]);
          setSelectedImageUrls([]);
          setCharCount({ title: 0, subtitle: 0, description: 0 });
          setSuccess(null);

          // Optionally redirect to blogs page or created blog
          // router.push("/blog");
        }, 3000);
      } else {
        throw new Error(result.error || "Failed to create blog");
      }
    } catch (err) {
      console.error("Error creating blog:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the blog",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Preview content
  const getPreviewContent = () => {
    const authorName = user
      ? `${user.firstName} ${user.lastName}`.trim() || user.username
      : "You";

    return {
      ...formData,
      imageUrls: [
        ...selectedImageUrls,
        ...imageFiles.map((img) => img.preview),
      ],
      createdAt: new Date().toISOString(),
      author: authorName,
      authorRole: user?.roles?.[0] || "User",
    };
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      imageFiles.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [imageFiles]);

  useEffect(() => {
    const code = sessionStorage.getItem("uniqueCode");
    if (!code) {
      router.push("/login");
    } else if (
      user &&
      !user.privileges.includes(BLOG_CREATE_PRIVILEGE)
    ) {
      router.back();
    }
  }, [user, router]);

  const previewContent = getPreviewContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => router.push("/blogs")}
              className="flex items-center gap-2 text-teal-700 hover:text-blue-600 font-medium transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blogs
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-teal-800">
              Create New Blog Post
            </h1>
            <p className="text-gray-600 mt-2">
              Share your travel experiences and stories with the world
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                previewMode
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-teal-50 text-teal-700 border border-teal-300 hover:bg-teal-100"
              }`}
            >
              {previewMode ? (
                <>
                  <Edit2 className="w-4 h-4" />
                  Edit Mode
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Preview
                </>
              )}
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Publish Blog
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl flex items-start gap-3 animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800">{success}</p>
              <p className="text-sm text-green-600 mt-1">
                Your blog is being published. Redirecting in a few seconds...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-800">{error}</p>
              <p className="text-sm text-red-600 mt-1">
                Please check your inputs and try again.
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          {!previewMode ? (
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Author Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-800">
                        Author Information
                      </h3>
                      <p className="text-sm text-gray-600">
                        This blog will be published under your account
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-teal-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <UserIcon className="w-4 h-4 text-teal-600" />
                        <span className="text-sm font-medium text-teal-700">
                          Author
                        </span>
                      </div>
                      <p className="font-semibold text-teal-800">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">@{user?.username}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">
                          Role
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {user?.roles?.map((role, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white text-blue-700 rounded-full text-xs font-medium border border-blue-200"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Type className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-800">
                        Blog Title
                      </h3>
                      <p className="text-sm text-gray-600">
                        A catchy title that grabs attention
                      </p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your blog title here..."
                    className={`w-full px-4 py-3 text-lg font-medium border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                      errors.title
                        ? "border-red-300 bg-red-50"
                        : "border-teal-200 focus:border-blue-400"
                    }`}
                    maxLength={100}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-red-600">{errors.title}</div>
                    <div className="text-sm text-gray-500">
                      {charCount.title}/100 characters
                    </div>
                  </div>
                </div>

                {/* Subtitle */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Hash className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-800">
                        Subtitle
                      </h3>
                      <p className="text-sm text-gray-600">
                        A brief summary or tagline for your blog
                      </p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="Enter a compelling subtitle..."
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                      errors.subtitle
                        ? "border-red-300 bg-red-50"
                        : "border-teal-200 focus:border-blue-400"
                    }`}
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-red-600">
                      {errors.subtitle}
                    </div>
                    <div className="text-sm text-gray-500">
                      {charCount.subtitle}/200 characters
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-800">
                        Blog Content
                      </h3>
                      <p className="text-sm text-gray-600">
                        Share your story, experiences, and insights
                      </p>
                    </div>
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here... You can use markdown or HTML formatting."
                    className={`w-full h-64 px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition-all ${
                      errors.description
                        ? "border-red-300 bg-red-50"
                        : "border-teal-200 focus:border-blue-400"
                    }`}
                    maxLength={5000}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-red-600">
                      {errors.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      {charCount.description}/5000 characters
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-800">
                        Blog Images
                      </h3>
                      <p className="text-sm text-gray-600">
                        Add images to make your blog visually appealing
                      </p>
                    </div>
                  </div>

                  {errors.images && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{errors.images}</p>
                    </div>
                  )}

                  {/* Image Upload Area */}
                  <div className="mb-8">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-teal-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 flex items-center justify-center group-hover:from-teal-200 group-hover:to-blue-200 transition-all">
                        <Upload className="w-8 h-8 text-teal-600" />
                      </div>
                      <h4 className="font-medium text-teal-800 mb-2">
                        Upload Images
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Click to browse or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports JPG, PNG, WebP, GIF • Max 5MB per image
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>

                  {/* Selected Image Files */}
                  {imageFiles.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-medium text-teal-800 mb-4">
                        Uploaded Images ({imageFiles.length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imageFiles.map((image) => (
                          <div
                            key={image.id}
                            className="relative group rounded-xl overflow-hidden border border-teal-200"
                          >
                            <div className="aspect-square bg-gray-100">
                              <img
                                src={image.preview}
                                alt="Uploaded preview"
                                className="w-full h-full object-cover"
                              />
                              {image.isUploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImageFile(image.id)}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            {image.isUploading && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-blue-600 h-1">
                                <div className="h-full bg-white animate-pulse"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sample Image URLs */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-teal-800">
                        Select from Sample Images
                      </h4>
                      <span className="text-sm text-gray-500">
                        {selectedImageUrls.length} selected
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imageUrls.map((url, index) => (
                        <div
                          key={index}
                          onClick={() => toggleImageUrl(url)}
                          className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                            selectedImageUrls.includes(url)
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-200 hover:border-teal-300"
                          }`}
                        >
                          <div className="aspect-square bg-gray-100 relative">
                            <img
                              src={url}
                              alt={`Sample ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80";
                              }}
                            />
                            {selectedImageUrls.includes(url) && (
                              <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-blue-600" />
                              </div>
                            )}
                          </div>
                          <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                              {selectedImageUrls.includes(url) ? (
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              ) : (
                                <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Image URLs */}
                  {selectedImageUrls.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-teal-800 mb-4">
                        Selected Images
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedImageUrls.map((url, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-2 bg-teal-50 rounded-lg border border-teal-200"
                          >
                            <Globe className="w-4 h-4 text-teal-600" />
                            <span className="text-sm text-teal-700 truncate max-w-[200px]">
                              {url.split("/").pop() || `Image ${index + 1}`}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeSelectedImageUrl(url)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Custom Image URL */}
                  <div className="mt-6">
                    <h4 className="font-medium text-teal-800 mb-3">
                      Add Custom Image URL
                    </h4>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 px-4 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustomImageUrl();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomImageUrl}
                        disabled={
                          !customImageUrl.trim() || !isValidUrl(customImageUrl)
                        }
                        className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Preview Section */
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-teal-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-800">
                      Blog Preview
                    </h3>
                    <p className="text-sm text-gray-600">
                      How your blog will appear to readers
                    </p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {/* Preview Header */}
                  <div className="mb-8 pb-6 border-b border-teal-100">
                    <h1 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
                      {previewContent.title || "Your Blog Title"}
                    </h1>
                    {previewContent.subtitle && (
                      <h2 className="text-xl md:text-2xl text-blue-600 mb-6">
                        {previewContent.subtitle}
                      </h2>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-teal-800">
                            {previewContent.author}
                          </p>
                          <p className="text-xs text-gray-500">
                            {previewContent.authorRole}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Preview Images */}
                  {previewContent.imageUrls.length > 0 && (
                    <div className="mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {previewContent.imageUrls
                          .slice(0, 2)
                          .map((url, index) => (
                            <div
                              key={index}
                              className="rounded-xl overflow-hidden"
                            >
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        {previewContent.imageUrls.length} images total
                      </p>
                    </div>
                  )}

                  {/* Preview Content */}
                  <div className="text-gray-700 leading-relaxed">
                    {previewContent.description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: previewContent.description.replace(
                            /\n/g,
                            "<br />",
                          ),
                        }}
                      />
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Your blog content will appear here</p>
                      </div>
                    )}
                  </div>

                  {/* Preview Footer */}
                  <div className="mt-8 pt-6 border-t border-teal-100">
                    <div className="flex flex-wrap gap-2">
                      <Tag className="w-5 h-5 text-teal-600" />
                      <span className="text-sm font-medium text-teal-700">
                        Tags:
                      </span>
                      {["Travel", "Blog", "Personal"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* User Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-teal-200 top-24">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">
                Your Profile
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-800">
                      {user?.firstName} {user?.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">@{user?.username}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-teal-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  {user?.mobileNumber1 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>{user.mobileNumber1}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-teal-100">
                  <div className="flex flex-wrap gap-1">
                    {user?.roles?.map((role, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 rounded-full text-xs font-medium border border-teal-200"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Publishing Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-teal-200">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">
                Publishing Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Draft
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Author</span>
                  <span className="font-medium text-teal-800">
                    {user?.username}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Publish Date</span>
                  <span className="font-medium text-teal-800">Now</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Images</span>
                  <span className="font-medium text-teal-800">
                    {selectedImageUrls.length + imageFiles.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-teal-200">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">
                Content Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-teal-700">
                    {charCount.description}
                  </div>
                  <div className="text-sm text-gray-600">Characters</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    {Math.ceil(charCount.description / 200)}
                  </div>
                  <div className="text-sm text-gray-600">Min Read</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-200">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Publish Blog
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      title: "",
                      subtitle: "",
                      description: "",
                      imageUrls: [],
                    });
                    setImageFiles([]);
                    setSelectedImageUrls([]);
                    setCharCount({ title: 0, subtitle: 0, description: 0 });
                    setErrors({});
                    setError(null);
                    setSuccess(null);
                  }}
                  className="w-full py-3 bg-white border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Form
                </button>
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="w-full py-3 bg-white border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  {previewMode ? (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Back to Editing
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Preview Blog
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPage;
