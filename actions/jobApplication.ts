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

export interface JobApplicationState {
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
  prevState: JobApplicationState,
  formData: FormData,
) => Promise<JobApplicationState>;

type JobApplicationFields = NonNullable<JobApplicationState["fields"]>;
type ValidatedJobApplication = z.infer<typeof jobApplicationSchema>;

function validateJobApplicationData(formData: FormData):
  | {
      success: true;
      data: ValidatedJobApplication;
      fields: JobApplicationFields;
    }
  | { success: false; state: JobApplicationState } {
  const fields: JobApplicationFields = {
    title: formData.get("title")?.toString() ?? "",
    companyName: formData.get("companyName")?.toString() ?? "",
    status: formData.get("status")?.toString() ?? "",
    location: formData.get("location")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    salaryRange: formData.get("salaryRange")?.toString() ?? "",
    url: formData.get("url")?.toString() ?? "",
  };

  const validatedFields = jobApplicationSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      success: false,
      state: {
        errors: z.flattenError(validatedFields.error).fieldErrors,
        message: "Invalid job application",
        fields,
      },
    };
  }
  return { success: true, data: validatedFields.data, fields };
}

// CREATE
export async function createJobApplication(
  prevState: JobApplicationState,
  formData: FormData,
): Promise<JobApplicationState> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validatedJobApplication = validateJobApplicationData(formData);

  if (!validatedJobApplication.success) {
    return validatedJobApplication.state;
  }

  const {
    title,
    companyName,
    status,
    location,
    description,
    salaryRange,
    url,
  } = validatedJobApplication.data;

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
      fields: validatedJobApplication.fields,
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
        userId: session.user.id,
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
  prevState: JobApplicationState,
  formData: FormData,
): Promise<JobApplicationState> {
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

  const validatedJobApplication = validateJobApplicationData(formData);

  if (!validatedJobApplication.success) {
    return validatedJobApplication.state;
  }

  const {
    title,
    companyName,
    status,
    location,
    description,
    salaryRange,
    url,
  } = validatedJobApplication.data;

  try {
    await prisma.jobApplication.update({
      where: {
        id,
      },
      data: {
        title,
        companyName,
        status,
        location,
        description,
        salaryRange,
        url,
      },
    });
  } catch (error) {
    console.error(`Database Error: ${error}`);
    return {
      message: "Database Error: Failed to update job application.",
      fields: validatedJobApplication.fields,
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
