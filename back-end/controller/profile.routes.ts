import express, { NextFunction, Request, Response } from 'express';
import { Profile } from '../domain/model/profile';
import profileService from '../service/profile.service';
import { ProfileInput, ProfileLikes, Role } from '../types';

const profileRouter = express.Router();

profileRouter.get('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const role: Role = req.auth.role;

        const profiles: Profile[] = await profileService.getAllProfiles(role);

        res.status(200).json({ status: 'success', message: 'profiles found', profiles });
    } catch (error) {
        next(error);
    }
});

profileRouter.get('/:profileId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number = parseInt(req.params.profileId);

        const profile: Profile = await profileService.getProfileById(profileId);

        res.status(200).json({ status: 'success', message: 'profile found', profile });
    } catch (error) {
        next(error);
    }
});

profileRouter.get('/:profileId/likes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number = parseInt(req.params.profileId);

        const profile: ProfileLikes = await profileService.getProfileLikes(profileId);

        res.status(200).json({ status: 'success', message: 'likes created by profile', profile });
    } catch (error) {
        next(error);
    }
});

profileRouter.put('/:profileId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number = parseInt(req.params.profileId);
        const profileInput: ProfileInput = req.body as ProfileInput;

        const updatedProfile: Profile = await profileService.updateProfile(profileId, profileInput);

        res.status(200).json({ status: 'success', message: 'profile updated', updatedProfile });
    } catch (error) {
        next(error);
    }
});

profileRouter.delete('/:profileId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number = parseInt(req.params.profileId);

        const deletedProfile: Profile = await profileService.deleteProfile(profileId);

        res.status(200).json({ status: 'success', message: 'profile deleted', deletedProfile });
    } catch (error) {
        next(error);
    }
});

export { profileRouter };
