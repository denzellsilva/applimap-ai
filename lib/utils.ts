"use server";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jobApplicationSchema } from "@/actions/jobApplication";
import { JobApplicationState } from "@/actions/jobApplication";
import z from "zod";
import prisma from "@/lib/prisma";

type ValidatedJobApplication = z.infer<typeof jobApplicationSchema>;
type JobApplicationFields = NonNullable<JobApplicationState["fields"]>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function validateJobApplicationData(formData: FormData):
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

export async function getNextPosition(
  userId: string,
  status: ValidatedJobApplication["status"],
) {
  const maxPosition = await prisma.jobApplication.aggregate({
    where: {
      userId,
      status,
    },
    _max: {
      position: true,
    },
  });

  return (maxPosition._max.position ?? 0) + 1;
}