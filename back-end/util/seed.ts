import { PrismaClient } from '@prisma/client';
import { Subject } from '../domain/model/subject';
import { Category } from '../domain/model/category';
const prisma = new PrismaClient();
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'user@tistudent.be',
            password: 'Str0ngPW!!!',
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
            username: 'ICE money bang bang',
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
    const aliceResource1 = await prisma.resource.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: 'P1 fundamentals summary',
            createdAt: new Date(),
            description: 'All the important stuff for p1',
            category: Category.Summary,
            subject: Subject.Programming1,
            creator: {
                connect: {
                    id: 1,
                },
            },
        },
    });
    console.log(aliceResource1);
    const like = await prisma.like.create({
        data: {
            createdAt: new Date(),
            upvoter: {
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
    console.log(like);
    const bobComment = await prisma.comment.create({
        data: {
            resource: {
                connect: {
                    id: 1,
                },
            },
            profile: {
                connect: {
                    id: 2,
                },
            },
            message: 'Great summary Alice',
            createdAt: new Date(),
            edited: false,
        },
    });
    console.log(bobComment);
    const aliceComment = await prisma.comment.create({
        data: {
            resource: {
                connect: {
                    id: 1,
                },
            },
            profile: {
                connect: {
                    id: 1,
                },
            },
            message: 'Thanks Bob',
            createdAt: new Date(),
            edited: false,
            parentId: 1,
        },
    });
    console.log(aliceComment);
    const like2 = await prisma.like.create({
        data: {
            createdAt: new Date(),
            upvoter: {
                connect: {
                    id: 2,
                },
            },
            comment: {
                connect: {
                    id: 2,
                },
            },
        },
    });
    console.log(like2);
    const bobComment2 = await prisma.comment.create({
        data: {
            resource: {
                connect: {
                    id: 1,
                },
            },
            profile: {
                connect: {
                    id: 2,
                },
            },

            message: "You're welcome Alice",
            createdAt: new Date(),
            edited: false,
            parentId: 1,
        },
    });
    console.log(bobComment2);

    const bobComment3 = await prisma.comment.create({
        data: {
            resource: {
                connect: {
                    id: 1,
                },
            },
            profile: {
                connect: {
                    id: 2,
                },
            },
            message: 'Love you too',
            createdAt: new Date(),
            edited: false,
            parentId: 1,
        },
    });
    console.log(bobComment3);
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
