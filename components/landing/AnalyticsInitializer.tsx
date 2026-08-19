"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { persistUtmParameters } from "@/lib/utm";

export function AnalyticsInitializer() {
  useEffect(() => {
    persistUtmParameters(new URLSearchParams(window.location.search));
    trackEvent("landing_viewed");
  }, []);

  return null;
}
