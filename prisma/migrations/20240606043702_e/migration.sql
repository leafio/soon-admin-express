-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL DEFAULT '',
    "password" TEXT,
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
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "Dept" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createTime", "deptId", "desc", "email", "gender", "id", "name", "nickname", "password", "phone", "roleId", "status", "updateTime", "username") SELECT "createTime", "deptId", "desc", "email", "gender", "id", "name", "nickname", "password", "phone", "roleId", "status", "updateTime", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
