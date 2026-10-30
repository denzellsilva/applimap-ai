import { z } from "zod";

export const jobApplicationSchema = z.object({
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