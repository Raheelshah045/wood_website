import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process | Ahmed Woodart",
};

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
