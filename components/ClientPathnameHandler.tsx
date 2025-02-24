"use client"; // Mark this as a Client Component

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ClientPathnameHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPawsitiveCare = pathname.startsWith("/pawsitive");
  const isTailTracker = pathname.startsWith("/tail-tracker");

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-900">
      {(isPawsitiveCare || isTailTracker) && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {(isPawsitiveCare || isTailTracker) && <Header />}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-100 dark:bg-zinc-900">
          {children}
        </main>
      </div>
    </div>
  );
}
