import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Ahmed Woodart",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
