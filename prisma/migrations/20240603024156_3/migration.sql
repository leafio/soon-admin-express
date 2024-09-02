-- CreateTable
CREATE TABLE "Menu" (
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
    CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "desc" TEXT,
    "permissions" TEXT NOT NULL
);
