import { WhyChooseUsCardAPI } from "@/types/why-choose-us-types";
import { GET_ACTIVE_WHY_CHOOSE_US_DATA_FE } from "@/utils/frontEndConstant";

export class WhyChooseUsService {
  static async fetchCardsData(): Promise<{
    data: WhyChooseUsCardAPI[];
    error: string | null;
  }> {
    try {
      const response = await fetch(GET_ACTIVE_WHY_CHOOSE_US_DATA_FE);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData = await response.json();
      const cards = apiData.data || apiData;

      const activeCards = Array.isArray(cards)
        ? cards
            .filter(
              (card: WhyChooseUsCardAPI) =>
                card.cardStatus === "VISIBLE" &&
                card.cardStatusStatus === "ACTIVE"
            )
            .sort(
              (a: WhyChooseUsCardAPI, b: WhyChooseUsCardAPI) =>
                a.cardOrder - b.cardOrder
            )
        : [];

      return {
        data: activeCards,
        error: null,
      };
    } catch (err) {
      console.error("Error fetching cards data:", err);
      return {
        data: [],
        error: "Failed to load content. Please try again.",
      };
    }
  }
}