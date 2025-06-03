import { COOKIE_NAMES, COOKIE_OPTIONS } from "@/lib/constants";
import { UseIPResponse } from "@/lib/interfaces";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface UseIPReturn {
  ipResponse: UseIPResponse | null;
  fetchLocation: () => Promise<void>;
}

function useIP(): UseIPReturn {
  const [ipResponse, setIPResponse] = useState<UseIPResponse | null>(null);

  useEffect(() => {
    void fetchLocation();
  }, []);

  async function fetchLocation(): Promise<void> {
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UseIPResponse = await response.json();
      const ipResponseData = {
        country_name: data.country_name,
        country_code: data.country_code,
        city: data.city,
        region: data.region,
        timezone: data.timezone,
        utc_offset: data.utc_offset,
        ip: data.ip,
      };

      setIPResponse(ipResponseData);
      Cookies.set(
        COOKIE_NAMES.UserLocation,
        JSON.stringify(ipResponseData),
        COOKIE_OPTIONS
      );
    } catch (error) {
      console.error("Failed to fetch location data:", error);
      // Don't throw the error to prevent breaking the app
    }
  }

  return {
    ipResponse,
    fetchLocation,
  };
}

export default useIP;
