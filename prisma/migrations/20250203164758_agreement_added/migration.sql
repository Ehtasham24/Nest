-- CreateTable
CREATE TABLE "agreement" (
    "agreement_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "agreement_pkey" PRIMARY KEY ("agreement_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agreement_student_id_key" ON "agreement"("student_id");

-- AddForeignKey
ALTER TABLE "agreement" ADD CONSTRAINT "agreement_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
