-- CreateTable
CREATE TABLE "Secrets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiration" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
