import {
  JobApplicationFields,
  JobApplicationState,
  ValidatedJobApplication,
} from "@/actions/job-application/types";
import { jobApplicationSchema } from "@/actions/job-application/schema";
import { z } from "zod";

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