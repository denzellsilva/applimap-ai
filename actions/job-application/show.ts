"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

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