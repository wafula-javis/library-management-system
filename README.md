# Library Management System - Data Layer

## Schema Decisions

### Why `Book` References `Genre` via Foreign Key (`genreId`) Rather Than Embedding It

In relational database design using PostgreSQL and Prisma, modeling `Genre` as an independent normalized table linked via a `genreId` foreign key (one-to-many relationship) offers several key architectural advantages over embedding genre properties directly within the `Book` record:

1. **Data Consistency & Single Source of Truth:** Normalizing genre names into a standalone `Genre` model prevents duplication, typo discrepancies (e.g., "Sci-Fi" vs "Science Fiction"), and data corruption across catalog records.
2. **Efficient Global Updates:** Updating a genre's name or metadata requires updating only a single row in the `Genre` table, rather than executing expensive batch update queries across thousands of book records.
3. **Query Optimization & Filtering:** Having a dedicated `Genre` entity simplifies catalog filtering, aggregations (e.g., counting available books per genre), and building dynamic frontend navigation menus.

---

## Stretch Note: Prisma vs. Document Databases (MongoDB)

Modeling in Prisma with PostgreSQL requires **strict schema enforcement and explicit relational mappings upfront**. Unlike document databases (e.g., MongoDB), where related items (like embedded review sub-documents) are schema-less and stored inside a single document, Prisma requires defining foreign keys (`@relation`), foreign key fields (`genreId`, `userId`, `bookId`), and managing explicit constraints across separate database tables.
