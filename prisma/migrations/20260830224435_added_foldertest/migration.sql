-- CreateTable
CREATE TABLE "FolderTest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "FolderTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FolderTest" ADD CONSTRAINT "FolderTest_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FolderTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
