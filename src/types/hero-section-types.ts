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
