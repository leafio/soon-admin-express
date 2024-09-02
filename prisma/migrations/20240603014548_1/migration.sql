-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dept" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "parentId" INTEGER,
    CONSTRAINT "Dept_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Dept" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Dept" ("desc", "id", "name", "parentId") SELECT "desc", "id", "name", "parentId" FROM "Dept";
DROP TABLE "Dept";
ALTER TABLE "new_Dept" RENAME TO "Dept";
PRAGMA foreign_key_check("Dept");
PRAGMA foreign_keys=ON;
