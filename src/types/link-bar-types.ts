export interface LinkBarItem {
  name: string;
  description: string;
  typeName: string;
  typeStatus: string;
  iconUrl: string;
  linkUrl: string;
  itemStatus: string;
  itemStatusStatus: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  terminatedAt: string | null;
  terminatedBy: number | null;
}
