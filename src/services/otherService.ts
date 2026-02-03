import { WeatherResponse } from "@/types/other-types";

export class OtherService {
  static async getCurrentWeather(
    latitude: string,
    longitude: string
  ): Promise<WeatherResponse> {

    const response = await fetch(
      `/api/other-apis/weather?latitude=${latitude}&longitude=${longitude}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Internal weather API error:", text);
      throw new Error("Failed to fetch weather data");
    }

    return response.json();
  }
}
