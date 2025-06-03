"use client";

import { app } from "@/lib/config/firebase";
import type { Analytics, EventParams } from "firebase/analytics";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useEffect, useState } from "react";

interface UseAnalytics {
  createLog: (log: string, eventParams?: EventParams) => void;
  analytics?: Analytics;
}

export default function useAnalytics(): UseAnalytics {
  const [analytics, setAnalytics] = useState<Analytics>();

  useEffect(() => {
    // Initialize analytics only once when the component mounts
    try {
      const firebaseAnalytics = getAnalytics(app);
      setAnalytics(firebaseAnalytics);
    } catch (error) {
      console.error("Failed to initialize Firebase Analytics:", error);
    }
  }, []);

  function createLog(log: string, eventParams?: EventParams): void {
    if (!analytics) {
      console.warn("Analytics not initialized. Skipping log:", log);
      return;
    }

    try {
      logEvent(analytics, log, eventParams);

      if (process.env.NODE_ENV === "development") {
        console.debug(
          `[Analytics] Event: ${log}`,
          eventParams ? `Params: ${JSON.stringify(eventParams)}` : ""
        );
      }
    } catch (error) {
      console.error(`Failed to log analytics event "${log}":`, error);
    }
  }

  return { createLog, analytics };
}
