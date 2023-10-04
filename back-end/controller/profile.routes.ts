import express, { Request, Response } from 'express';
import profileService from '../service/profile.service';
import { ProfileInput } from '../types';

const profileRouter = express.Router();

profileRouter.get('/', (req: Request, res: Response) => {
    try {
        const profiles = profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

profileRouter.get('/:id', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const profile = profileService.getProfileById(id);
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

profileRouter.post('/', (req: Request, res: Response) => {
    try {
        const profileInput = req.body as ProfileInput;
        const profile = profileService.createProfile(profileInput);
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { profileRouter };
