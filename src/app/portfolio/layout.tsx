import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Ahmed Woodart",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
