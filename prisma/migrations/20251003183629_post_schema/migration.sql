/*
  Warnings:

  - You are about to drop the column `picture` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "picture",
DROP COLUMN "views",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "view" INTEGER NOT NULL DEFAULT 0;
