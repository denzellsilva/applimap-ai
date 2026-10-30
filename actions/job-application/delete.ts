"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteJobApplication(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const existingApp = await prisma.jobApplication.findUnique({
    where: { id },
  });

  if (!existingApp || existingApp.userId !== session.user.id) {
    throw new Error("Job application not found or unauthorized");
  }

  try {
    await prisma.jobApplication.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Database Error: ${error}`);
    throw new Error("Failed to delete job application.");
  }

  revalidatePath("/applications");
  return { success: true };
}