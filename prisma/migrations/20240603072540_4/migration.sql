/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Assets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CashFlowType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VoucherAbbr` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Account";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Assets";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CashFlowType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VoucherAbbr";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "sort" INTEGER,
    "menuType" INTEGER NOT NULL,
    "title" TEXT,
    "path" TEXT,
    "component" TEXT,
    "redirect" TEXT,
    "icon" TEXT,
    "extraIcon" TEXT,
    "enterTransition" TEXT,
    "leaveTransition" TEXT,
    "activePath" TEXT,
    "auths" TEXT,
    "frameSrc" TEXT,
    "frameLoading" BOOLEAN NOT NULL DEFAULT false,
    "keepAlive" BOOLEAN NOT NULL DEFAULT false,
    "hiddenTag" BOOLEAN NOT NULL DEFAULT false,
    "fixedTag" BOOLEAN NOT NULL DEFAULT false,
    "showLink" BOOLEAN NOT NULL DEFAULT true,
    "showParent" BOOLEAN NOT NULL DEFAULT true,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME,
    CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Menu" ("activePath", "auths", "component", "desc", "enterTransition", "extraIcon", "fixedTag", "frameLoading", "frameSrc", "hiddenTag", "icon", "id", "keepAlive", "leaveTransition", "menuType", "name", "parentId", "path", "redirect", "showLink", "showParent", "sort", "title") SELECT "activePath", "auths", "component", "desc", "enterTransition", "extraIcon", "fixedTag", "frameLoading", "frameSrc", "hiddenTag", "icon", "id", "keepAlive", "leaveTransition", "menuType", "name", "parentId", "path", "redirect", "showLink", "showParent", "sort", "title" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE TABLE "new_Dept" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "sort" INTEGER,
    "parentId" INTEGER,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME,
    CONSTRAINT "Dept_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Dept" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Dept" ("desc", "id", "name", "parentId", "sort") SELECT "desc", "id", "name", "parentId", "sort" FROM "Dept";
DROP TABLE "Dept";
ALTER TABLE "new_Dept" RENAME TO "Dept";
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "desc" TEXT,
    "permissions" TEXT NOT NULL,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME
);
INSERT INTO "new_Role" ("code", "desc", "id", "name", "permissions", "status") SELECT "code", "desc", "id", "name", "permissions", "status" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE TABLE "new_User" (
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
    "desc" TEXT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME
);
INSERT INTO "new_User" ("account", "deptId", "desc", "email", "gender", "id", "name", "nickName", "password", "phone", "roleId", "status") SELECT "account", "deptId", "desc", "email", "gender", "id", "name", "nickName", "password", "phone", "roleId", "status" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_key_check("Menu");
PRAGMA foreign_key_check("Dept");
PRAGMA foreign_key_check("Role");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
