import VaccinationTimeline from "@/components/VaccinationTimeline";
import { Sidebar } from "@/components/Sidebar";

export default function VaccinationsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-emerald-400 neon mb-6">
            Vaccination Timeline
          </h1>
          <VaccinationTimeline />
        </div>
      </main>
    </div>
  );
}
