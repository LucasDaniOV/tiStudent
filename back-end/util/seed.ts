import { PrismaClient } from '@prisma/client';
import { hashPassword } from './password';
import { Subject, Category } from '../types';

const prisma = new PrismaClient();

async function main() {
    // Profile
    const satoshi = await prisma.profile.create({
        data: {
            email: 'satoshi@tistudent.com',
            username: 'JJ',
            password: await hashPassword('Str0ngPW!!!'),
            role: 'ADMIN',
        },
    });

    const aliceProfile = await prisma.profile.create({
        data: {
            email: 'alice@gmail.com',
            username: 'ICE money bang bang',
            password: await hashPassword('Str0ngPW!!!2'),
            role: 'USER',
        },
    });

    const bobProfile = await prisma.profile.create({
        data: {
            email: 'bob@gmail.com',
            username: 'BobTheBuilder',
            password: await hashPassword('passWord123!$'),
            role: 'USER',
            bio: 'Call me bob the way I make these samenvattingen like damn.',
        },
    });

    // Resource
    const resource = await prisma.resource.create({
        data: {
            title: 'P1 Fundamentals',
            description:
                'All the important stuff for p1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            filePath: 'p1.pdf',
            profileId: aliceProfile.id,
            thumbNail: 'enumerate.png',
        },
    });

    const resource2 = await prisma.resource.create({
        data: {
            title: 'FSD ERD',
            description:
                'FSD ERD. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            filePath: 'erd.pdf',
            profileId: satoshi.id,
            thumbNail: 'erd.png',
        },
    });

    // Category
    for (const category in Category) {
        const name = Category[category];
        await prisma.category.create({
            data: {
                name,
            },
        });
    }

    // Subject
    for (const subject in Subject) {
        const name = Subject[subject];
        await prisma.subject.create({
            data: {
                name,
            },
        });
    }

    // linking Resource with Category
    await prisma.categoryOnResource.create({
        data: {
            resourceId: resource.id,
            categoryId: 1,
        },
    });

    await prisma.categoryOnResource.create({
        data: {
            resourceId: resource2.id,
            categoryId: 2,
        },
    });

    // linking Resource with Subject
    await prisma.subjectOnResource.create({
        data: {
            resourceId: resource.id,
            subjectId: 1,
        },
    });

    await prisma.subjectOnResource.create({
        data: {
            resourceId: resource2.id,
            subjectId: 11,
        },
    });

    // Comment
    const bobComment = await prisma.comment.create({
        data: {
            message: 'Great summary Alice',
            profileId: bobProfile.id,
            resourceId: resource.id,
        },
    });

    await prisma.comment.create({
        data: {
            message: 'Thanks Bob',
            profileId: aliceProfile.id,
            resourceId: resource.id,
            parentId: bobComment.id,
        },
    });

    await prisma.comment.create({
        data: {
            message: "You're welcome Alice",
            profileId: bobProfile.id,
            resourceId: resource.id,
            parentId: bobComment.id,
        },
    });
    await prisma.comment.create({
        data: {
            message: 'Love you too',
            profileId: bobProfile.id,
            resourceId: resource.id,
            parentId: bobComment.id,
        },
    });

    // ResourceLike
    await prisma.resourceLike.create({
        data: {
            profileId: bobProfile.id,
            resourceId: resource.id,
        },
    });

    // CommentLike
    await prisma.commentLike.create({
        data: {
            profileId: aliceProfile.id,
            commentId: bobComment.id,
        },
    });

    for (let i = 1; i <= 20; i++) {
        const r = await prisma.resource.create({
            data: {
                title: `Resource ${i}`,
                description: `Description ${i}`,
                filePath: `${i}-p1.pdf`,
                profileId: satoshi.id,
                thumbNail: 'shrek.jpeg',
            },
        });

        await prisma.categoryOnResource.create({
            data: {
                resourceId: r.id,
                categoryId: 1,
            },
        });

        await prisma.subjectOnResource.create({
            data: {
                resourceId: r.id,
                subjectId: 1,
            },
        });

        await prisma.resourceLike.create({
            data: {
                profileId: aliceProfile.id,
                resourceId: r.id,
            },
        });
    }
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
