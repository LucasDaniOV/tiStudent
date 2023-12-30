import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const start = (port: number) => {
    try {
        app.listen(port, () => {
            console.log(`Back-end is running on port ${port}.`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}.`);
        process.exit(1);
    }
};

const port = parseInt(process.env.PORT || '3000');
start(port);
