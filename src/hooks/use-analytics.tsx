"use client";

import { app } from "@/lib/config/firebase";
import type { Analytics, EventParams } from "firebase/analytics";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useState } from "react";

interface UseAnalytics {
  createLog: (log: string, eventParams?: EventParams) => void;
  analytics?: Analytics;
}

export default function useAnalytics(): UseAnalytics {
  const [analytics, setAnalytics] = useState<Analytics>();

  function createLog(log: string, eventParams?: EventParams): void {
    try {
      if (!window) return;
      const firebaseAnalytics: Analytics = getAnalytics(app);
      setAnalytics(firebaseAnalytics);
      logEvent(firebaseAnalytics, log, { ...eventParams });
      if (process.env.NODE_ENV === "development") {
        console.log(
          `🪵 Log event created for ${log} with event params ${
            JSON.stringify(eventParams) || "none"
          }`
        );
      }
    } catch (error) {
      throw new Error("an error occured mounting analytics");
    }
  }

  return { createLog, analytics };
}
