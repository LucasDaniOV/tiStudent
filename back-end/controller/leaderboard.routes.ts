import express, { NextFunction, Request, Response } from 'express';
import { Profile } from '../domain/model/profile';
import profileService from '../service/profile.service';
import resourceService from '../service/resource.service';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/10', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const profiles: Profile[] = await profileService.getAllProfiles('ADMIN');

        const ordered = await Promise.all(
            profiles.map(async (profile) => {
                const resourceCount = (await resourceService.getResourcesByProfileId(profile.id)).length;
                return { profile, resourceCount };
            })
        );

        ordered.sort((a, b) => b.resourceCount - a.resourceCount);

        res.status(200).json({ status: 'success', message: 'profiles found', profiles: ordered.slice(0, 10) });
    } catch (error) {
        next(error);
    }
});

export { leaderboardRouter };
