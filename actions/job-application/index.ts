"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

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
        position: "asc",
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