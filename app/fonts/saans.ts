import localFont from "next/font/local";

export const saans = localFont({
  src: [
    { path: "./Saans-TRIAL-Regular.otf", weight: "400", style: "normal" },
    { path: "./Saans-TRIAL-Medium.otf", weight: "500", style: "normal" },
    { path: "./Saans-TRIAL-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./Saans-TRIAL-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-saans",
  display: "swap",
  fallback: ["Arial Nova", "Arial", "Helvetica", "sans-serif"],
});
