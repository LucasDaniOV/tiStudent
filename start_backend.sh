cd back-end
npm i
rm -rf domain/data-access/prisma/migrations
npx prisma migrate dev --name init
npx ts-node util/seed.ts
npm test
npm start