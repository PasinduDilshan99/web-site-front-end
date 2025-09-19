export interface WhyChooseUsCardAPI {
  cardId: number;
  cardName: string;
  cardTitle: string;
  cardSubTitle: string;
  cardDescription: string;
  cardImageUrl: string;
  cardIconUrl: string;
  cardClickedUrl: string;
  cardStatus: "VISIBLE" | "HIDDEN";
  cardStatusStatus: "ACTIVE" | "INACTIVE";
  cardColor: string;
  cardOrder: number;
  cardCreatedAt: string;
  cardCreatedBy: number;
  cardUpdatedAt: string;
  cardUpdatedBy: number;
  cardTerminatedAt: string | null;
  cardTerminatedBy: number;
}