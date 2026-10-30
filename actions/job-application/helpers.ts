"use server";

import prisma from "@/lib/prisma";
import type { ValidatedJobApplication } from "@/actions/job-application/types";

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


