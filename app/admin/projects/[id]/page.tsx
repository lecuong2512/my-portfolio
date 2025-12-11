import { getProject, updateProject } from "@/lib/actions"
import { notFound, redirect } from "next/navigation"
import { ProjectForm } from "@/components/project-form"

export default async function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Project</h2>
        <ProjectForm project={project} />
      </div>
    </div>
  )
}
