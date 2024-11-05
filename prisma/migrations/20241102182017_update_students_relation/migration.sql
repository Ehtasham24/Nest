-- CreateTable
CREATE TABLE "admissions" (
    "admission_id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "current_qualification" VARCHAR(50),
    "admission_type" VARCHAR(50),
    "program" VARCHAR(50),
    "major" VARCHAR(50),
    "campus" VARCHAR(50),
    "shift" VARCHAR(50),
    "previous_university" VARCHAR(100),
    "previous_program" VARCHAR(100),
    "completed_semesters" INTEGER,

    CONSTRAINT "admissions_pkey" PRIMARY KEY ("admission_id")
);

-- CreateTable
CREATE TABLE "basic_information" (
    "basic_info_id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "father_name" VARCHAR(50),
    "gender" VARCHAR(10),
    "date_of_birth" DATE,
    "nationality" VARCHAR(50),
    "religion" VARCHAR(50),
    "cnic_number" VARCHAR(15),
    "province" VARCHAR(50),
    "disability" BOOLEAN DEFAULT false,

    CONSTRAINT "basic_information_pkey" PRIMARY KEY ("basic_info_id")
);

-- CreateTable
CREATE TABLE "guardians" (
    "guardian_id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "guardian_name" VARCHAR(50),
    "relationship" VARCHAR(20),
    "contact_number" VARCHAR(15),
    "cnic_number" VARCHAR(15),
    "education" VARCHAR(50),
    "occupation" VARCHAR(50),
    "organization" VARCHAR(100),
    "designation" VARCHAR(50),
    "email_address" VARCHAR(100),

    CONSTRAINT "guardians_pkey" PRIMARY KEY ("guardian_id")
);

-- CreateTable
CREATE TABLE "intermediate_info" (
    "intermediate_id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "education_system" VARCHAR(50),
    "board_university" VARCHAR(100),
    "institute" VARCHAR(100),
    "passing_year" INTEGER,
    "group_major" VARCHAR(50),
    "result_status" VARCHAR(20),
    "roll_number" VARCHAR(20),
    "obtained_marks" INTEGER,

    CONSTRAINT "intermediate_info_pkey" PRIMARY KEY ("intermediate_id")
);

-- CreateTable
CREATE TABLE "matriculation_info" (
    "matric_id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "education_system" VARCHAR(50),
    "board_university" VARCHAR(100),
    "institute" VARCHAR(100),
    "passing_year" INTEGER,
    "group_major" VARCHAR(50),
    "result_status" VARCHAR(20),
    "roll_number" VARCHAR(20),
    "obtained_marks" INTEGER,

    CONSTRAINT "matriculation_info_pkey" PRIMARY KEY ("matric_id")
);

-- CreateTable
CREATE TABLE "required_documents" (
    "document_id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "nic_front" TEXT,
    "nic_back" TEXT,
    "matric_marksheet" TEXT,
    "intermediate_part2_marksheet" TEXT,
    "guardian_cnic" TEXT,
    "matric_certificate" TEXT,
    "intermediate_part1_marksheet" TEXT,

    CONSTRAINT "required_documents_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "residence_information" (
    "residence_id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "present_address" TEXT,
    "present_city" VARCHAR(50),
    "present_area" VARCHAR(50),
    "present_postal_code" VARCHAR(10),
    "permanent_address" TEXT,
    "permanent_city" VARCHAR(50),
    "permanent_area" VARCHAR(50),
    "permanent_postal_code" VARCHAR(10),

    CONSTRAINT "residence_information_pkey" PRIMARY KEY ("residence_id")
);

-- CreateTable
CREATE TABLE "students" (
    "student_id" SERIAL NOT NULL,
    "profile_photo" TEXT,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(15),

    CONSTRAINT "students_pkey" PRIMARY KEY ("student_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admissions_student_id_key" ON "admissions"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "basic_information_student_id_key" ON "basic_information"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "guardians_student_id_key" ON "guardians"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "intermediate_info_student_id_key" ON "intermediate_info"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "matriculation_info_student_id_key" ON "matriculation_info"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "required_documents_student_id_key" ON "required_documents"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "residence_information_student_id_key" ON "residence_information"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- AddForeignKey
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basic_information" ADD CONSTRAINT "basic_information_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardians" ADD CONSTRAINT "guardians_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intermediate_info" ADD CONSTRAINT "intermediate_info_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculation_info" ADD CONSTRAINT "matriculation_info_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "required_documents" ADD CONSTRAINT "required_documents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residence_information" ADD CONSTRAINT "residence_information_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;
