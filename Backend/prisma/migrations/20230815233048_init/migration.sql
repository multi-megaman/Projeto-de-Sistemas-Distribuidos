/*
  Warnings:

  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Links";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersLinks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "linkId" INTEGER NOT NULL,
    CONSTRAINT "UsersLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersLinks_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsersLinks" ("id", "linkId", "userId") SELECT "id", "linkId", "userId" FROM "UsersLinks";
DROP TABLE "UsersLinks";
ALTER TABLE "new_UsersLinks" RENAME TO "UsersLinks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
