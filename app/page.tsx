import { getProfile, getProjects } from "@/lib/actions"
import Image from "next/image"
import { SafeImage } from "@/components/safe-image"
import { SocialIcon } from "@/components/social-icons"
import { BackgroundMusic } from "@/components/background-music"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { ProfileInfo } from "@/components/profile-info"

export default async function HomePage() {
  const profile = await getProfile()
  const projects = await getProjects()

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <div style={{ isolation: 'isolate' }}>
      {/* Header - Outside container to ensure fixed positioning works */}
      <header 
        className="sticky-header bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 transition-colors"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          width: '100%',
          isolation: 'isolate'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {profile?.logo && (
                <Image
                  src={profile.logo}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              )}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Portfolio
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <BackgroundMusic 
                musicUrl={profile?.backgroundMusic} 
                enabled={profile?.enableBackgroundMusic ?? true}
              />
              <DarkModeToggle />
            </div>
          </nav>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="text-center">
          {profile?.avatar && (
            <div className="mb-6 flex justify-center animate-fade-in-up">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={150}
                  height={150}
                  className="relative rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl"
                />
              </div>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 animate-fade-in-up animation-delay-200">
            {profile?.name || "Welcome"}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up animation-delay-300">
            <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">{profile?.profession || "Professional"}</p>
            <div className="h-1 w-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"></div>
          </div>
          {profile?.bio && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-400 leading-relaxed">
              {profile.bio}
            </p>
          )}
          <div className="flex justify-center gap-6 flex-wrap animate-fade-in-up animation-delay-600">
            {profile?.github && (
              <SocialIcon platform="github" url={profile.github} className="text-gray-700 hover:text-gray-900" />
            )}
            {profile?.linkedin && (
              <SocialIcon platform="linkedin" url={profile.linkedin} className="text-blue-600 hover:text-blue-700" />
            )}
            {profile?.twitter && (
              <SocialIcon platform="twitter" url={profile.twitter} className="text-sky-500 hover:text-sky-600" />
            )}
            {profile?.facebook && (
              <SocialIcon platform="facebook" url={profile.facebook} className="text-blue-700 hover:text-blue-800" />
            )}
            {profile?.youtube && (
              <SocialIcon platform="youtube" url={profile.youtube} className="text-red-600 hover:text-red-700" />
            )}
            {profile?.tiktok && (
              <SocialIcon platform="tiktok" url={profile.tiktok} className="text-gray-900 hover:text-black" />
            )}
            {profile?.website && (
              <SocialIcon platform="website" url={profile.website} className="text-gray-600 hover:text-gray-900" />
            )}
          </div>
        </div>
      </section>

      {/* Profile Information Section */}
      <ProfileInfo profile={profile} />

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-900/50 overflow-hidden hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-gray-900/60 transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up border border-gray-200/50 dark:border-gray-700/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {project.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <SafeImage
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.split(",").map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-gradient-to-r from-blue-100 dark:from-blue-900/50 to-purple-100 dark:to-purple-900/50 text-gray-700 dark:text-blue-200 rounded-full font-medium"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1"
                      >
                        View Project <span>→</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors duration-200"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-900/50 overflow-hidden hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-gray-900/60 transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up border border-gray-200/50 dark:border-gray-700/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {project.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <SafeImage
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.split(",").map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-gradient-to-r from-blue-100 dark:from-blue-900/50 to-purple-100 dark:to-purple-900/50 text-gray-700 dark:text-blue-200 rounded-full font-medium"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1"
                      >
                        View Project <span>→</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-700 text-sm transition-colors duration-200"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>No projects yet. Check back soon!</p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 mt-16 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400 transition-colors">
            © {new Date().getFullYear()} {profile?.name || "Portfolio"}. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  )
}
