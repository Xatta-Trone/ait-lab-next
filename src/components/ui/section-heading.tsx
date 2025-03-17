import type React from "react";
interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function SectionHeading({
  title,
  subtitle,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center mb-12 mt-6 gap-6`}
    >
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
