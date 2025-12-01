// types/notifications.ts
export interface NotificationPermissions {
  id: number;
  userId: number;
  newToursUpdate: boolean;
  newToursUpdateAt: string;
  newPackagesUpdate: boolean;
  newPackagesUpdateAt: string;
  newDestinationsUpdate: boolean;
  newDestinationsUpdateAt: string;
  newActivitiesUpdate: boolean;
  newActivitiesUpdateAt: string;
  discounts: boolean;
  discountsUpdatedAt: string;
  freeCoupons: boolean;
  freeCouponsUpdatedAt: string;
  yourTourDetailsUpdates: boolean;
  yourTourDetailsUpdatesAt: string;
  tourReminders: boolean;
  tourRemindersUpdatedAt: string;
  tourSuggestions: boolean;
  tourSuggestionsUpdatedAt: string;
  specialNotices: boolean;
  specialNoticesUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationResponse {
  code: number;
  status: string;
  message: string;
  data: NotificationPermissions;
  timestamp: string;
}

export interface UpdateNotificationRequest {
  name: string;
  value: boolean;
}

export interface UpdateNotificationResponse {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
    id: number | null;
  };
  timestamp: string;
}