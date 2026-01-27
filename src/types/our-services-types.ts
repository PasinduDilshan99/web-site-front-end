export interface OurServiceDataType {
  serviceId: number;
  serviceTitle: string;
  serviceSubTitle: string;
  serviceDescription: string;
  serviceImageUrl: string;
  serviceIconUrl: string;
  serviceColor: string;
  serviceStatus: string;
  serviceStatusStatus: string;
  serviceCreatedAt: string;
  serviceCreatedBy: number;
  serviceUpdatedAt: string | null;
  serviceUpdatedBy: number | null;
  serviceTerminatedAt: string | null;
  serviceTerminatedBy: number | null;
}