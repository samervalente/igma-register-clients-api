/*
  Warnings:

  - You are about to drop the column `birhDate` on the `clients` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_clients" ("cpf", "createdAt", "id", "name") SELECT "cpf", "createdAt", "id", "name" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
