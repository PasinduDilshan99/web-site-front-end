import React, { useState } from "react";
import Image from "next/image";
import { ActivityImage } from "@/types/activities-types";

interface ActivityImagesProps {
  images: ActivityImage[];
  activityName: string;
}

const ActivityImages: React.FC<ActivityImagesProps> = ({
  images,
  activityName,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-96 lg:h-[500px]">
          {images && images.length > 0 ? (
            <Image
              src={
                images[selectedImageIndex]?.image_url ||
                "/placeholder-image.jpg"
              }
              alt={images[selectedImageIndex]?.name || activityName}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Images */}
      {images && images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                selectedImageIndex === index
                  ? "border-amber-500"
                  : "border-gray-300"
              }`}
            >
              <Image
                src={image.image_url}
                alt={image.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityImages;
