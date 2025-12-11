"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Profile Actions
export async function getProfile() {
  try {
    const profile = await prisma.profile.findFirst()
    return profile
  } catch (error) {
    console.error("Error fetching profile:", error)
    return null
  }
}

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    const name = formData.get("name") as string
    const bio = formData.get("bio") as string
    const email = formData.get("email") as string
    const profession = formData.get("profession") as string
    const province = formData.get("province") as string
    const schoolOrCompany = formData.get("schoolOrCompany") as string
    const gender = formData.get("gender") as string
    const ageStr = formData.get("age") as string
    const age = ageStr ? parseInt(ageStr) : null
    const phone = formData.get("phone") as string
    const github = formData.get("github") as string
    const linkedin = formData.get("linkedin") as string
    const twitter = formData.get("twitter") as string
    const facebook = formData.get("facebook") as string
    const youtube = formData.get("youtube") as string
    const tiktok = formData.get("tiktok") as string
    const website = formData.get("website") as string
    const avatar = formData.get("avatar") as string
    const logo = formData.get("logo") as string
    const backgroundMusic = formData.get("backgroundMusic") as string
    const enableBackgroundMusic = formData.get("enableBackgroundMusic") === "on"

    // Check if profile exists
    const existingProfile = await prisma.profile.findFirst()

    if (existingProfile) {
      await prisma.profile.update({
        where: { id: existingProfile.id },
        data: {
          name,
          bio: bio || null,
          email,
          profession: profession || null,
          province: province || null,
          schoolOrCompany: schoolOrCompany || null,
          gender: gender || null,
          age: age || null,
          phone: phone || null,
          github: github || null,
          linkedin: linkedin || null,
          twitter: twitter || null,
          facebook: facebook || null,
          youtube: youtube || null,
          tiktok: tiktok || null,
          website: website || null,
          avatar: avatar || null,
          logo: logo || null,
          backgroundMusic: backgroundMusic || null,
          enableBackgroundMusic,
        },
      })
    } else {
      await prisma.profile.create({
        data: {
          name,
          bio: bio || null,
          email,
          profession: profession || null,
          province: province || null,
          schoolOrCompany: schoolOrCompany || null,
          gender: gender || null,
          age: age || null,
          phone: phone || null,
          github: github || null,
          linkedin: linkedin || null,
          twitter: twitter || null,
          facebook: facebook || null,
          youtube: youtube || null,
          tiktok: tiktok || null,
          website: website || null,
          avatar: avatar || null,
          logo: logo || null,
          backgroundMusic: backgroundMusic || null,
          enableBackgroundMusic,
        },
      })
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { error: "Failed to update profile" }
  }
}

// Project Actions
export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    })
    return projects
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    })
    return project
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}

export async function createProject(formData: FormData) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    const title = (formData.get("title") as string)?.trim()
    const description = (formData.get("description") as string)?.trim()
    const image = (formData.get("image") as string)?.trim() || null
    const url = (formData.get("url") as string)?.trim() || null
    const githubUrl = (formData.get("githubUrl") as string)?.trim() || null
    const techStack = (formData.get("techStack") as string)?.trim() || null
    const featured = formData.get("featured") === "on"

    if (!title || title.length === 0) {
      return { error: "Title is required" }
    }

    if (!description || description.length === 0) {
      return { error: "Description is required" }
    }

    await prisma.project.create({
      data: {
        title,
        description,
        image,
        url,
        githubUrl,
        techStack,
        featured,
      },
    })

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error creating project:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create project"
    return { error: errorMessage }
  }
}

export async function updateProject(id: string, formData: FormData) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    const title = (formData.get("title") as string)?.trim()
    const description = (formData.get("description") as string)?.trim()
    const image = (formData.get("image") as string)?.trim() || null
    const url = (formData.get("url") as string)?.trim() || null
    const githubUrl = (formData.get("githubUrl") as string)?.trim() || null
    const techStack = (formData.get("techStack") as string)?.trim() || null
    const featured = formData.get("featured") === "on"

    if (!title || title.length === 0) {
      return { error: "Title is required" }
    }

    if (!description || description.length === 0) {
      return { error: "Description is required" }
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        image,
        url,
        githubUrl,
        techStack,
        featured,
      },
    })

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error updating project:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to update project"
    return { error: errorMessage }
  }
}

export async function deleteProject(id: string) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    await prisma.project.delete({
      where: { id },
    })

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error: any) {
    // P2025 is Prisma's error code for "Record to delete does not exist"
    // If the record doesn't exist, we can consider it already deleted
    if (error?.code === 'P2025') {
      // Project already deleted, just revalidate paths
      revalidatePath("/")
      revalidatePath("/admin")
      return { success: true }
    }
    
    console.error("Error deleting project:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to delete project"
    return { error: errorMessage }
  }
}
