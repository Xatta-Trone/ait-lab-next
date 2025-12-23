import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TRBAM 2026 - Transportation Research Board Annual Meeting | AIT Lab",
  description:
    "View the schedule of papers accepted for presentation at TRBAM 2026 (Transportation Research Board Annual Meeting) from the Artificial Intelligence in Transportation Lab at Texas State University.",
};

export default function TRBAM2026Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
