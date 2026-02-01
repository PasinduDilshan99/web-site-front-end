// Footer data interfaces

export interface FooterSubItem {
  id: number;
  name: string;
  description: string;
  icon: string;
  linkUrl: string;
  status: string;
}

export interface FooterSection {
  id: number;
  title: string;
  description: string;
  color: string;
  status: string;
  subItems: FooterSubItem[];
}

export interface FooterSocialMedia {
  id: number;
  name: string;
  description: string;
  link: string;
  iconUrl: string;
  color: string;
  hoverColor: string;
  status: string;
}

export interface FooterOtherLink {
  id: number;
  name: string;
  description: string;
  linkUrl: string;
  status: string;
}

export interface FooterData {
  sections: FooterSection[];
  socialMedia: FooterSocialMedia[];
  others: FooterOtherLink[];
}

export interface FooterApiResponse {
  code: number;
  status: string;
  message: string;
  data: FooterData;
  timestamp: string;
}