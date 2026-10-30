import { jobApplicationSchema } from "@/actions/job-application/schema";
import { z } from "zod";

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

export type JobApplicationFields = NonNullable<JobApplicationState["fields"]>;
export type ValidatedJobApplication = z.infer<typeof jobApplicationSchema>;