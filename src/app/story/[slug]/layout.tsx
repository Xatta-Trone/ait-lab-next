export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create shared layout for MDX story pages
  return <div>{children}</div>;
}
