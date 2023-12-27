import { PrismaClient } from '@prisma/client';
import { hashPassword } from './password';

const prisma = new PrismaClient();

async function main() {
    // Profile
    const satoshi = await prisma.profile.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            latestActivity: new Date(),
            email: 'satoshi@tistudent.com',
            username: 'JJ',
            password: await hashPassword('Str0ngPW!!!'),
            role: 'ADMIN',
        },
    });

    const alice = await prisma.profile.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            latestActivity: new Date(),
            email: 'alice@gmail.com',
            username: 'ICE money bang bang',
            password: await hashPassword('Str0ngPW!!!2'),
            role: 'USER',
        },
    });

    const bob = await prisma.profile.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            latestActivity: new Date(),
            email: 'bob@gmail.com',
            username: 'BobTheBuilder',
            password: await hashPassword('passWord123!$'),
            role: 'USER',
            bio: 'Call me bob the way I make these samenvattingen like damn.',
        },
    });

    // Resource
    const aliceresource = await prisma.resource.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            title: 'P1 fundamentals summary',
            description: 'All the important stuff for p1',
            profileId: alice.id,
        },
    });

    // Category
    const summary = await prisma.category.create({
        data: {
            name: 'Summary',
        },
    });

    // Subject
    const programming1 = await prisma.subject.create({
        data: {
            name: 'Programming 1',
        },
    });

    // linking Resource with Category
    await prisma.categoriesOnResources.create({
        data: {
            resourceId: aliceresource.id,
            categoryId: summary.id,
        },
    });

    // linking Resource with Subject
    await prisma.subjectsOnResources.create({
        data: {
            resourceId: aliceresource.id,
            subjectId: programming1.id,
        },
    });

    // Comment
    const bobComment = await prisma.comment.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            message: 'Great summary Alice',
            profileId: bob.id,
            resourceId: aliceresource.id,
        },
    });

    const aliceComment = await prisma.comment.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            message: 'Thanks Bob',
            profileId: alice.id,
            resourceId: aliceresource.id,
            parentId: bobComment.id,
        },
    });

    const bobComment2 = await prisma.comment.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            message: 'Love you too',
            profileId: bob.id,
            resourceId: aliceresource.id,
            parentId: aliceComment.id,
        },
    });

    // ResourceLike
    await prisma.resourceLike.create({
        data: {
            createdAt: new Date(),
            profileId: bob.id,
            resourceId: aliceresource.id,
        },
    });

    // CommentLike
    await prisma.commentLike.create({
        data: {
            createdAt: new Date(),
            profileId: alice.id,
            commentId: bobComment.id,
        },
    });
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
