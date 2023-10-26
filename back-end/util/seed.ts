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
    const aliceProfile = await prisma.profile.upsert({
        where: { userId: 1 },
        update: {},
        create: {
            username: 'Al-ICE money bang bang',
            createdAt: new Date(),
            latestActivity: new Date(),
            user: {
                connect: {
                    email: 'alice12@prisma.io',
                },
            },
        },
    });
    console.log(aliceProfile);
    const bobProfile = await prisma.profile.upsert({
        where: { userId: 2 },
        update: {},
        create: {
            username: 'BobTheBuilder',
            bio: 'Call me bob the way I make these samenvattingen like damn.',
            createdAt: new Date(),
            latestActivity: new Date(),
            user: {
                connect: {
                    email: 'bob9@prisma.io',
                },
            },
        },
    });
    console.log(bobProfile);

    console.log(aliceProfile);
    const aliceResource1 = await prisma.resource.upsert({
        where: { creatorId: 1 },
        update: {},
        create: {
            title: 'P1 fundamentals summary',
            createdAt: new Date(),
            description: 'All the important stuff for p1',
            category: 'Summary',
            subject: 'Programming1',
            creator: {
                connect: {
                    id: 1,
                },
            },
        },
    });
    console.log(aliceResource1);
    // //can't create like because it needs a comment??
    // const like = await prisma.like.upsert({
    //     where: { profileId: 2 },
    //     update: {},
    //     create: {
    //         createdAt: new Date(),
    //         profileId: 2,
    //         resource: {
    //             connect: {
    //                 id: 1,
    //             },
    //         }
    //     },
    // });
    // console.log(like);

    const bobComment = await prisma.comment.upsert({
        where: { profileId: 2 },
        update: {},
        create: {
            message: 'Great samenvatting Alice!',
            createdAt: new Date(),
            profile: {
                connect: {
                    id: 2,
                },
            },
            resource: {
                connect: {
                    id: 1,
                },
            },
        },
    });
    console.log(bobComment);
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
