"use client"

import { Profile } from "@prisma/client"

interface ProfileInfoProps {
  profile: Profile | null
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  if (!profile) return null

  // Check if there's any info to display
  const hasInfo = profile.email || profile.phone || profile.age || profile.gender || profile.province || profile.schoolOrCompany

  if (!hasInfo) return null

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      {/* Decorative gradient line */}
      <div className="mb-12 flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gradient-to-r from-blue-500 to-purple-500 to-transparent dark:via-blue-500/30 dark:via-purple-500/30"></div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 px-4">Professional Profile</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gradient-to-r from-blue-500 to-purple-500 to-transparent dark:via-blue-500/30 dark:via-purple-500/30"></div>
      </div>

      {/* Grid Layout - 3 columns for larger screens, 2 for medium, 1 for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Email Card */}
        {profile.email && (
          <a href={`mailto:${profile.email}`} className="group h-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 p-6 border border-blue-200/50 dark:border-blue-700/30 hover:border-blue-400/50 dark:hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-900/20 cursor-pointer h-full flex flex-col">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
              <div className="relative flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors break-all">{profile.email}</p>
              </div>
            </div>
          </a>
        )}

        {/* Phone Card */}
        {profile.phone && (
          <a href={`tel:${profile.phone}`} className="group h-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20 p-6 border border-green-200/50 dark:border-green-700/30 hover:border-green-400/50 dark:hover:border-green-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-green-900/20 cursor-pointer h-full flex flex-col">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-300"></div>
              <div className="relative flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 7.49a1 1 0 00.502.756l4.622 3.485a1 1 0 001.386-.172l2.541-4.721a1 1 0 00-.88-1.454H6.75a1 1 0 00-1 1v6a1 1 0 001 1h.75a1 1 0 001-1v-4.5" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">{profile.phone}</p>
              </div>
            </div>
          </a>
        )}

        {/* Location Card */}
        {profile.province && (
            <div className="group h-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20 p-6 border border-red-200/50 dark:border-red-700/30 hover:border-red-400/50 dark:hover:border-red-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-red-900/20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all duration-300"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors">{profile.province}</p>
              </div>
            </div>
          </div>
        )}

        {/* School/Company Card */}
        {profile.schoolOrCompany && (
          <div className="group h-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20 p-6 border border-amber-200/50 dark:border-amber-700/30 hover:border-amber-400/50 dark:hover:border-amber-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-amber-900/20 h-full flex flex-col">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-300"></div>
              <div className="relative flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5m0 0H9m0 0h5.5M9 7h1m-1 4h1m0 4H9m5-4h1m0 4h1" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">School/Company</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">{profile.schoolOrCompany}</p>
              </div>
            </div>
          </div>
        )}

        {/* Gender Card */}
        {profile.gender && (
          <div className="group h-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/20 p-6 border border-indigo-200/50 dark:border-indigo-700/30 hover:border-indigo-400/50 dark:hover:border-indigo-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-900/20 h-full flex flex-col">
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-300"></div>
              <div className="relative flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">Gender</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{profile.gender}</p>
              </div>
            </div>
          </div>
        )}

        {/* Age Card */}
        {profile.age && (
          <div className="group h-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-900/20 dark:to-cyan-800/20 p-6 border border-cyan-200/50 dark:border-cyan-700/30 hover:border-cyan-400/50 dark:hover:border-cyan-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-900/20 h-full flex flex-col">
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-300"></div>
              <div className="relative flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">Age</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{profile.age} years</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
