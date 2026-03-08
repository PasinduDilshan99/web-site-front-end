// types/user-benefits.ts
export interface Benefit {
  benefitId: number;
  benefitName: string;
  benefitDescription: string;
  benefitValue: number;
  benefitType: string;
  benefitTypeDescription: string;
  validFrom: string;
  validTo: string;
  benefitStatus: string;
}

export interface UserLevel {
  levelId: number;
  levelName: string;
  pointsNeeded: number;
  description: string;
  benefits: Benefit[];
}

export interface Progress {
  progressPercentage: number;
  pointsNeededForNextLevel: number;
}

export interface UserDetails {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  benefitsPointsCount: number;
}

export interface UserBenefitsData {
  userDetails: UserDetails;
  currentUserLevel: UserLevel;
  previousUserLevel: UserLevel;
  nextUserLevel: UserLevel;
  progress: Progress;
}

export interface UserBenefitsResponse {
  code: number;
  status: string;
  message: string;
  data: UserBenefitsData;
  timestamp: string;
}