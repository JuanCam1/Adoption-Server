/*
  Warnings:

  - The primary key for the `Pet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Adoption` DROP FOREIGN KEY `Adoption_petId_fkey`;

-- DropForeignKey
ALTER TABLE `Adoption` DROP FOREIGN KEY `Adoption_userId_fkey`;

-- DropForeignKey
ALTER TABLE `AdoptionHistory` DROP FOREIGN KEY `AdoptionHistory_petId_fkey`;

-- DropForeignKey
ALTER TABLE `AdoptionHistory` DROP FOREIGN KEY `AdoptionHistory_sourceUserId_fkey`;

-- DropForeignKey
ALTER TABLE `AdoptionHistory` DROP FOREIGN KEY `AdoptionHistory_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_user1Id_fkey`;

-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_user2Id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `Pet` DROP FOREIGN KEY `Pet_user_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRating` DROP FOREIGN KEY `UserRating_ratedById_fkey`;

-- DropForeignKey
ALTER TABLE `UserRating` DROP FOREIGN KEY `UserRating_ratedUserId_fkey`;

-- DropIndex
DROP INDEX `Adoption_petId_fkey` ON `Adoption`;

-- DropIndex
DROP INDEX `Adoption_userId_fkey` ON `Adoption`;

-- DropIndex
DROP INDEX `AdoptionHistory_petId_fkey` ON `AdoptionHistory`;

-- DropIndex
DROP INDEX `AdoptionHistory_sourceUserId_fkey` ON `AdoptionHistory`;

-- DropIndex
DROP INDEX `AdoptionHistory_userId_fkey` ON `AdoptionHistory`;

-- DropIndex
DROP INDEX `Comment_authorId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Conversation_user2Id_fkey` ON `Conversation`;

-- DropIndex
DROP INDEX `Message_receiverId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `Message_senderId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `Pet_user_fkey` ON `Pet`;

-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `Post`;

-- DropIndex
DROP INDEX `Session_userId_fkey` ON `Session`;

-- DropIndex
DROP INDEX `UserRating_ratedById_fkey` ON `UserRating`;

-- AlterTable
ALTER TABLE `Adoption` MODIFY `petId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `AdoptionHistory` MODIFY `petId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `sourceUserId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Comment` MODIFY `authorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Conversation` MODIFY `user1Id` VARCHAR(191) NOT NULL,
    MODIFY `user2Id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Message` MODIFY `senderId` VARCHAR(191) NOT NULL,
    MODIFY `receiverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Pet` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `user` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Post` MODIFY `authorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserRating` MODIFY `ratedUserId` VARCHAR(191) NOT NULL,
    MODIFY `ratedById` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adoption` ADD CONSTRAINT `Adoption_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_user1Id_fkey` FOREIGN KEY (`user1Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_user2Id_fkey` FOREIGN KEY (`user2Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdoptionHistory` ADD CONSTRAINT `AdoptionHistory_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdoptionHistory` ADD CONSTRAINT `AdoptionHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdoptionHistory` ADD CONSTRAINT `AdoptionHistory_sourceUserId_fkey` FOREIGN KEY (`sourceUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRating` ADD CONSTRAINT `UserRating_ratedUserId_fkey` FOREIGN KEY (`ratedUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRating` ADD CONSTRAINT `UserRating_ratedById_fkey` FOREIGN KEY (`ratedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
