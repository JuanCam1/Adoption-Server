/*
  Warnings:

  - Added the required column `type` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Made the column `token` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Session` ADD COLUMN `type` VARCHAR(191) NOT NULL,
    MODIFY `token` VARCHAR(191) NOT NULL;
