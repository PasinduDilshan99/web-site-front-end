// services/seasonService.ts

import { ApiResponse, SeasonBasic, SeasonDetails } from "@/types/season-types";
import {
  GET_ACTIVE_SEASONS_BASIC_DETAILS_DATA_FE,
  GET_SEASONS_DETAILS_BY_SEASON_ID_DATA_FE,
} from "@/utils/frontEndConstant";

export class SeasonService {
  /**
   * Get All Seasons (Basic)
   */
  async getAllSeasons(): Promise<SeasonBasic[]> {
    const response = await fetch(GET_ACTIVE_SEASONS_BASIC_DETAILS_DATA_FE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // always fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch seasons");
    }

    const result: ApiResponse<SeasonBasic[]> = await response.json();

    if (result.code !== 200) {
      throw new Error(result.message || "Error fetching seasons");
    }

    return result.data;
  }

  /**
   * Get Season Details By ID
   */
  async getSeasonById(seasonId: number): Promise<SeasonDetails> {
    const response = await fetch(
      `${GET_SEASONS_DETAILS_BY_SEASON_ID_DATA_FE}/${seasonId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch season details");
    }

    const result: ApiResponse<SeasonDetails[]> = await response.json();

    if (result.code !== 200) {
      throw new Error(result.message || "Error fetching season details");
    }

    return result.data[0];
  }
}
