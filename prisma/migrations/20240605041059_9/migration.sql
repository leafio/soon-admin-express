/*
  Warnings:

  - You are about to drop the column `account` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nickName` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "email" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "nickname" TEXT,
    "roleId" INTEGER,
    "deptId" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,
    "gender" INTEGER,
    "desc" TEXT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME
);
INSERT INTO "new_User" ("createTime", "deptId", "desc", "email", "gender", "id", "name", "password", "phone", "roleId", "status", "updateTime") SELECT "createTime", "deptId", "desc", "email", "gender", "id", "name", "password", "phone", "roleId", "status", "updateTime" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
