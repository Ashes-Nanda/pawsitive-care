import ProfileForm from '@/components/ProfileForm'

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 neon mb-6">Profile Settings</h1>
      <ProfileForm />
    </div>
  )
}

