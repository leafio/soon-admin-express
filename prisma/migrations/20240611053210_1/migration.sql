/*
  Warnings:

  - You are about to drop the column `auths` on the `Menu` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
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
    "auth" TEXT,
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
INSERT INTO "new_Menu" ("activePath", "component", "createTime", "desc", "enterTransition", "extraIcon", "fixedTag", "frameLoading", "frameSrc", "hiddenTag", "icon", "id", "keepAlive", "leaveTransition", "menuType", "name", "parentId", "path", "redirect", "showLink", "showParent", "sort", "title", "updateTime") SELECT "activePath", "component", "createTime", "desc", "enterTransition", "extraIcon", "fixedTag", "frameLoading", "frameSrc", "hiddenTag", "icon", "id", "keepAlive", "leaveTransition", "menuType", "name", "parentId", "path", "redirect", "showLink", "showParent", "sort", "title", "updateTime" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
