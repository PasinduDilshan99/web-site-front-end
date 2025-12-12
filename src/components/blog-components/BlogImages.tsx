// app/blog/[id]/components/BlogImages.tsx
import React from "react";
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
  const getImageUrl = (image: BlogImage) => {
    if (!image?.image_url) {
      return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
    }

    if (image.image_url.startsWith("http")) {
      return image.image_url;
    }

    return `http://localhost:8080${image.image_url}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
  };

  if (images.length === 0) {
    return (
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div className="aspect-video relative bg-gradient-to-r from-purple-500 to-amber-400 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <User className="w-16 h-16 mx-auto mb-4" />
            <p className="text-xl">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];
  const imageUrl = getImageUrl(currentImage);

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={imageUrl}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-purple-900" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
            >
              <ChevronRight className="w-6 h-6 text-purple-900" />
            </button>
          </>
        )}
      </div>

      {/* Image Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 p-4 bg-white">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onSelectImage(index)}
              className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-amber-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={getImageUrl(image)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogImages;