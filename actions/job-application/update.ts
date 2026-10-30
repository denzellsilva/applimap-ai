"use server";

import { auth } from "@/auth";
import { getNextPosition } from "@/actions/job-application/lib/helpers";
import { validateJobApplicationData } from "@/actions/job-application/lib/validation";
import type { JobApplicationState } from "@/actions/job-application/lib/types";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateJobApplication(
  id: string,
  prevState: JobApplicationState,
  formData: FormData,
): Promise<JobApplicationState> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const existingApp = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!existingApp || existingApp.userId !== session.user.id) {
      throw new Error("Job application not found or unauthorized");
    }
  } catch (error) {
    console.error(`Database Error: ${error}`);
    return {
      message:
        error instanceof Error
          ? error.message
          : "Database Error: Failed to verify job application.",
    };
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
    const existingApp = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (existingApp && existingApp.status !== status) {
      const newPosition = await getNextPosition(session.user.id, status);
      await prisma.jobApplication.update({
        where: { id },
        data: {
          title,
          companyName,
          status,
          location,
          description,
          salaryRange,
          url,
          position: newPosition,
        },
      });
    } else {
      await prisma.jobApplication.update({
        where: { id },
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
    }
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