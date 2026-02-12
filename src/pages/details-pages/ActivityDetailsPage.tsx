"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingState from "@/components/activities-components/LoadingState";
import ActivityHeader from "@/components/activities-components/ActivityHeader";
import ActivityImages from "@/components/activities-components/ActivityImages";
import ActivityDetails from "@/components/activities-components/ActivityDetails";
import ActivityKeyInfo from "@/components/activities-components/ActivityKeyInfo";
import ActivitySeasons from "@/components/activities-components/ActivitySeasons";
import ActivityRequirements from "@/components/activities-components/ActivityRequirements";
import ActivitySchedules from "@/components/activities-components/ActivitySchedules";
import ReviewsSection from "@/components/activities-components/ReviewsSection";
import ActivityHistorySection from "@/components/activities-components/ActivityHistorySection";
import ActivityHistoryGallery from "@/components/activities-components/ActivityHistoryGallery";
import {
  ActivityData,
  ActivityHistory,
  ActivityHistoryImage,
  Review,
} from "@/types/activity-types";
import { ActivityService } from "@/services/activityService";
import ActivityDetailsHeroSection from "@/components/activities-components/ActivityDetailsHeroSection";
import ActivityDetailsLoading from "@/components/activities-components/ActivityDetailsLoading";

const ActivityDetailsPage = () => {
  const params = useParams();
  const activityId = params?.activityId;
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [histories, setHistories] = useState<ActivityHistory[]>([]);
  const [historyImages, setHistoryImages] = useState<ActivityHistoryImage[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyImagesLoading, setHistoryImagesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyImagesError, setHistoryImagesError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!activityId) {
      setError("No activity ID provided");
      setLoading(false);
      return;
    }

    const fetchActivityData = async () => {
      try {
        setLoading(true);
        setError(null);

        // USING THE SERVICE INSTEAD OF DIRECT FETCH
        const { data: activityData, error: activityError } =
          await ActivityService.fetchActivityById(activityId as string);

        if (activityError) {
          setError(activityError);
          setLoading(false);
        } else if (activityData) {
          setActivity(activityData);
          setLoading(false);
          // Now fetch related data
        //   fetchActivityReviews(activityData.id);
        //   fetchActivityHistory(activityData.id);
        //   fetchActivityHistoryImages(activityData.id);
        } else {
          setError("No activity data received");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching activity details",
        );
        setLoading(false);
      }
    };

    // const fetchActivityReviews = async (activityId: number) => {
    //   try {
    //     setReviewsLoading(true);
    //     setReviewsError(null);

    //     // USING THE SERVICE INSTEAD OF DIRECT FETCH
    //     const { reviews: fetchedReviews, error: reviewsError } =
    //       await ActivityService.fetchActivityReviewsById(activityId);

    //     if (reviewsError) {
    //       setReviewsError(reviewsError);
    //     } else {
    //       setReviews(fetchedReviews);
    //     }
    //   } catch (err) {
    //     console.error("Error fetching reviews:", err);
    //     setReviewsError(
    //       err instanceof Error ? err.message : "Failed to load reviews",
    //     );
    //   } finally {
    //     setReviewsLoading(false);
    //   }
    // };

    // const fetchActivityHistory = async (activityId: number) => {
    //   try {
    //     setHistoryLoading(true);
    //     setHistoryError(null);

    //     // USING THE SERVICE INSTEAD OF DIRECT FETCH
    //     const { histories: fetchedHistories, error: historyError } =
    //       await ActivityService.fetchActivityHistoryById(activityId);

    //     if (historyError) {
    //       setHistoryError(historyError);
    //     } else {
    //       setHistories(fetchedHistories);
    //     }
    //   } catch (err) {
    //     console.error("Error fetching activity history:", err);
    //     setHistoryError(
    //       err instanceof Error
    //         ? err.message
    //         : "Failed to load activity history",
    //     );
    //   } finally {
    //     setHistoryLoading(false);
    //   }
    // };

    // const fetchActivityHistoryImages = async (activityId: number) => {
    //   try {
    //     setHistoryImagesLoading(true);
    //     setHistoryImagesError(null);

    //     // USING THE SERVICE INSTEAD OF DIRECT FETCH
    //     const { historyImages: fetchedImages, error: imagesError } =
    //       await ActivityService.fetchActivityHistoryImagesById(activityId);

    //     if (imagesError) {
    //       setHistoryImagesError(imagesError);
    //     } else {
    //       setHistoryImages(fetchedImages);
    //     }
    //   } catch (err) {
    //     console.error("Error fetching activity images:", err);
    //     setHistoryImagesError(
    //       err instanceof Error ? err.message : "Failed to load activity images",
    //     );
    //   } finally {
    //     setHistoryImagesLoading(false);
    //   }
    // };

    fetchActivityData();
  }, [activityId]);

  // Retry function for activity history
