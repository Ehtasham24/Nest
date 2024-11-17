-- CreateEnum
CREATE TYPE "Steps" AS ENUM ('step_1', 'step_2', 'step_3', 'step_4', 'step_5', 'step_6', 'step_7');

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "steps" "Steps";
