/*
  Warnings:

  - You are about to drop the `Shipping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingCompany` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `custodianId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `shippingId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `custodian` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Shipping_eventId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Shipping";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ShippingCompany";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.00,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("color", "createdAt", "description", "id", "manufacturer", "name", "price", "quantity", "sku", "updatedAt") SELECT "color", "createdAt", "description", "id", "manufacturer", "name", "price", "quantity", "sku", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_sku_key" ON "Item"("sku");
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "custodian" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("condition", "createdAt", "description", "eventType", "id", "itemId", "location", "name", "status", "updatedAt") SELECT "condition", "createdAt", "description", "eventType", "id", "itemId", "location", "name", "status", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
