-- CreateTable
CREATE TABLE "projects2" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs2" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "paragraphs" TEXT[],
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogs2_projectId_key" ON "blogs2"("projectId");

-- AddForeignKey
ALTER TABLE "blogs2" ADD CONSTRAINT "blogs2_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects2"("id") ON DELETE CASCADE ON UPDATE CASCADE;
