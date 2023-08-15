/*
  Warnings:

  - You are about to drop the column `authorId` on the `Links` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Links" ("id", "url") SELECT "id", "url" FROM "Links";
DROP TABLE "Links";
ALTER TABLE "new_Links" RENAME TO "Links";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
