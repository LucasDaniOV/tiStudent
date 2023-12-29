import { PrismaClient } from '@prisma/client';
import { hashPassword } from './password';

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
            title: 'P1 fundamentals summary',
            description: 'All the important stuff for p1',
            profileId: aliceProfile.id,
        },
    });

    const resource2 = await prisma.resource.create({
        data: {
            title: 'Full-Stack Software Development Cheat Sheet',
            description: 'All the important stuff for FSSD',
            profileId: satoshi.id,
        },
    });

    // Category
    const summaryCategory = await prisma.category.create({
        data: {
            name: 'Summary',
        },
    });

    const cheatSheetCategory = await prisma.category.create({
        data: {
            name: 'Cheat Sheet',
        },
    });

    // Subject
    const programming1Subject = await prisma.subject.create({
        data: {
            name: 'Programming 1',
        },
    });

    const fullstackSubject = await prisma.subject.create({
        data: {
            name: 'Full-Stack Software Development',
        },
    });

    // linking Resource with Category
    await prisma.categoryOnResource.create({
        data: {
            resourceId: resource.id,
            categoryId: summaryCategory.id,
        },
    });

    // linking Resource with Subject
    await prisma.subjectOnResource.create({
        data: {
            resourceId: resource.id,
            subjectId: programming1Subject.id,
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
        },
    });

    await prisma.comment.create({
        data: {
            message: 'Love you too',
            profileId: bobProfile.id,
            resourceId: resource.id,
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
