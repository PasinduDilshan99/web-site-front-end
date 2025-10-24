"use client";
import React from "react";
import Loading from "@/components/common-components/loading/Loading";
import { ErrorState } from "@/components/common-components/error-state/ErrorState";
import ActivityHistoryCarousel from "./ActivityHistoryCarousel";

// Types for activity history
export interface ActivityHistoryImage {
  imageId: number;
  imageName: string;
  imageDescription: string;
  imageUrl: string;
  statusName: string;
  createdByUsername: string;
  updatedByUsername: string | null;
  terminatedByUsername: string | null;
  createdAt: string;
  updatedAt: string;
  terminatedAt: string | null;
}

export interface Destination {
  destinationId: string;
  destinationName: string;
  destinationDescription: string;
  destinationLocation: string;
  latitude: number;
  longitude: number;
}

export interface Activity {
  activityId: number;
  activityName: string;
  activityDescription: string;
  activityCategory: string;
  durationHours: number;
  availableFrom: string;
  availableTo: string;
  priceLocal: number;
  priceForeigners: number;
  minParticipate: number;
  maxParticipate: number;
  season: string;
  destination: Destination;
}

export interface Schedule {
  scheduleId: number;
  scheduleName: string;
  scheduleDescription: string;
  assumeStartDate: string;
  assumeEndDate: string;
  durationHoursStart: number;
  durationHoursEnd: number;
  specialNote: string;
}

export interface History {
  historyName: string;
  historyDescription: string;
  numberOfParticipate: number;
  activityStart: string;
  activityEnd: string;
  rating: number;
  specialNote: string;
  statusName: string;
  createdByUsername: string;
  updatedByUsername: string | null;
  terminatedByUsername: string | null;
  createdAt: string;
  updatedAt: string;
  terminatedAt: string | null;
}

export interface ActivityHistory {
  historyId: number;
  activity: Activity;
  schedule: Schedule;
  history: History;
  images: ActivityHistoryImage[];
}

interface ActivityHistorySectionProps {
  histories: ActivityHistory[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const ActivityHistorySection: React.FC<ActivityHistorySectionProps> = ({
  histories,
  loading,
  error,
  onRetry,
}) => {
  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Activity History
            </h2>
            <p className="text-lg text-gray-600">
              Discover our past adventure experiences
            </p>
          </div>
          <Loading
            message="Loading activity history..."
            variant="spinner"
            size="md"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Activity History
            </h2>
          </div>
          <ErrorState
            title="Failed to Load Activity History"
            message={error}
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={onRetry}
          />
        </div>
      </section>
    );
  }

  if (histories.length === 0) {
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Activity History
            </h2>
            <p className="text-lg text-gray-600">
              Discover our past adventure experiences
            </p>
          </div>
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No activity history available yet.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Activity History
          </h2>
          <p className="text-lg text-gray-600">
            Discover our past adventure experiences
          </p>
        </div>
        <ActivityHistoryCarousel histories={histories} />
      </div>
    </section>
  );
};

export default ActivityHistorySection;
