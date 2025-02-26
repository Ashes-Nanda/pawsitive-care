import ProfileForm from "@/components/ProfileForm";
import { Sidebar } from "@/components/Sidebar";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-emerald-400 neon mb-6">
            Profile Settings
          </h1>
          <ProfileForm />
        </div>
      </main>
    </div>
  );
}
