/*
  Warnings:

  - Added the required column `banner_url` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "banner_url" TEXT NOT NULL;
