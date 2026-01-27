export interface ActiveImagesType {
  imageId: number;
  imageName: string;
  imageDescription: string;
  location: string;
  imageLink: string;
  imageOwner: string;
  imageSource: string;
  imageSourceLink: string;
  color: string;
  hoverColor: string;
  imageStatus: string;
  imageStatusStatus: string;
  createdAt: string;
  updatedAt: string;
  terminatedAt: string | null;
}

export interface GalleryApiResponse {
  code: number;
  status: string;
  message: string;
  data: ActiveImagesType[];
  timestamp: string;
}