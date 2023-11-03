/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resourceId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_profileId_key" ON "Like"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_resourceId_key" ON "Like"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_commentId_key" ON "Like"("commentId");
