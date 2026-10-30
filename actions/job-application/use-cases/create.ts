"use server";

import { JobApplicationState } from "@/actions/job-application/types";
import { auth } from "@/auth";
import { validateJobApplicationData } from "@/actions/job-application/validation";
import { getNextPosition } from "@/actions/job-application/helpers";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    const newPosition = await getNextPosition(session.user.id, status);

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
        position: newPosition,
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