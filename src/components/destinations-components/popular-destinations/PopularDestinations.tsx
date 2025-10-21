"use client";
import { GET_POPULAR_DESTINATIONS } from "@/utils/frontEndConstant";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeader from "../../common-components/section-header/SectionHeader";
import Loading from "../../common-components/loading/Loading";
import { ErrorState } from "../../common-components/error-state/ErrorState";
import { EmptyState } from "../../common-components/empty-state/EmptyState";
import AnimatedButton from "../../common-components/buttons/AnimatedButton";
import { PopularDestinationsType } from "@/types/destinations-types";
import { sliderSettings } from "@/components/destinations-components/popular-destinations/sliderSettings";
import DestinationCard from "@/components/destinations-components/DestinationCard";

const PopularDestinations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popularDestinations, setPopularDestinations] = useState<
    PopularDestinationsType[]
  >([]);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(GET_POPULAR_DESTINATIONS);
        const data = await response.json();

        if (response.ok) {
          const items: PopularDestinationsType[] = data.data || [];
          const activePopularDestinations = items.filter(
            (item) => item.destinationStatus === "ACTIVE"
          );
          setPopularDestinations(activePopularDestinations);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch popular destinations");
        }
      } catch (err) {
        console.error("Error fetching popular destinations:", err);
        setError("Something went wrong while fetching popular destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDestinations();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <Loading
        message="Loading popular destinations..."
        variant="spinner"
        size="md"
      />
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
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

  if (popularDestinations.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <EmptyState
            title="No Content Available"
            message="We're preparing some amazing content for you. Please check back soon!"
            icon="data"
            size="md"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-100 to-orange-50">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <SectionHeader
          subtitle="Explore our destinations"
          title="Most Popular Destinations"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
          fromColor="#A855F7"
          toColor="#F59E0B"
        />
      </div>

      {/* Destinations Carousel */}
      <div className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <Slider {...sliderSettings}>
          {popularDestinations.map((destination) => (
            <div
              key={destination.destinationId}
              className="px-2 sm:px-3 focus:outline-none"
            >
              <DestinationCard destination={destination} />
            </div>
          ))}
        </Slider>
      </div>

      {/* View All Button */}
      <div className="text-center mt-6 sm:mt-8">
        <AnimatedButton onClick={() => console.log("Clicked!")}>
          Learn More About Us
        </AnimatedButton>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .slick-dots {
          bottom: -50px;
        }
        .slick-dots li button:before {
          font-size: 10px;
          color: #8b5cf6;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          color: #f59e0b;
          opacity: 1;
        }
        @media (min-width: 640px) {
          .slick-dots {
            bottom: -60px;
          }
          .slick-dots li button:before {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default PopularDestinations;
