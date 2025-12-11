"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createProject, updateProject } from "@/lib/actions"
import { UploadButton } from "@uploadthing/react"
import { Toast } from "./toast"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

interface Project {
  id: string
  title: string
  description: string
  image: string | null
  url: string | null
  githubUrl: string | null
  techStack: string | null
  featured: boolean
}

interface ProjectFormProps {
  project?: Project
  onSubmitCallback?: () => void
}

export function ProjectForm({ project, onSubmitCallback }: ProjectFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [imageUrl, setImageUrl] = useState(project?.image || "")
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [uploadType, setUploadType] = useState<"url" | "file">("url")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    if (imageUrl) {
      formData.set("image", imageUrl)
    }

    try {
      let result
      if (project) {
        result = await updateProject(project.id, formData)
      } else {
        result = await createProject(formData)
      }
      
      if (result?.error) {
        setToast({ message: result.error, type: "error" })
        setSubmitting(false)
        return
      }
      
      setToast({ message: project ? "Project updated successfully!" : "Project created successfully!", type: "success" })
      
      if (!project && formRef.current) {
        // Reset form only for new projects
        formRef.current.reset()
        setImageUrl("")
      }
      
      setSubmitting(false)
      
      // Call the callback to close the form
      if (onSubmitCallback) {
        onSubmitCallback()
      }
      
      // Navigate back to projects page
      setTimeout(() => {
        router.push("/admin/projects")
      }, 800)
    } catch (error) {
      console.error("Error saving project:", error)
      setToast({ message: error instanceof Error ? error.message : "Failed to save project", type: "error" })
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
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={project?.title || ""}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={project?.description || ""}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Image
        </label>
        
        {/* Toggle between URL and File Upload */}
        <div className="mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setUploadType("url")}
              className={`px-4 py-2 text-sm font-medium border rounded-l-lg transition-colors ${
                uploadType === "url"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              Paste URL
            </button>
            <button
              type="button"
              onClick={() => setUploadType("file")}
              className={`px-4 py-2 text-sm font-medium border rounded-r-lg transition-colors ${
                uploadType === "file"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              Upload File
            </button>
          </div>
        </div>

        {/* URL Input */}
        {uploadType === "url" && (
          <input
            id="image"
            name="image"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white mb-3"
          />
        )}

        {/* File Upload */}
        {uploadType === "file" && (
          <div className="mb-3">
            <UploadButton<OurFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]?.url) {
                  setImageUrl(res[0].url)
                }
              }}
              onUploadError={(error: Error) => {
                setToast({ message: `Upload failed: ${error.message}`, type: "error" })
              }}
            />
          </div>
        )}

        {/* Hidden input to store the image URL for form submission */}
        <input
          type="hidden"
          name="image"
          value={imageUrl}
        />

        {/* Image Preview */}
        {imageUrl && (
          <div className="mt-3">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full max-w-md h-48 object-cover rounded-md border border-gray-300 dark:border-gray-600"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
              }}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            defaultValue={project?.url || ""}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            GitHub URL
          </label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            defaultValue={project?.githubUrl || ""}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tech Stack (comma-separated)
        </label>
        <input
          id="techStack"
          name="techStack"
          type="text"
          defaultValue={project?.techStack || ""}
          placeholder="React, Next.js, TypeScript"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex items-center">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={project?.featured || false}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Featured Project
        </label>
      </div>

      <div className="flex justify-end gap-4">
        {project && (
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 transition-colors"
        >
          {submitting ? "Saving..." : project ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
    </>
  )
}
