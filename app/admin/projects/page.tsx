"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ProjectForm } from "@/components/project-form"
import { DeleteProjectButton } from "@/components/delete-project-button"
import { getProjects } from "@/lib/actions"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const detailsRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error("Failed to load projects:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const handleFormClose = async () => {
    if (detailsRef.current) {
      detailsRef.current.open = false
    }
    // Reload projects after form closes
    await handleProjectCreated()
  }

  const handleProjectCreated = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error("Failed to reload projects:", error)
    }
  }

  const handleProjectDeleted = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error("Failed to reload projects:", error)
    }
  }

  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
        </div>

        <details ref={detailsRef} className="group mb-6">
          <summary className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-md font-medium transition-colors inline-block">
            + Add Project
          </summary>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Project</h3>
            <ProjectForm 
              onSubmitCallback={handleFormClose}
            />
          </div>
        </details>

        {projects.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No projects yet. Click "+ Add Project" to create your first project!</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-start justify-between bg-gray-50 dark:bg-gray-700/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="mt-2 w-32 h-32 object-cover rounded"
                    />
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton projectId={project.id} onDeleted={handleProjectDeleted} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
