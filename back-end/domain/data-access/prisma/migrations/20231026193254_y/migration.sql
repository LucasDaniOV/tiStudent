-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_resourceId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "resourceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
