import database from '../../util/database';
import { Comment } from '../model/comment';
import { Profile } from '../model/profile';
import { Resource } from '../model/resource';

const getAllComments = async (): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany({
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
                resource: {
                    include: {
                        creator: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        if (commentsPrisma) return commentsPrisma.map((commentPrisma) => Comment.from(commentPrisma));
    } catch (error) {}
};

const getCommentById = async (commentId: number): Promise<Comment> => {
    try {
        const commentPrisma = await database.comment.findUnique({
            where: {
                id: commentId,
            },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
                resource: {
                    include: {
                        creator: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        if (commentPrisma) return Comment.from(commentPrisma);

        return;
    } catch (error) {}
};

const getAllCommentsOnResource = async (resourceId: number): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany({
            where: {
                resourceId: resourceId,
            },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
                resource: {
                    include: {
                        creator: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        if (commentsPrisma) return commentsPrisma.map((comment) => Comment.from(comment));
    } catch (error) {}
    // return comments.filter((comment) => comment.resource.id == resourceId);
};
const getAllCommentsByProfile = async (profileId: number): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany({
            where: {
                profileId: profileId,
            },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
                resource: {
                    include: {
                        creator: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        if (commentsPrisma) return commentsPrisma.map((comment) => Comment.from(comment));
    } catch (error) {}
    // return comments.filter((comment) => comment.resource.id == resourceId);
};

const getAllCommentsByProfileOnResource = async (profileId: number, resourceId: number): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany({
            where: {
                profileId: profileId,
                resourceId: resourceId,
            },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
                resource: {
                    include: {
                        creator: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        if (commentsPrisma) return commentsPrisma.map((comment) => Comment.from(comment));
    } catch (error) {}
    // return comments.filter((comment) => comment.resource.id == resourceId);
};

const createComment = async (profile: Profile, resource: Resource, message: string, parent = null) => {
    try {
        const comment = new Comment({ profile, resource, message, parent });
        const commentPrisma = await database.comment.create({
            data: {
                profile: {
                    connect: {
                        id: comment.profile.id,
                    },
                },
                resource: {
                    connect: {
                        id: comment.resource.id,
                    },
                },
                createdAt: new Date(),
                message: comment.message,
                parent: {
                    connect: {
                        id: comment.parent.id,
                    },
                },
            },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
                resource: {
                    include: {
                        creator: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        if (commentPrisma) return Comment.from(commentPrisma);
    } catch (error) {}
};

const deleteComment = async (commentId: number): Promise<Boolean> => {
    try {
        await database.comment.delete({
            where: {
                id: commentId,
            },
        });
            return true;
    } catch (error) {}
};

export default {
    getAllComments,
    getAllCommentsOnResource,
    getAllCommentsByProfile,
    getAllCommentsByProfileOnResource,
    createComment,
    getCommentById,
    deleteComment,
};
