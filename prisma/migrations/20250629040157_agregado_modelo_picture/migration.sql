/*
  Warnings:

  - You are about to drop the column `picture` on the `Pet` table. All the data in the column will be lost.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pictureId]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pictureId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pictureId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropIndex
DROP INDEX `Comment_postId_fkey` ON `Comment`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `postId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Pet` DROP COLUMN `picture`,
    ADD COLUMN `pictureId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` DROP PRIMARY KEY,
    DROP COLUMN `imageUrl`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP COLUMN `picture`,
    ADD COLUMN `pictureId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Picture` (
    `id` VARCHAR(191) NOT NULL,
    `pathPicture` VARCHAR(191) NOT NULL,
    `filenamePicture` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PicturePost` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `pictureId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Pet_pictureId_key` ON `Pet`(`pictureId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_pictureId_key` ON `User`(`pictureId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_pictureId_fkey` FOREIGN KEY (`pictureId`) REFERENCES `Picture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_pictureId_fkey` FOREIGN KEY (`pictureId`) REFERENCES `Picture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PicturePost` ADD CONSTRAINT `PicturePost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PicturePost` ADD CONSTRAINT `PicturePost_pictureId_fkey` FOREIGN KEY (`pictureId`) REFERENCES `Picture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
