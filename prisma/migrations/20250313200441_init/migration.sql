-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "codeforcesHandle" TEXT NOT NULL,
    "codeforcesRating" INTEGER NOT NULL,
    "codeforcesProblemsSolved" INTEGER NOT NULL,
    "leetcodeHandle" TEXT NOT NULL,
    "leetcodeRating" INTEGER NOT NULL,
    "leetcodeProblemsSolved" INTEGER NOT NULL,
    "codechefHandle" TEXT NOT NULL,
    "codechefRating" INTEGER NOT NULL,
    "codechefProblemsSolved" INTEGER NOT NULL,
    "image" TEXT,
    "totalScore" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_codeforcesHandle_key" ON "User"("codeforcesHandle");

-- CreateIndex
CREATE UNIQUE INDEX "User_leetcodeHandle_key" ON "User"("leetcodeHandle");

-- CreateIndex
CREATE UNIQUE INDEX "User_codechefHandle_key" ON "User"("codechefHandle");
