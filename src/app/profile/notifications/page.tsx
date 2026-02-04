// app/profile/notifications/page.tsx
"use client"
import { UserProfileAPIService } from '@/services/userProfileAPIService';
import { NotificationPermissions, UpdateNotificationRequest } from '@/types/user-notifications-permissions';
import { useState, useEffect } from 'react';

export default function NotificationsPage() {
  const [notificationData, setNotificationData] = useState<NotificationPermissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const apiService = new UserProfileAPIService();

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
      console.error('Failed to load notification permissions:', err);
      setError('Failed to load notification settings');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Map between camelCase (React state) and snake_case (API)
  const fieldNameMap: { [key: string]: string } = {
    // React state (camelCase) -> API (snake_case)
    newToursUpdate: 'new_tours',
    newPackagesUpdate: 'new_packages',
    newDestinationsUpdate: 'new_destinations',
    newActivitiesUpdate: 'new_activities',
    discounts: 'discounts',
    freeCoupons: 'free_coupons',
    yourTourDetailsUpdates: 'your_tour_details',
    tourReminders: 'tour_reminders',
    tourSuggestions: 'tour_suggestions',
    specialNotices: 'special_notices'
  };

  // Reverse map for display purposes
  const reverseFieldNameMap: { [key: string]: string } = Object.fromEntries(
    Object.entries(fieldNameMap).map(([camel, snake]) => [snake, camel])
  );

  const handleToggle = async (camelCaseField: string, currentValue: boolean) => {
    const snakeCaseField = fieldNameMap[camelCaseField];
    const newValue = !currentValue;
    
    if (!snakeCaseField) {
      console.error('Invalid field name:', camelCaseField);
      setSaveStatus({
        type: 'error',
        message: 'Invalid notification setting'
      });
      return;
    }

    try {
      setUpdating(camelCaseField);
      setSaveStatus(null);

      const updateRequest: UpdateNotificationRequest = {
        name: snakeCaseField,
        value: newValue
      };

      await apiService.updateNotificationPermission(updateRequest);

      // Update local state
      setNotificationData(prev => prev ? {
        ...prev,
        [camelCaseField]: newValue,
        [`${camelCaseField}At`]: new Date().toISOString()
      } : null);

      setSaveStatus({
        type: 'success',
        message: 'Notification settings updated successfully!'
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);

    } catch (err) {
      console.error('Failed to update notification setting:', err);
      setSaveStatus({
        type: 'error',
        message: 'Failed to update notification setting'
      });
    } finally {
      setUpdating(null);
    }
  };

  const getFieldDisplayName = (camelCaseField: string): string => {
    const nameMap: { [key: string]: string } = {
      newToursUpdate: 'New Tours',
      newPackagesUpdate: 'New Packages',
      newDestinationsUpdate: 'New Destinations',
      newActivitiesUpdate: 'New Activities',
      discounts: 'Discounts & Offers',
      freeCoupons: 'Free Coupons',
      yourTourDetailsUpdates: 'Tour Updates',
      tourReminders: 'Tour Reminders',
      tourSuggestions: 'Tour Suggestions',
      specialNotices: 'Special Notices'
    };
    return nameMap[camelCaseField] || camelCaseField;
  };

  const getFieldDescription = (camelCaseField: string): string => {
    const descriptionMap: { [key: string]: string } = {
      newToursUpdate: 'Get notified when new tours are available',
      newPackagesUpdate: 'Receive updates about new travel packages',
      newDestinationsUpdate: 'Be the first to know about new destinations',
      newActivitiesUpdate: 'Get alerts for new activities and experiences',
      discounts: 'Receive notifications about special discounts and offers',
      freeCoupons: 'Get notified about free coupons and promotional codes',
      yourTourDetailsUpdates: 'Updates about your booked tours and changes',
      tourReminders: 'Reminders for upcoming tours and important dates',
      tourSuggestions: 'Personalized tour recommendations based on your interests',
      specialNotices: 'Important announcements and special travel notices'
    };
    return descriptionMap[camelCaseField] || 'Notification setting';
  };

  const getFieldIcon = (camelCaseField: string): string => {
    const iconMap: { [key: string]: string } = {
      newToursUpdate: '🚌',
      newPackagesUpdate: '📦',
      newDestinationsUpdate: '🏝️',
      newActivitiesUpdate: '🎯',
      discounts: '💰',
      freeCoupons: '🎫',
      yourTourDetailsUpdates: '📋',
      tourReminders: '⏰',
      tourSuggestions: '💡',
      specialNotices: '📢'
    };
    return iconMap[camelCaseField] || '🔔';
  };

  const notificationFields = [
    'newToursUpdate',
    'newPackagesUpdate',
    'newDestinationsUpdate',
    'newActivitiesUpdate',
    'discounts',
    'freeCoupons',
    'yourTourDetailsUpdates',
    'tourReminders',
    'tourSuggestions',
    'specialNotices'
  ];

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-amber-200 to-purple-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gradient-to-r from-amber-100 to-purple-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Notifications</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadNotificationPermissions}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-amber-25 to-purple-25 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            Notification Settings
          </h1>
          <p className="text-gray-600 mt-2">Manage your notification preferences</p>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div className={`mb-6 p-4 rounded-lg border ${
            saveStatus.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {saveStatus.type === 'success' ? '✅' : '❌'}
              </span>
              {saveStatus.message}
            </div>
          </div>
        )}

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
          {/* Settings Header */}
          <div className="bg-gradient-to-r from-amber-500 to-purple-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                🔔
              </div>
              <div>
                <h2 className="text-lg lg:text-xl font-bold">Notification Preferences</h2>
                <p className="text-amber-100 text-sx lg:text-sm">Choose what notifications you want to receive</p>
              </div>
            </div>
          </div>

          {/* Notification Toggles */}
          <div className="divide-y divide-gray-100">
            {notificationFields.map((camelCaseField) => {
              const isEnabled = notificationData?.[camelCaseField as keyof NotificationPermissions] as boolean;
              const updatedAt = notificationData?.[`${camelCaseField}At` as keyof NotificationPermissions] as string;

              return (
                <div key={camelCaseField} className="p-6 hover:bg-amber-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-xl">
                        {getFieldIcon(camelCaseField)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-md lg:text-lg">
                          {getFieldDisplayName(camelCaseField)}
                        </h3>
                        <p className="text-gray-600 text-xs lg:text-sm mt-1">
                          {getFieldDescription(camelCaseField)}
                        </p>
                        {updatedAt && (
                          <p className="text-gray-500 text-xs mt-2">
                            Last updated: {formatDate(updatedAt)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Toggle Switch */}
                      <button
                        onClick={() => handleToggle(camelCaseField, isEnabled)}
                        disabled={updating === camelCaseField}
                        className={`relative inline-flex h-4 w-8 lg:h-6 lg:w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                          isEnabled 
                            ? 'bg-purple-600' 
                            : 'bg-gray-600'
                        } ${updating === camelCaseField ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-2 w-2 lg:h-4 lg:w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            isEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>

                      {updating === camelCaseField && (
                        <div className="h-2 w-2 lg:h-4 lg:w-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="text-amber-600 text-lg mr-2">💡</span>
              Enable All Notifications
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Turn on all notification types to stay updated with everything.
            </p>
            <button
              onClick={() => {
                notificationFields.forEach(camelCaseField => {
                  if (!notificationData?.[camelCaseField as keyof NotificationPermissions]) {
                    handleToggle(camelCaseField, false);
                  }
                });
              }}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 text-sm font-medium"
            >
              Enable All
            </button>
          </div>

          <div className="bg-purple-50 rounded-2xl border border-purple-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="text-purple-600 text-lg mr-2">🔕</span>
              Disable All Notifications
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Turn off all notifications if you prefer not to receive any updates.
            </p>
            <button
              onClick={() => {
                notificationFields.forEach(camelCaseField => {
                  if (notificationData?.[camelCaseField as keyof NotificationPermissions]) {
                    handleToggle(camelCaseField, true);
                  }
                });
              }}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm font-medium"
            >
              Disable All
            </button>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-gray-50 rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-gray-600 text-lg mr-2">ℹ️</span>
            About Notifications
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Notifications will be sent via email and in-app alerts</p>
            <p>• You can change these settings at any time</p>
            <p>• Critical account-related notifications will always be sent</p>
            <p>• Last updated: {notificationData ? formatDate(notificationData.updatedAt) : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}