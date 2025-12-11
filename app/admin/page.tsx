import { getProfile } from "@/lib/actions"
import { ProfileForm } from "@/components/profile-form"

export default async function AdminProfilePage() {
  const profile = await getProfile()

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Manager</h2>
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}
