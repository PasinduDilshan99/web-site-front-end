// types/nav-bar-types.ts
export interface NavBarSubmenuItem {
  id: number;
  navBarId: number;
  name: string;
  description: string;
  linkUrl: string;
  iconClass: string;
  sortOrder: number;
  opensInNewTab: boolean;
  isFeatured: boolean;
  status: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
}

export interface NavBarItem {
  id: number;
  name: string;
  description: string;
  status: string;
  linkUrl: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number | null;
  terminatedAt: string | null;
  terminatedBy: number | null;
  submenus: NavBarSubmenuItem[];
}