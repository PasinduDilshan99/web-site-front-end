// app/blog/[id]/components/BlogImages.tsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { BlogImage } from "@/types/blog-types";

interface BlogImagesProps {
  images: BlogImage[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectImage: (index: number) => void;
  title: string;
}

const BlogImages: React.FC<BlogImagesProps> = ({
  images,
  currentIndex,
  onNext,
  onPrev,
  onSelectImage,
  title,
}) => {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const getImageUrl = (image: BlogImage) => {
    if (!image?.image_url) {
      return "";
    }

    if (image.image_url.startsWith("http")) {
      return image.image_url;
    }

    return `http://localhost:8080${image.image_url}`;
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  if (images.length === 0) {
    return (
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div className="aspect-video relative bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <User className="w-16 h-16 mx-auto mb-4 text-sky-300" />
            <p className="text-xl">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];
  const hasCurrentImage =
    !failedImages.has(currentIndex) && currentImage?.image_url;

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden">
      <div className="aspect-video relative">
        {hasCurrentImage ? (
          <img
            src={getImageUrl(currentImage)}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={() => handleImageError(currentIndex)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <User className="w-16 h-16 mx-auto mb-4 text-sky-300" />
              <p className="text-xl">Image unavailable</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all group"
            >
              <ChevronLeft className="w-6 h-6 text-sky-600 group-hover:text-teal-600" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all group"
            >
              <ChevronRight className="w-6 h-6 text-sky-600 group-hover:text-teal-600" />
            </button>
          </>
        )}
      </div>

      {/* Image Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 p-4 bg-gradient-to-br from-slate-50 via-white to-teal-50">
          {images.map((image, index) => {
            const hasThumbnail = !failedImages.has(index) && image?.image_url;

            return (
              <button
                key={image.id}
                onClick={() => onSelectImage(index)}
                className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-sky-500 ring-2 ring-sky-200"
                    : "border-transparent hover:border-teal-400"
                }`}
              >
                {hasThumbnail ? (
                  <img
                    src={getImageUrl(image)}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-900 to-teal-900 flex items-center justify-center">
                    <User className="w-5 h-5 text-white/70" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogImages;
