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
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createComment = async (profile: Profile, resource: Resource, message: string, parentId: number | null = null) => {
    try {
        const comment = new Comment({ profile, resource, message, parentId });
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
                parentId: parentId ? parentId : null,
                message: comment.message,
                edited: false,
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
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateMessageOnComment = async (commentId: number, newValue: string): Promise<Comment> => {
    try {
        const commentMessagePrisma = await database.comment.update({
            where: {
                id: commentId,
            },
            data: {
                edited: true,
                message: newValue,
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
        if (commentMessagePrisma) return Comment.from(commentMessagePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteComment = async (commentId: number): Promise<Boolean> => {
    try {
        await database.comment.delete({
            where: {
                id: commentId,
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllComments,
    getAllCommentsOnResource,
    getAllCommentsByProfile,
    getAllCommentsByProfileOnResource,
    getCommentById,
    createComment,
    updateMessageOnComment,
    deleteComment,
};
