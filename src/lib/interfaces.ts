import { FieldValue } from "firebase/firestore";

export interface UseIPResponse {
  asn?: string;
  city?: string;
  continent_code?: string;
  country?: string;
  country_area?: 239460;
  country_calling_code?: string;
  country_capital?: string;
  country_code?: string;
  country_code_iso3?: string;
  country_name?: string;
  country_population?: number;
  country_tld?: string;
  currency?: string;
  currency_name?: string;
  in_eu?: boolean;
  ip?: string;
  languages?: string;
  latitude?: number;
  longitude?: number;
  network?: string;
  org?: string;
  postal?: unknown;
  region?: string;
  region_code?: string;
  timezone?: string;
  utc_offset?: string;
  version?: string;
}

export interface PageData {
  path: string;
  views: number;
  last_visited: string;
}

export interface SessionData {
  ip_meta: UseIPResponse;
  device: {
    type: string;
    browser: string;
  };
  user_meta: {
    sessionID: string;
  };
  created_at: FieldValue;
  recent_activity: FieldValue;
  pages_visited: PageData[];
}
