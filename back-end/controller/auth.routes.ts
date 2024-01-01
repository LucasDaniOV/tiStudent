import express, { NextFunction, Request, Response } from 'express';
import { Profile } from '../domain/model/profile';
import profileService from '../service/profile.service';
import { AuthenticationResponse, ProfileInput } from '../types';

const authRouter = express.Router();

authRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileInput: ProfileInput = req.body as ProfileInput;

        const profile: Profile = await profileService.createProfile(profileInput);

        res.status(200).json({ status: 'success', message: 'profile created', profile });
    } catch (error) {
        next(error);
    }
});

authRouter.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email: string = String(req.body.email);
        const password: string = String(req.body.password);

        const data: AuthenticationResponse = await profileService.authenticate(email, password);

        res.status(200).json({ status: 'success', message: 'authentication successful', ...data });
    } catch (error) {
        next(error);
    }
});

export { authRouter };
