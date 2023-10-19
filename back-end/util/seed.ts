import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice12@prisma.io',
            password: 'Aliceecila!$000',
        },
    });
    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob9@prisma.io',
            password: 'passWord123!$',
        },
    });
    console.log({ alice, bob });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
