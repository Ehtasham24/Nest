-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending',
ALTER COLUMN "steps" DROP NOT NULL;
