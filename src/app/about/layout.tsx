import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Artisan | Ahmed Woodart",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
