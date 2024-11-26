/*
  Warnings:

  - You are about to alter the column `status` on the `UserConnection` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `UserConnection` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;
