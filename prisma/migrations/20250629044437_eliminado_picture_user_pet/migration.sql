/*
  Warnings:

  - You are about to drop the column `pictureId` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `pictureId` on the `User` table. All the data in the column will be lost.
  - Added the required column `filenamePicture` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pathPicture` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filenamePicture` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pathPicture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Pet` DROP FOREIGN KEY `Pet_pictureId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_pictureId_fkey`;

-- DropIndex
DROP INDEX `Pet_pictureId_key` ON `Pet`;

-- DropIndex
DROP INDEX `User_pictureId_key` ON `User`;

-- AlterTable
ALTER TABLE `Pet` DROP COLUMN `pictureId`,
    ADD COLUMN `filenamePicture` VARCHAR(191) NOT NULL,
    ADD COLUMN `pathPicture` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `pictureId`,
    ADD COLUMN `filenamePicture` VARCHAR(191) NOT NULL,
    ADD COLUMN `pathPicture` VARCHAR(191) NOT NULL;
