/*
  Warnings:

  - You are about to drop the column `state` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `stateId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pet` DROP COLUMN `state`,
    ADD COLUMN `stateId` INTEGER NOT NULL,
    ADD COLUMN `statePet` ENUM('AVAILABLE', 'ADOPTED', 'IN_PROCESS') NOT NULL DEFAULT 'AVAILABLE';

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
