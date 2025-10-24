"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ActivityData, Review } from "@/types/activities-types";
import LoadingState from "@/components/activities-components/LoadingState";
import ErrorState from "@/components/activities-components/ErrorState";
import ActivityHeader from "@/components/activities-components/ActivityHeader";
import ActivityImages from "@/components/activities-components/ActivityImages";
import ActivityDetails from "@/components/activities-components/ActivityDetails";
import ActivityKeyInfo from "@/components/activities-components/ActivityKeyInfo";
import ActivitySeasons from "@/components/activities-components/ActivitySeasons";
import ActivityRequirements from "@/components/activities-components/ActivityRequirements";
import ActivitySchedules from "@/components/activities-components/ActivitySchedules";
import ReviewsSection from "@/components/activities-components/ReviewsSection";
import ActivityHistorySection, {
  ActivityHistory,
  ActivityHistoryImage,
} from "@/components/activities-components/ActivityHistorySection";
import ActivityHistoryGallery from "@/components/activities-components/ActivityHistoryGallery";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/app/components/footer/Footer";

const ActivityDetailsPage = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [histories, setHistories] = useState<ActivityHistory[]>([]);
  const [historyImages, setHistoryImages] = useState<ActivityHistoryImage[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyImagesLoading, setHistoryImagesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8080/felicita/api/v0/activities/${activityId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch activity: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.code === 200 && data.data) {
          setActivity(data.data);
          fetchActivityReviews(data.data.id);
          fetchActivityHistory(data.data.id);
          fetchActivityHistoryImages(data.data.id);
        } else {
          throw new Error(data.message || "Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching activity details"
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchActivityReviews = async (activityId: number) => {
      try {
        setReviewsLoading(true);
        setReviewsError(null);

        const response = await fetch(
          `http://localhost:8080/felicita/api/v0/activities/reviews/${activityId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }

        const data = await response.json();

        if (data.code === 200 && data.data) {
          setReviews(data.data);
        } else {
          throw new Error(data.message || "Failed to load reviews");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviewsError(
          err instanceof Error ? err.message : "Failed to load reviews"
        );
      } finally {
        setReviewsLoading(false);
      }
    };

    const fetchActivityHistory = async (activityId: number) => {
      try {
        setHistoryLoading(true);
        setHistoryError(null);

        const response = await fetch(
          `http://localhost:8080/felicita/api/v0/activities/history/${activityId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch activity history: ${response.status}`
          );
        }

        const data = await response.json();

        if (data.code === 200 && data.data) {
          setHistories(data.data);
        } else {
          throw new Error(data.message || "Failed to load activity history");
        }
      } catch (err) {
        console.error("Error fetching activity history:", err);
        setHistoryError(
          err instanceof Error ? err.message : "Failed to load activity history"
        );
      } finally {
        setHistoryLoading(false);
      }
    };

    const fetchActivityHistoryImages = async (activityId: number) => {
      try {
        setHistoryImagesLoading(true);
        setHistoryImagesError(null);

        const response = await fetch(
          `http://localhost:8080/felicita/api/v0/activities/history-images/${activityId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch activity images: ${response.status}`
          );
        }

        const data = await response.json();

        if (data.code === 200 && data.data) {
          setHistoryImages(data.data);
        } else {
          throw new Error(data.message || "Failed to load activity images");
        }
      } catch (err) {
        console.error("Error fetching activity images:", err);
        setHistoryImagesError(
          err instanceof Error ? err.message : "Failed to load activity images"
        );
      } finally {
        setHistoryImagesLoading(false);
      }
    };

    if (activityId) {
      fetchActivity();
    } else {
      setError("No activity ID provided");
      setLoading(false);
    }
  }, [activityId]);

  // Retry functions
  const fetchActivityHistory = () => {
    if (activity) {
      fetchActivityHistoryRetry(activity.id);
    }
  };

  const fetchActivityHistoryImages = () => {
    if (activity) {
      fetchActivityHistoryImagesRetry(activity.id);
    }
  };

  const fetchActivityHistoryRetry = async (activityId: number) => {
    try {
      setHistoryLoading(true);
      setHistoryError(null);

      const response = await fetch(
        `http://localhost:8080/felicita/api/v0/activities/history/${activityId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch activity history: ${response.status}`);
      }

      const data = await response.json();

      if (data.code === 200 && data.data) {
        setHistories(data.data);
      } else {
        throw new Error(data.message || "Failed to load activity history");
      }
    } catch (err) {
      console.error("Error fetching activity history:", err);
      setHistoryError(
        err instanceof Error ? err.message : "Failed to load activity history"
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchActivityHistoryImagesRetry = async (activityId: number) => {
    try {
      setHistoryImagesLoading(true);
      setHistoryImagesError(null);

      const response = await fetch(
        `http://localhost:8080/felicita/api/v0/activities/history-images/${activityId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch activity images: ${response.status}`);
      }

      const data = await response.json();

      if (data.code === 200 && data.data) {
        setHistoryImages(data.data);
      } else {
        throw new Error(data.message || "Failed to load activity images");
      }
    } catch (err) {
      console.error("Error fetching activity images:", err);
      setHistoryImagesError(
        err instanceof Error ? err.message : "Failed to load activity images"
      );
    } finally {
      setHistoryImagesLoading(false);
    }
  };

  if (loading) {
    return <LoadingState activityId={activityId as string} />;
  }

  if (error) {
    return <ErrorState error={error} activityId={activityId as string} />;
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">❓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Activity Not Found
          </h1>
          <p className="text-gray-600">
            The activity you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50">
        <ActivityHeader activity={activity} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActivityImages
              images={activity.images}
              activityName={activity.name}
            />

            <div className="space-y-6">
              <ActivityDetails activity={activity} />
              <ActivityKeyInfo activity={activity} />
              <ActivitySeasons season={activity.season} />
              <ActivityRequirements requirements={activity.requirements} />
              <ActivitySchedules schedules={activity.schedules} />
            </div>
          </div>
        </div>

        {/* Activity History Section */}
        <div className="container mx-auto px-4 py-8">
          <ActivityHistorySection
            histories={histories}
            loading={historyLoading}
            error={historyError}
            onRetry={fetchActivityHistory}
          />
        </div>

        {/* Activity History Gallery */}
        <div className="container mx-auto px-4">
          <ActivityHistoryGallery
            imagesData={historyImages}
            loading={historyImagesLoading}
            error={historyImagesError}
            onRetry={fetchActivityHistoryImages}
          />
        </div>

        {/* Reviews Section */}
        <div className="container mx-auto px-4 py-8">
          <ReviewsSection
            reviews={reviews}
            loading={reviewsLoading}
            error={reviewsError}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ActivityDetailsPage;
