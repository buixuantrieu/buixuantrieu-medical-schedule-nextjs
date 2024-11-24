/*
  Warnings:

  - You are about to drop the column `image` on the `Specialty` table. All the data in the column will be lost.
  - Added the required column `logo` to the `Specialty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Specialty` DROP COLUMN `image`,
    ADD COLUMN `logo` TEXT NOT NULL;
