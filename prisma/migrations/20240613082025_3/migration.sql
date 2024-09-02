/*
  Warnings:

  - You are about to drop the column `activePath` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `auth` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `enterTransition` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `extraIcon` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `fixedTag` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `frameLoading` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `frameSrc` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `hiddenTag` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `keepAlive` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `leaveTransition` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `showLink` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `showParent` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Menu` table. All the data in the column will be lost.

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
    "path" TEXT,
    "component" TEXT,
    "redirect" TEXT,
    "meta" TEXT,
    "createTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME,
    CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Menu" ("component", "createTime", "desc", "id", "menuType", "name", "parentId", "path", "redirect", "sort", "updateTime") SELECT "component", "createTime", "desc", "id", "menuType", "name", "parentId", "path", "redirect", "sort", "updateTime" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
