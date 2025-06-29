/*
  Warnings:

  - You are about to drop the column `user` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Pet` DROP FOREIGN KEY `Pet_user_fkey`;

-- DropIndex
DROP INDEX `Pet_user_fkey` ON `Pet`;

-- AlterTable
ALTER TABLE `Pet` DROP COLUMN `user`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
