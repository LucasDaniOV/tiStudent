import * as bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { authRouter } from './controller/auth.routes';
import categoryRouter from './controller/category.routes';
import { categoryOnResourceRouter } from './controller/categoryOnResource.routes';
import { commentRouter } from './controller/comment.routes';
import { commentLikeRouter } from './controller/commentLike.routes';
import { profileRouter } from './controller/profile.routes';
import { resourceRouter } from './controller/resource.routes';
import { resourceLikeRouter } from './controller/resourceLike.routes';
import subjectRouter from './controller/subject.routes';
import { subjectOnResourceRouter } from './controller/subjectOnResource.routes';
import { version } from './package.json';
import { leaderboardRouter } from './controller/leaderboard.routes';
import fileRouter from './controller/files.routes';

const app = express();

app.use(helmet());

app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/signup', '/signin', '/status'],
    })
);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/profiles', profileRouter);
app.use('/resources', resourceRouter);
app.use('/comments', commentRouter);
app.use('/categories', categoryRouter);
app.use('/subjects', subjectRouter);
app.use('/categories-on-resources', categoryOnResourceRouter);
app.use('/subjects-on-resources', subjectOnResourceRouter);
app.use('/commentlikes', commentLikeRouter);
app.use('/resourcelikes', resourceLikeRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/', authRouter);
app.use('/files', fileRouter);

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'tiStudent API',
            version,
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

export default app;
