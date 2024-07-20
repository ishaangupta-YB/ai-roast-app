-- CreateEnum
CREATE TYPE "PopularPlan" AS ENUM ('NO', 'YES');

-- CreateEnum
CREATE TYPE "PLAN" AS ENUM ('free', 'premium');

-- CreateEnum
CREATE TYPE "SUBSCRIPTIONPERIOD" AS ENUM ('monthly', 'yearly');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "photo" TEXT,
    "planId" INTEGER NOT NULL DEFAULT 1,
    "creditBalance" INTEGER NOT NULL DEFAULT 10,
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "roastTone" TEXT NOT NULL,
    "roleType" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "outputData" TEXT NOT NULL,

    CONSTRAINT "GithubHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeetcodeHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "roastTone" TEXT NOT NULL,
    "roleType" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "outputData" TEXT NOT NULL,

    CONSTRAINT "LeetcodeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roastTone" TEXT NOT NULL,
    "roleType" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "resumeFile" TEXT,
    "outputData" TEXT NOT NULL,

    CONSTRAINT "ResumeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planTitle" TEXT NOT NULL,
    "planPrice" DOUBLE PRECISION NOT NULL,
    "planDetails" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_customerId_key" ON "User"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- AddForeignKey
ALTER TABLE "GithubHistory" ADD CONSTRAINT "GithubHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeetcodeHistory" ADD CONSTRAINT "LeetcodeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeHistory" ADD CONSTRAINT "ResumeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
