// hero section types
export interface HeroSlideData {
  imageId: number;
  imageName: string;
  imageUrl: string;
  imageTitle?: string;
  imageSubTitle?: string;
  imageDescription?: string;
  imagePrimaryButtonText?: string;
  imagePrimaryButtonLink?: string;
  imageSecondaryButtonText?: string;
  imageSecondaryButtonLink?: string;
  imageStatus?: string;        
  imageStatusStatus?: string;
  imageOrder?: number;
  imageCreatedAt?: string;
  imageCreatedBy?: number;
  imageUpdatedAt?: string;
  imageUpdatedBy?: number;
  imageTerminatedAt?: string | null;
  imageTerminatedBy?: number;
}

export interface AboutUsHeroData {
  id: number;
  name: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  statusName?: string;
}

export interface AboutUsAPIResponse {
  code: number;
  status: string;
  message: string;
  data: AboutUsHeroData[];
  timestamp: string;
}

export interface ContactUsHeroData {
  id: number;
  name: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  statusName?: string;
}

export interface ContactUsAPIResponse {
  code: number;
  status: string;
  message: string;
  data: ContactUsHeroData[];
  timestamp: string;
}

export interface BlogHeroData {
  id: number;
  name: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  statusName?: string;
}

export interface BlogHeroApiResponse {
  code: number;
  status: string;
  message: string;
  data: BlogHeroData[];
  timestamp: string;
}

export interface FaqHeroData {
  id: number;
  name: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  createdBy?: number;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

export interface FaqHeroApiResponse {
  code: number;
  status: string;
  message: string;
  data: FaqHeroData[];
  timestamp: string;
}

export interface TourHeroData {
  id: number;
  name: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  createdBy?: number;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

export interface TourHeroApiResponse {
  code: number;
  status: string;
  message: string;
  data: TourHeroData[];
  timestamp: string;
}

export interface PackageHeroData {
  id: number;
  name: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  createdBy?: number;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

export interface PackageHeroApiResponse {
  code: number;
  status: string;
  message: string;
  data: PackageHeroData[];
  timestamp: string;
}

export interface DestinationHeroData {
  id: number;
  name: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  createdBy?: number;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

export interface DestinationHeroApiResponse {
  code: number;
  status: string;
  message: string;
  data: DestinationHeroData[];
  timestamp: string;
}

export interface ActivityHeroData {
  id: number;
  name: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  createdBy?: number;
  updatedBy?: number | null;
  terminatedAt?: string | null;
  terminatedBy?: number | null;
}

export interface ActivityHeroApiResponse {
  code: number;
  status: string;
  message: string;
  data: ActivityHeroData[];
  timestamp: string;
}