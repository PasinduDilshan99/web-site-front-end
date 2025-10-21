import React from "react";
import PackageImageSection from "./PackageImageSection";
import PackageContent from "./PackageContent";
import { ActivePackagesType } from "@/types/packages-types";

interface PackageCardProps {
  package: ActivePackagesType;
  currentImageIndex: number;
  isHovered: boolean;
  onHoverChange: (packageId: number | null) => void;
  onImageIndexChange: (packageId: number, newIndex: number) => void;
  showViewDetails?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  currentImageIndex,
  isHovered,
  onHoverChange,
  onImageIndexChange,
  showViewDetails = false,
}) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{
        borderColor: pkg.color,
      }}
      onMouseEnter={() => onHoverChange(pkg.packageId)}
      onMouseLeave={() => onHoverChange(null)}
    >
      {/* Package Image with Slideshow */}
      <PackageImageSection
        package={pkg}
        currentImageIndex={currentImageIndex}
        onImageIndexChange={onImageIndexChange}
      />

      {/* Package Content */}
      <PackageContent package={pkg} showViewDetails={showViewDetails} />
    </div>
  );
};

export default PackageCard;
