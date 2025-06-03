"use client";
import useAnalytics from "@/hooks/use-analytics";
import useIP from "@/hooks/use-ip";
import { db } from "@/lib/config/firebase";
import { siteConfig } from "@/lib/config/metadata";
import { COOKIE_NAMES, LogEvents, PATHS } from "@/lib/constants";
import { PageData, SessionData } from "@/lib/interfaces";
import { generateID } from "@/lib/utils";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { JSX, ReactNode, useEffect } from "react";
import { UAParser } from "ua-parser-js";

const parser = new UAParser();

export default function MainLayout({ children }: { children: ReactNode }): JSX.Element {
  const pathname = usePathname();
  const { createLog } = useAnalytics();
  const { fetchLocation, ipResponse } = useIP();
  const browserInfo = parser.getBrowser();
  const osInfo = parser.getOS();

  const getPageData = (): PageData => ({
    path: pathname,
    views: 1,
    last_visited: new Date().toString(),
  });

  const updatePagesVisited = (
    pagesVisited: PageData[],
    pageData: PageData
  ): PageData[] => {
    const existingPageIdx = pagesVisited.findIndex((page) => page.path === pathname);
    if (existingPageIdx !== -1) {
      pagesVisited[existingPageIdx] = {
        ...pagesVisited[existingPageIdx],
        views: pagesVisited[existingPageIdx].views + 1,
        last_visited: new Date().toString(),
      };
    } else {
      pagesVisited.push(pageData);
    }
    return pagesVisited;
  };

  const logUserSession = async (sessionID: string): Promise<void> => {
    if (!sessionID) return;

    try {
      const docRef = doc(db, `analytics/site_sessions/sessions/${sessionID}`);
      const docSnapshot = await getDoc(docRef);
      const location = Cookies.get(COOKIE_NAMES.UserLocation);
      const pageData = getPageData();

      if (docSnapshot.exists()) {
        const sessionData = docSnapshot.data() as SessionData;
        const pagesVisited = updatePagesVisited(
          sessionData.pages_visited || [],
          pageData
        );

        await updateDoc(docRef, {
          ...sessionData,
          recent_activity: new Date(),
          pages_visited: pagesVisited,
        });
      } else {
        const sessionData: SessionData = {
          ip_meta: location ? JSON.parse(location) : ipResponse,
          device: {
            type: osInfo.name ?? "N/A",
            browser: browserInfo.name ?? "N/A",
          },
          user_meta: {
            sessionID,
          },
          created_at: serverTimestamp(),
          recent_activity: serverTimestamp(),
          pages_visited: [pageData],
        };
        await setDoc(docRef, sessionData);
      }
    } catch (error) {
      console.error("Error logging session:", error);
    }
  };

  const logPageVisit = (): void => {
    const pageData = {
      pathname,
      url: siteConfig.url + pathname,
      time: new Date(),
    };

    if (pathname === PATHS.index) {
      createLog("page_visit", pageData);
      createLog(LogEvents.VisitLandingPage);
    } else {
      createLog("page_view", pageData);
    }
  };

  const setUserSession = (): void => {
    if (!Cookies.get(COOKIE_NAMES.UserSession)) {
      Cookies.set(COOKIE_NAMES.UserSession, generateID(), {
        sameSite: "strict",
        secure: true,
      });
    }
  };

  const setLocationData = async (): Promise<void> => {
    if (!Cookies.get(COOKIE_NAMES.UserLocation)) {
      try {
        await fetchLocation();
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
  };

  const logData = async (): Promise<void> => {
    logPageVisit();
    setUserSession();
    await setLocationData();
    await logUserSession(Cookies.get(COOKIE_NAMES.UserSession) || "");
  };

  useEffect(() => {
    logData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <div className="overflow-x-clip">{children}</div>;
}
