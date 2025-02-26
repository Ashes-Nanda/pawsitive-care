import DiseaseDetection from "@/components/DiseaseDetection";
import { Sidebar } from "@/components/Sidebar";

export default function DiseaseDetectionPage() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-emerald-400 neon mb-6">
            Disease Detection
          </h1>
          <DiseaseDetection />
        </div>
      </main>
    </div>
  );
}
