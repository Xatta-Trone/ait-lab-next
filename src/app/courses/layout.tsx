import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Courses - Artificial Intelligence in Transportation (AIT Lab)",
  description:
    "Artificial Intelligence in Transportation Lab at Texas State University",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
