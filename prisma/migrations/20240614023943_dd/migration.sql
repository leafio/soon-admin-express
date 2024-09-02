-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER,
    "name" TEXT,
    "desc" TEXT,
    "sort" INTEGER,
    "menuType" TEXT NOT NULL,
    "path" TEXT,
    "component" TEXT,
    "redirect" TEXT,
    "meta" TEXT,
    "auth" TEXT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME,
    CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Menu" ("auth", "component", "createTime", "desc", "id", "menuType", "meta", "name", "parentId", "path", "redirect", "sort", "updateTime") SELECT "auth", "component", "createTime", "desc", "id", "menuType", "meta", "name", "parentId", "path", "redirect", "sort", "updateTime" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
