// app/profile/notifications/page.tsx
"use client";
import UserProfileNotificationLoading from "@/components/user-profile-components/Loadings/UserProfileNotificationLoading";
import { useAuth } from "@/context/AuthContext";
import { UserProfileAPIService } from "@/services/userProfileAPIService";
import {
  NotificationPermissions,
  UpdateNotificationRequest,
} from "@/types/user-notifications-permissions";
import { USER_PROFILE_NOTIFICATION_VIEW_PRIVILEGE } from "@/utils/privileges";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NotificationsPage() {
  const [notificationData, setNotificationData] =
    useState<NotificationPermissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const apiService = new UserProfileAPIService();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (
      user &&
      !user.privileges.includes(USER_PROFILE_NOTIFICATION_VIEW_PRIVILEGE)
    ) {
      router.push("/profile");
    }
  }, [user, router]);

  useEffect(() => {
    loadNotificationPermissions();
  }, []);

  const loadNotificationPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getNotificationPermissions();
      setNotificationData(response.data);
    } catch (err) {
      console.error("Failed to load notification permissions:", err);
      setError("Failed to load notification settings");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fieldNameMap: { [key: string]: string } = {
    newToursUpdate: "new_tours",
    newPackagesUpdate: "new_packages",
    newDestinationsUpdate: "new_destinations",
    newActivitiesUpdate: "new_activities",
    discounts: "discounts",
    freeCoupons: "free_coupons",
    yourTourDetailsUpdates: "your_tour_details",
    tourReminders: "tour_reminders",
    tourSuggestions: "tour_suggestions",
    specialNotices: "special_notices",
  };

  const reverseFieldNameMap: { [key: string]: string } = Object.fromEntries(
    Object.entries(fieldNameMap).map(([camel, snake]) => [snake, camel]),
  );

  const handleToggle = async (
    camelCaseField: string,
    currentValue: boolean,
  ) => {
    const snakeCaseField = fieldNameMap[camelCaseField];
    const newValue = !currentValue;

    if (!snakeCaseField) {
      console.error("Invalid field name:", camelCaseField);
      setSaveStatus({
        type: "error",
        message: "Invalid notification setting",
      });
      return;
    }

    try {
      setUpdating(camelCaseField);
      setSaveStatus(null);

      const updateRequest: UpdateNotificationRequest = {
        name: snakeCaseField,
        value: newValue,
      };

      await apiService.updateNotificationPermission(updateRequest);

      setNotificationData((prev) =>
        prev
          ? {
              ...prev,
              [camelCaseField]: newValue,
              [`${camelCaseField}At`]: new Date().toISOString(),
            }
          : null,
      );

      setSaveStatus({
        type: "success",
        message: "Notification settings updated successfully!",
      });

      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error("Failed to update notification setting:", err);
      setSaveStatus({
        type: "error",
        message: "Failed to update notification setting",
      });
    } finally {
      setUpdating(null);
    }
  };

  const getFieldDisplayName = (camelCaseField: string): string => {
    const nameMap: { [key: string]: string } = {
      newToursUpdate: "New Tours",
      newPackagesUpdate: "New Packages",
      newDestinationsUpdate: "New Destinations",
      newActivitiesUpdate: "New Activities",
      discounts: "Discounts & Offers",
      freeCoupons: "Free Coupons",
      yourTourDetailsUpdates: "Tour Updates",
      tourReminders: "Tour Reminders",
      tourSuggestions: "Tour Suggestions",
      specialNotices: "Special Notices",
    };
    return nameMap[camelCaseField] || camelCaseField;
  };

  const getFieldDescription = (camelCaseField: string): string => {
    const descriptionMap: { [key: string]: string } = {
      newToursUpdate: "Get notified when new tours are available",
      newPackagesUpdate: "Receive updates about new travel packages",
      newDestinationsUpdate: "Be the first to know about new destinations",
      newActivitiesUpdate: "Get alerts for new activities and experiences",
      discounts: "Receive notifications about special discounts and offers",
      freeCoupons: "Get notified about free coupons and promotional codes",
      yourTourDetailsUpdates: "Updates about your booked tours and changes",
      tourReminders: "Reminders for upcoming tours and important dates",
      tourSuggestions:
        "Personalized tour recommendations based on your interests",
      specialNotices: "Important announcements and special travel notices",
    };
    return descriptionMap[camelCaseField] || "Notification setting";
  };

  const getFieldIcon = (camelCaseField: string): string => {
    const iconMap: { [key: string]: string } = {
      newToursUpdate: "🚌",
      newPackagesUpdate: "📦",
      newDestinationsUpdate: "🏝️",
      newActivitiesUpdate: "🎯",
      discounts: "💰",
      freeCoupons: "🎫",
      yourTourDetailsUpdates: "📋",
      tourReminders: "⏰",
      tourSuggestions: "💡",
      specialNotices: "📢",
    };
    return iconMap[camelCaseField] || "🔔";
  };

  const notificationFields = [
    "newToursUpdate",
    "newPackagesUpdate",
    "newDestinationsUpdate",
    "newActivitiesUpdate",
    "discounts",
    "freeCoupons",
    "yourTourDetailsUpdates",
    "tourReminders",
    "tourSuggestions",
    "specialNotices",
  ];

  if (loading) {
    return <UserProfileNotificationLoading />;
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Unable to Load Notifications
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadNotificationPermissions}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Notification Settings
              </h1>
              <p className="text-gray-600">
                Manage your notification preferences
              </p>
            </div>
            {notificationData && (
              <div className="text-sm text-gray-500">
                Last updated: {formatDate(notificationData.updatedAt)}
              </div>
            )}
          </div>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              saveStatus.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {saveStatus.type === "success" ? "✅" : "❌"}
              </span>
              {saveStatus.message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Notification Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Settings Header */}
              <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    🔔
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      Notification Preferences
                    </h2>
                    <p className="text-sky-100 text-sm">
                      Choose what notifications you want to receive
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="divide-y divide-gray-100">
                {notificationFields.map((camelCaseField) => {
                  const isEnabled = notificationData?.[
                    camelCaseField as keyof NotificationPermissions
                  ] as boolean;
                  const updatedAt = notificationData?.[
                    `${camelCaseField}At` as keyof NotificationPermissions
                  ] as string;

                  return (
                    <div
                      key={camelCaseField}
                      className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center space-x-3 md:space-x-4 flex-1">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-100 rounded-xl flex items-center justify-center text-lg md:text-xl">
                            {getFieldIcon(camelCaseField)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm md:text-base lg:text-lg">
                              {getFieldDisplayName(camelCaseField)}
                            </h3>
                            <p className="text-gray-600 text-xs md:text-sm mt-1">
                              {getFieldDescription(camelCaseField)}
                            </p>
                            {updatedAt && (
                              <p className="text-gray-500 text-xs mt-2">
                                Updated: {formatDate(updatedAt)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 md:space-x-3">
                          {/* Toggle Switch */}
                          <button
                            onClick={() =>
                              handleToggle(camelCaseField, isEnabled)
                            }
                            disabled={updating === camelCaseField}
                            className={`relative inline-flex h-4 w-8 md:h-6 md:w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                              isEnabled ? "bg-teal-600" : "bg-gray-600"
                            } ${updating === camelCaseField ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <span
                              className={`inline-block h-2 w-2 md:h-4 md:w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                isEnabled
                                  ? "translate-x-4 md:translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>

                          {updating === camelCaseField && (
                            <div className="h-3 w-3 md:h-4 md:w-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-6">
            {/* Enable All */}
            <div className="bg-white rounded-2xl shadow-lg border border-sky-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-lg">
                  💡
                </div>
                <h3 className="font-semibold text-gray-800">
                  Enable All Notifications
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Turn on all notification types to stay updated with everything.
              </p>
              <button
                onClick={() => {
                  notificationFields.forEach((camelCaseField) => {
                    if (
                      !notificationData?.[
                        camelCaseField as keyof NotificationPermissions
                      ]
                    ) {
                      handleToggle(camelCaseField, false);
                    }
                  });
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium"
              >
                Enable All
              </button>
            </div>

            {/* Disable All */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">
                  🔕
                </div>
                <h3 className="font-semibold text-gray-800">
                  Disable All Notifications
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Turn off all notifications if you prefer not to receive any
                updates.
              </p>
              <button
                onClick={() => {
                  notificationFields.forEach((camelCaseField) => {
                    if (
                      notificationData?.[
                        camelCaseField as keyof NotificationPermissions
                      ]
                    ) {
                      handleToggle(camelCaseField, true);
                    }
                  });
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium"
              >
                Disable All
              </button>
            </div>

            {/* Information Section */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">
                  ℹ️
                </div>
                <h3 className="font-semibold text-gray-800">
                  About Notifications
                </h3>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  Notifications will be sent via email and in-app alerts
                </p>
                <p className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  You can change these settings at any time
                </p>
                <p className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  Critical account-related notifications will always be sent
                </p>
                <p className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  Settings sync across all your devices
                </p>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-2xl border border-sky-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Current Settings
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Enabled Notifications
                  </span>
                  <span className="font-semibold text-sky-700">
                    {
                      notificationFields.filter(
                        (field) =>
                          notificationData?.[
                            field as keyof NotificationPermissions
                          ],
                      ).length
                    }{" "}
                    / {notificationFields.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="font-semibold text-gray-700">
                    {notificationData
                      ? formatDate(notificationData.updatedAt)
                      : "N/A"}
                  </span>
                </div>
                <div className="pt-3 border-t border-sky-200">
                  <div className="text-xs text-gray-500">
                    Changes are saved automatically
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
