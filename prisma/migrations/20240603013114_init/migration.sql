-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "email" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "nickName" TEXT,
    "roleId" INTEGER,
    "deptId" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,
    "gender" INTEGER,
    "desc" TEXT
);

-- CreateTable
CREATE TABLE "Dept" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "parentId" INTEGER NOT NULL,
    CONSTRAINT "Dept_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Dept" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "authorId" INTEGER,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CashFlowType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT
);

-- CreateTable
CREATE TABLE "VoucherAbbr" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    "taxType" INTEGER NOT NULL,
    "accountingStandard" INTEGER NOT NULL,
    "startYear" INTEGER NOT NULL,
    "startMonth" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Assets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "addDate" INTEGER NOT NULL,
    "addType" INTEGER NOT NULL,
    "spec" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "depreciationMethod" INTEGER NOT NULL,
    "assetsSubject" INTEGER NOT NULL,
    "accumulatedDepreciationSubject" INTEGER NOT NULL,
    "liquidationSubject" INTEGER NOT NULL,
    "depreciationFeeSubject" INTEGER NOT NULL,
    "originalValue" DECIMAL NOT NULL,
    "residualsRate" DECIMAL NOT NULL,
    "estimatedResidualValue" DECIMAL NOT NULL,
    "estimatedMonth" INTEGER NOT NULL,
    "depreciationMonth" INTEGER NOT NULL,
    "remainingMonth" INTEGER NOT NULL,
    "accumulatedDepreciationValue" DECIMAL NOT NULL,
    "currentDepreciationValue" DECIMAL NOT NULL,
    "lastDepreciationValue" DECIMAL NOT NULL,
    "monthlyDepreciationValue" DECIMAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
