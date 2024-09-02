-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "desc" TEXT,
    "permissions" TEXT NOT NULL,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME
);
INSERT INTO "new_Role" ("code", "createTime", "desc", "id", "name", "permissions", "status", "updateTime") SELECT "code", "createTime", "desc", "id", "name", "permissions", "status", "updateTime" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
PRAGMA foreign_key_check("Role");
PRAGMA foreign_keys=ON;
