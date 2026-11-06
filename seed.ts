// api/prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  // Insert 4 Genres
  const fiction = await prisma.genre.create({ data: { name: 'Fiction' } });
  const sciFi = await prisma.genre.create({ data: { name: 'Science Fiction' } });
  const mystery = await prisma.genre.create({ data: { name: 'Mystery & Thriller' } });
  const nonFiction = await prisma.genre.create({ data: { name: 'Non-Fiction' } });

  console.log('Genres created.');

  // Insert 15+ Books distributed across genres
  const booksData = [
    // Fiction
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', publishedYear: 1925, genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', publishedYear: 1960, genreId: fiction.id },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', publishedYear: 1949, genreId: fiction.id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', publishedYear: 1813, genreId: fiction.id },

    // Science Fiction
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', publishedYear: 1965, genreId: sciFi.id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569564', publishedYear: 1984, genreId: sciFi.id },
    { title: 'Foundation', author: 'Isaac Asimov', isbn: '9780553293357', publishedYear: 1951, genreId: sciFi.id },
    { title: 'Snow Crash', author: 'Neal Stephenson', isbn: '9780553380958', publishedYear: 1992, genreId: sciFi.id },

    // Mystery & Thriller
    { title: 'The Da Vinci Code', author: 'Dan Brown', isbn: '9780307474278', publishedYear: 2003, genreId: mystery.id },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', publishedYear: 2012, genreId: mystery.id },
    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '9780307949486', publishedYear: 2005, genreId: mystery.id },
    { title: 'The Silent Patient', author: 'Alex Michaelides', isbn: '9781250301697', publishedYear: 2019, genreId: mystery.id },

    // Non-Fiction
    { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', isbn: '9780062316097', publishedYear: 2014, genreId: nonFiction.id },
    { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', publishedYear: 2018, genreId: nonFiction.id },
    { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', publishedYear: 2018, genreId: nonFiction.id },
    { title: 'Becoming', author: 'Michelle Obama', isbn: '9781524763138', publishedYear: 2018, genreId: nonFiction.id },
  ];

  for (const book of booksData) {
    await prisma.book.create({ data: book });
  }

  console.log(`Successfully seeded ${booksData.length} books across 4 genres.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });