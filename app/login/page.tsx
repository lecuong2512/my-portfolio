import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  async function handleLogin(formData: FormData) {
    "use server"
    
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/admin",
      })
    } catch (error) {
      redirect("/login?error=Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md transition-colors">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Login</h1>
        {searchParams?.error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded transition-colors">
            {searchParams.error}
          </div>
        )}
        <form action={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
