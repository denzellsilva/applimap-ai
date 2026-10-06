"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const jobApplicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  companyName: z.string().min(1, "Company name is required"),
  status: z.enum(["WISH_LIST", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"], {
    error: (issue) =>
      !issue.input ? "Status is required." : "Invalid status.",
  }),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  salaryRange: z.string().optional().nullable(),
  url: z.url("Must be a valid URL").optional().nullable().or(z.literal("")),
});

export interface State {
  errors?: {
    title?: string[];
    companyName?: string[];
    status?: string[];
    location?: string[];
    description?: string[];
    salaryRange?: string[];
    url?: string[];
  };
  message?: string | null;
  fields?: {
    title?: string;
    companyName?: string;
    status?: string;
    location?: string;
    description?: string;
    salaryRange?: string;
    url?: string;
  };
}

export type JobApplicationAction = (
  prevState: State,
  formData: FormData,
) => Promise<State>;

// CREATE
export async function createJobApplication(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const rawFields = {
    title: formData.get("title") as string,
    companyName: formData.get("companyName") as string,
    status: formData.get("status") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    salaryRange: formData.get("salaryRange") as string,
    url: formData.get("url") as string,
  };

  const validatedFields = jobApplicationSchema.safeParse(rawFields);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Invalid job application",
      fields: rawFields,
    };
  }

  const {
    title,
    companyName,
    status,
    location,
    description,
    salaryRange,
    url,
  } = validatedFields.data;

  try {
    await prisma.jobApplication.create({
      data: {
        title,
        companyName,
        status,
        location,
        description,
        salaryRange,
        url,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.error(`Database Error: ${error}`);
    return {
      message: "Database Error: Failed to save job application.",
      fields: rawFields,
    };
  }

  revalidatePath("/applications");
  return { message: "Job application added successfully" };
}

// READ (All for current user)
export async function getJobApplications() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const jobApplications = await prisma.jobApplication.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "asc",
      },
    });

    const groupedJobApplications = Object.groupBy(
      jobApplications,
      ({ status }) => status,
    );

    return groupedJobApplications;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to get job applications.");
  }
}

// READ (Single by ID)
export async function getJobApplicationById(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const jobApplication = await prisma.jobApplication.findUnique({
      where: {
        id,
        userId: session.user.id, // Ensure user owns the application
      },
    });

    return jobApplication;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to get job application.");
  }
}

// UPDATE
export async function updateJobApplication(
  id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
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

  const rawFields = {
    title: formData.get("title") as string,
    companyName: formData.get("companyName") as string,
    status: formData.get("status") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    salaryRange: formData.get("salaryRange") as string,
    url: formData.get("url") as string,
  };

  const validatedFields = jobApplicationSchema.safeParse(rawFields);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Invalid job application",
      fields: rawFields,
    };
  }

  // const {
  //   title,
  //   companyName,
  //   status,
  //   location,
  //   description,
  //   salaryRange,
  //   url,
  // } = validatedFields.data;

  try {
    await prisma.jobApplication.update({
      where: {
        id,
      },
      data: {
        ...validatedFields.data,
      },
    });
  } catch (error) {
    console.error(`Database Error: ${error}`);
    return {
      message: "Database Error: Failed to update job application.",
      fields: rawFields,
    };
  }

  revalidatePath("/applications");
  return { message: "Job application updated successfully" };
}

// DELETE
// export async function deleteJobApplication(id: string) {
//   const session = await auth();
//   if (!session?.user?.id) {
//     throw new Error("Unauthorized");
//   }

//   // Verify ownership
//   const existingApp = await prisma.jobApplication.findUnique({
//     where: { id },
//   });

//   if (!existingApp || existingApp.userId !== session.user.id) {
//     throw new Error("Job application not found or unauthorized");
//   }

//   await prisma.jobApplication.delete({
//     where: {
//       id,
//     },
//   });

//   revalidatePath("/applications");
//   return { success: true };
// }