//   const retryFetchActivityHistory = async () => {
//     if (activity) {
//       try {
//         setHistoryLoading(true);
//         setHistoryError(null);

//         const { histories: fetchedHistories, error: historyError } =
//           await ActivityService.fetchActivityHistoryById(activity.id);

//         if (historyError) {
//           setHistoryError(historyError);
//         } else {
//           setHistories(fetchedHistories);
//         }
//       } catch (err) {
//         setHistoryError(
//           err instanceof Error
//             ? err.message
//             : "Failed to load activity history",
//         );
//       } finally {
//         setHistoryLoading(false);
//       }
//     }
//   };

  // Retry function for activity history images
//   const retryFetchActivityHistoryImages = async () => {
//     if (activity) {
//       try {
//         setHistoryImagesLoading(true);
//         setHistoryImagesError(null);

//         const { historyImages: fetchedImages, error: imagesError } =
//           await ActivityService.fetchActivityHistoryImagesById(activity.id);

//         if (imagesError) {
//           setHistoryImagesError(imagesError);
//         } else {
//           setHistoryImages(fetchedImages);
//         }
//       } catch (err) {
//         setHistoryImagesError(
//           err instanceof Error ? err.message : "Failed to load activity images",
//         );
//       } finally {
//         setHistoryImagesLoading(false);
//       }
//     }
//   };

  // Retry function for reviews
//   const retryFetchReviews = async () => {
//     if (activity) {
//       try {
//         setReviewsLoading(true);
//         setReviewsError(null);

//         const { reviews: fetchedReviews, error: reviewsError } =
//           await ActivityService.fetchActivityReviewsById(activity.id);

//         if (reviewsError) {
//           setReviewsError(reviewsError);
//         } else {
//           setReviews(fetchedReviews);
//         }
//       } catch (err) {
//         setReviewsError(
//           err instanceof Error ? err.message : "Failed to load reviews",
//         );
//       } finally {
//         setReviewsLoading(false);
//       }
//     }
//   };

  // Main retry function for activity data
  const retryFetchActivity = async () => {
    if (activityId) {
      try {
        setLoading(true);
        setError(null);

        const { data: activityData, error: activityError } =
          await ActivityService.fetchActivityById(activityId as string);

        if (activityError) {
          setError(activityError);
          setLoading(false);
        } else if (activityData) {
          setActivity(activityData);
          setLoading(false);
          // Retry all related data
        //   retryFetchReviews();
        //   retryFetchActivityHistory();
        //   retryFetchActivityHistoryImages();
        } else {
          setError("No activity data received");
          setLoading(false);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching activity details",
        );
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <ActivityDetailsLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Failed to Load Activity
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={retryFetchActivity}
            className="bg-gradient-to-r from-purple-600 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-amber-700 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
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
            The activity you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-sky-50">
      <ActivityDetailsHeroSection activity={activity} />

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
            {/* <ActivitySchedules schedules={activity.schedules} /> */}
          </div>
        </div>
      </div>

      {/* Activity History Section */}
      {/* <div className="container mx-auto px-4 py-8">
        <ActivityHistorySection
          histories={histories}
          loading={historyLoading}
          error={historyError}
          onRetry={retryFetchActivityHistory}
        />
      </div> */}

      {/* Activity History Gallery */}
      {/* <div className="container mx-auto px-4">
        <ActivityHistoryGallery
          imagesData={historyImages}
          loading={historyImagesLoading}
          error={historyImagesError}
          onRetry={retryFetchActivityHistoryImages}
        />
      </div> */}

      {/* Reviews Section */}
      {/* <div className="container mx-auto px-4 py-8">
        <ReviewsSection
          reviews={reviews}
          loading={reviewsLoading}
          error={reviewsError}
          // onRetry={retryFetchReviews}
        />
      </div> */}
    </div>
  );
};

export default ActivityDetailsPage;
