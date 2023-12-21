import { PrismaClient } from '@prisma/client';
import { Subject } from '../domain/model/subject';
import { Category } from '../domain/model/category';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
    const alice = await prisma.profile.create({
        data: {
            email: 'alice12@prisma.io',
            password: await bcrypt.hash('Str0ngPW!!!', 12),
            role: 'admin',
            username: 'ICE money bang bang',
            createdAt: new Date(),
            latestActivity: new Date(),
        },
    });
    console.log(alice);
    const bob = await prisma.profile.create({
        data: {
            email: 'bob9@prisma.io',
            password: await bcrypt.hash('passWord123!$', 12),
            role: 'admin',
            username: 'BobTheBuilder',
            bio: 'Call me bob the way I make these samenvattingen like damn.',
            createdAt: new Date(),
            latestActivity: new Date(),
        },
    });
    console.log(bob);
    const satoshi = await prisma.profile.create({
        data: {
            email: 'satoshi2.nakamoto@gmail.com',
            password: await bcrypt.hash('Str0ngPW!!!2', 12),
            role: 'admin',
            username: 'JJ',
            createdAt: new Date(),
            latestActivity: new Date(),
        },
    });
    console.log(satoshi);
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
            parent: {
                connect: {
                    id: bobComment.id,
                },
            },
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
            parent: {
                connect: {
                    id: bobComment.id,
                },
            },
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
            parent: {
                connect: {
                    id: bobComment.id,
                },
            },
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
