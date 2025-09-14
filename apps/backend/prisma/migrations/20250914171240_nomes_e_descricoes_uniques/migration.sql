/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Source` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Media_name_key" ON "public"."Media"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Source_description_key" ON "public"."Source"("description");
