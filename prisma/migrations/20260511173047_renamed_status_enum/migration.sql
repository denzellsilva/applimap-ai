/*
  Warnings:

  - Changed the type of `status` on the `JobApplication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('WISH_LIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'GHOSTED');

-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "status",
ADD COLUMN     "status" "JobApplicationStatus" NOT NULL;

-- DropEnum
DROP TYPE "Status";
