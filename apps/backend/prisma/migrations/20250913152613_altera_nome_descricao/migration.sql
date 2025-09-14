/*
  Warnings:

  - You are about to drop the column `name` on the `Source` table. All the data in the column will be lost.
  - Added the required column `description` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Source" DROP COLUMN "name",
ADD COLUMN     "description" VARCHAR(255) NOT NULL;
