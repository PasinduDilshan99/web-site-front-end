import React, { useState, useEffect } from "react";
import PackageCard from "./PackageCard";
import { ActivePackagesType } from "@/types/packages-types";

interface PackageGridProps {
  packages: ActivePackagesType[];
  displayCount: number;
  showViewDetails?: boolean;
}

const PackageGrid: React.FC<PackageGridProps> = ({ 
  packages, 
  displayCount,
  showViewDetails = false 
}) => {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({});
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Initialize image indexes
  useEffect(() => {
    const initialIndexes: { [key: number]: number } = {};
    packages.forEach((pkg) => {
      initialIndexes[pkg.packageId] = 0;
    });
    setCurrentImageIndexes(initialIndexes);
  }, [packages]);

  // Auto-rotate images for each package
  useEffect(() => {
    if (packages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };

        packages.forEach((pkg) => {
          if (pkg.images && pkg.images.length > 1) {
            newIndexes[pkg.packageId] =
              (prevIndexes[pkg.packageId] + 1) % pkg.images.length;
          }
        });

        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [packages]);

  const displayedPackages = packages.slice(0, displayCount);

  const handleImageIndexChange = (packageId: number, newIndex: number) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [packageId]: newIndex,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {displayedPackages.map((pkg) => (
        <PackageCard
          key={pkg.packageId}
          package={pkg}
          currentImageIndex={currentImageIndexes[pkg.packageId] || 0}
          isHovered={hoveredCard === pkg.packageId}
          onHoverChange={setHoveredCard}
          onImageIndexChange={handleImageIndexChange}
          showViewDetails={showViewDetails}
        />
      ))}
    </div>
  );
};

export default PackageGrid;