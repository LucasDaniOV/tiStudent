import database from '../../util/database';
import { Comment } from '../model/comment';
import { Like } from '../model/like';
import { Profile } from '../model/profile';
import { Resource } from '../model/resource';

const getAllLikes = async (): Promise<Like[]> => {
    try {
        const likesPrisma = await database.like.findMany({
            include: {
                upvoter: true,
                resource: {
                    include: {
                        creator: true,
                    },
                },
                comment: {
                    include: {
                        profile: true,
                        resource: {
                            include: {
                                creator: true,
                            },
                        },
                    },
                },
            },
        });

        if (likesPrisma) return likesPrisma.map((likePrisma) => Like.from(likePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getLikeById = async (likeId: number): Promise<Like> => {
    try {
        const likePrisma = await database.like.findUnique({
            where: {
                id: likeId,
            },
            include: {
                upvoter: true,
                resource: {
                    include: {
                        creator: true,
                    },
                },
                comment: {
                    include: {
                        profile: true,
                        resource: {
                            include: {
                                creator: true,
                            },
                        },
                    },
                },
            },
        });
        if (likePrisma) return Like.from(likePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getLikesOnResource = async (resourceId: number): Promise<Like[]> => {
    try {
        const likesPrisma = await database.like.findMany({
            where: {
                resource: {
                    id: resourceId,
                },
                commentId: null,
            },
            include: {
                upvoter: true,
                resource: {
                    include: {
                        creator: true,
                    },
                },
                comment: {
                    include: {
                        profile: true,
                        resource: {
                            include: {
                                creator: true,
                            },
                        },
                    },
                },
            },
        });
        if (likesPrisma) return likesPrisma.map((likePrisma) => Like.from(likePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getLikesOnComment = async (commentId: number): Promise<Like[]> => {
    try {
        const likesPrisma = await database.like.findMany({
            where: {
                comment: {
                    id: commentId,
                },
            },
            include: {
                upvoter: true,
                resource: {
                    include: {
                        creator: true,
                    },
                },
                comment: {
                    include: {
                        profile: true,
                        resource: {
                            include: {
                                creator: true,
                            },
                        },
                    },
                },
            },
        });
        if (likesPrisma) return likesPrisma.map((likePrisma) => Like.from(likePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const getLikesByProfile = async (profileId: number): Promise<Like[]> => {
    try {
        const likesPrisma = await database.like.findMany({
            where: {
                upvoter: {
                    id: profileId,
                },
            },
            include: {
                upvoter: true,
                resource: {
                    include: {
                        creator: true,
                    },
                },
                comment: {
                    include: {
                        profile: true,
                        resource: {
                            include: {
                                creator: true,
                            },
                        },
                    },
                },
            },
        });
        if (likesPrisma) return likesPrisma.map((likePrisma) => Like.from(likePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteLike = async (likeId: number): Promise<Boolean> => {
    try {
        await database.like.delete({
            where: {
                id: likeId,
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createLike = async (profile: Profile, resource: Resource, comment: Comment | null): Promise<Like> => {
    try {
        const like = new Like({ profile, resource, comment });
        const likeData = {
            createdAt: new Date(),
            upvoter: {
                connect: {
                    id: like.profile.id,
                },
            },
            resource: {
                connect: {
                    id: like.resource.id,
                },
            },
        };
        const includeData = {
            upvoter: true,
            resource: {
                include: {
                    creator: true,
                },
            },
        };
        if (comment !== null) {
            likeData['comment'] = {
                connect: {
                    id: like.comment.id,
                },
            };
            includeData['comment'] = {
                include: {
                    profile: true,
                    resource: {
                        include: {
                            creator: true,
                        },
                    },
                },
            };
        }
        const likePrisma = await database.like.create({
            data: likeData,
            include: includeData,
        });
        if (likePrisma) return Like.from(likePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllLikes,
    getLikeById,
    getLikesOnResource,
    getLikesOnComment,
    getLikesByProfile,
    deleteLike,
    createLike,
};
