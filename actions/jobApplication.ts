"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { JobApplicationStatus } from "../app/generated/prisma/client";
import { z } from "zod";

const jobApplicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  companyName: z.string().min(1, "Company name is required"),
  status: z.nativeEnum(JobApplicationStatus),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  salaryRange: z.string().optional().nullable(),
  url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;

// CREATE
export async function createJobApplication(data: JobApplicationInput) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validatedData = jobApplicationSchema.parse(data);

  const jobApplication = await prisma.jobApplication.create({
    data: {
      ...validatedData,
      url: validatedData.url === "" ? null : validatedData.url,
      userId: session.user.id,
    },
  });

  revalidatePath("/applications");
  return jobApplication;
}

// READ (All for current user)
export async function getJobApplications() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const jobApplications = await prisma.jobApplication.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobApplications;
}

// READ (Single by ID)
export async function getJobApplicationById(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const jobApplication = await prisma.jobApplication.findUnique({
    where: {
      id,
      userId: session.user.id, // Ensure user owns the application
    },
  });

  return jobApplication;
}

// UPDATE
export async function updateJobApplication(
  id: string,
  data: Partial<JobApplicationInput>,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Verify ownership
  const existingApp = await prisma.jobApplication.findUnique({
    where: { id },
  });

  if (!existingApp || existingApp.userId !== session.user.id) {
    throw new Error("Job application not found or unauthorized");
  }

  const validatedData = jobApplicationSchema.partial().parse(data);

  const updatedJobApplication = await prisma.jobApplication.update({
    where: {
      id,
    },
    data: {
      ...validatedData,
      url: validatedData.url === "" ? null : validatedData.url,
    },
  });

  revalidatePath("/applications");
  revalidatePath(`/applications/${id}`);
  return updatedJobApplication;
}

// DELETE
export async function deleteJobApplication(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Verify ownership
  const existingApp = await prisma.jobApplication.findUnique({
    where: { id },
  });

  if (!existingApp || existingApp.userId !== session.user.id) {
    throw new Error("Job application not found or unauthorized");
  }

  await prisma.jobApplication.delete({
    where: {
      id,
    },
  });

  revalidatePath("/applications");
  return { success: true };
}
