"use client"

import { useState } from "react"
import { updateProfile } from "@/lib/actions"
import { Toast } from "./toast"
import { AvatarUploadField } from "./avatar-upload-field"
import { AudioUploadField } from "./audio-upload-field"
import { LogoUploadField } from "./logo-upload-field"
import { vietnamProvinces } from "@/lib/vietnam-provinces"

interface ProfileFormProps {
  profile: any
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      await updateProfile(formData)
      setToast({ message: "Profile saved successfully!", type: "success" })
      setSubmitting(false)
    } catch (error) {
      console.error("Error saving profile:", error)
      setToast({ message: "Failed to save profile", type: "error" })
      setSubmitting(false)
    }
  }

  return (
    <>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={profile?.name || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={profile?.email || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nghề nghiệp/Profession
            </label>
            <input
              id="profession"
              name="profession"
              type="text"
              defaultValue={profile?.profession || ""}
              placeholder="Ví dụ: Full Stack Developer, Designer, etc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              defaultValue={profile?.bio || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tỉnh/Thành phố
            </label>
            <select
              id="province"
              name="province"
              defaultValue={profile?.province || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {vietnamProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="schoolOrCompany" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tên trường/Công ty
            </label>
            <input
              id="schoolOrCompany"
              name="schoolOrCompany"
              type="text"
              defaultValue={profile?.schoolOrCompany || ""}
              placeholder="Ví dụ: Đại học Bách Khoa, Google Inc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Giới tính
            </label>
            <select
              id="gender"
              name="gender"
              defaultValue={profile?.gender || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tuổi
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="1"
              max="120"
              defaultValue={profile?.age || ""}
              placeholder="Ví dụ: 25"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Số điện thoại
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={profile?.phone || ""}
              placeholder="Ví dụ: 0123456789"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <AvatarUploadField defaultValue={profile?.avatar} />

          <LogoUploadField defaultValue={profile?.logo} />

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              defaultValue={profile?.website || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GitHub
            </label>
            <input
              id="github"
              name="github"
              type="url"
              defaultValue={profile?.github || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              LinkedIn
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              defaultValue={profile?.linkedin || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              X (Twitter)
            </label>
            <input
              id="twitter"
              name="twitter"
              type="url"
              defaultValue={profile?.twitter || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Facebook
            </label>
            <input
              id="facebook"
              name="facebook"
              type="url"
              defaultValue={profile?.facebook || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              YouTube
            </label>
            <input
              id="youtube"
              name="youtube"
              type="url"
              defaultValue={profile?.youtube || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              TikTok
            </label>
            <input
              id="tiktok"
              name="tiktok"
              type="url"
              defaultValue={profile?.tiktok || ""}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Nhạc Nền (Background Music)</h3>
              <AudioUploadField defaultValue={profile?.backgroundMusic || undefined} />
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-start">
                  <input
                    id="enableBackgroundMusic"
                    name="enableBackgroundMusic"
                    type="checkbox"
                    defaultChecked={profile?.enableBackgroundMusic ?? true}
                    className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <div className="ml-3">
                    <label htmlFor="enableBackgroundMusic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bật nhạc nền
                    </label>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Tích vào ô này để bật nhạc nền trên trang portfolio. Bỏ tích để tắt hoàn toàn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 transition-colors"
          >
            {submitting ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </>
  )
}
