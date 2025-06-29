/*
  Warnings:

  - You are about to drop the `Sesion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Sesion` DROP FOREIGN KEY `Sesion_userId_fkey`;

-- DropTable
DROP TABLE `Sesion`;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,
    `date_created` VARCHAR(191) NOT NULL,
    `time_created` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Session_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
