"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteProject } from "@/lib/actions"

interface DeleteProjectButtonProps {
  projectId: string
  onDeleted?: () => void
}

export function DeleteProjectButton({ projectId, onDeleted }: DeleteProjectButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleDelete() {
    if (isPending) return // Prevent multiple clicks
    
    if (confirm("Are you sure you want to delete this project?")) {
      setError(null)
      startTransition(async () => {
        const result = await deleteProject(projectId)
        if (result?.error) {
          setError(result.error)
        } else {
          // Call callback if provided, otherwise refresh
          if (onDeleted) {
            onDeleted()
          } else {
            router.refresh()
          }
        }
      })
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}

