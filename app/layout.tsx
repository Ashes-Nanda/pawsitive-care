import "../styles/globals.css"; // Use correct relative path
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import ClientPathnameHandler from "@/components/ClientPathnameHandler"; // Import Client Component

export const metadata = {
  title: "Pet Care Hub",
  description: "Comprehensive pet health management and tracking",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ClientPathnameHandler>{children}</ClientPathnameHandler>
      </body>
    </html>
  );
}
