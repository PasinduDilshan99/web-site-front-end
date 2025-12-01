    // types/coupons.ts
export interface CouponDetails {
  couponId: number;
  couponCode: string;
  couponName: string;
  couponDescription: string;
  couponType: string;
}

export interface AllocationStatus {
  allocationStatus: string;
  statusCategory: string;
  statusDescription: string;
}

export interface DiscountInfo {
  discountType: string;
  discountValue: number;
  discountDisplay: string;
  minimumCartValue: number;
  maximumDiscount: number;
}

export interface TimingInfo {
  allocatedAt: string;
  expiresAt: string;
  usedAt: string | null;
  couponValidFrom: string;
  couponValidUntil: string;
}

export interface UsageInfo {
  usageLimitPerUser: number;
  usageLimitPerCoupon: number;
  totalUsageCount: number;
}

export interface ApplicabilityInfo {
  applicableFor: string;
  applicablePackages: string[];
}

export interface CalculatedStatus {
  effectiveStatus: string;
  daysRemaining: number;
  isUsable: boolean;
  statusDescription: string;
}

export interface CouponData {
  allocationId: number;
  userId: number;
  username: string;
  userFullName: string;
  couponDetails: CouponDetails;
  allocationStatus: AllocationStatus;
  discountInfo: DiscountInfo;
  timingInfo: TimingInfo;
  usageInfo: UsageInfo;
  applicabilityInfo: ApplicabilityInfo;
  calculatedStatus: CalculatedStatus;
  used: boolean;
  expired: boolean;
  active: boolean;
}

export interface CouponsResponse {
  code: number;
  status: string;
  message: string;
  data: CouponData[];
  timestamp: string;
}