-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER DEFAULT 0,
    "desc" TEXT,
    "permissions" TEXT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME
);
INSERT INTO "new_Role" ("code", "createTime", "desc", "id", "name", "permissions", "status", "updateTime") SELECT "code", "createTime", "desc", "id", "name", "permissions", "status", "updateTime" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
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
    "updateTime" DATETIME,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createTime", "deptId", "desc", "email", "gender", "id", "name", "nickname", "password", "phone", "roleId", "status", "updateTime", "username") SELECT "createTime", "deptId", "desc", "email", "gender", "id", "name", "nickname", "password", "phone", "roleId", "status", "updateTime", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
