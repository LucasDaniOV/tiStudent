import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const fileRouter = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

fileRouter.post('/', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uploadedFile = req.file;
        if (!uploadedFile) {
            return res.status(400).json({ status: 'error', message: 'No file uploaded' });
        }
        res.status(200).json({ status: 'success', message: 'File uploaded successfully', file: uploadedFile });
    } catch (error) {
        next(error);
    }
});

fileRouter.get('/:filename', (req: Request, res: Response, next: NextFunction) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);

    res.download(filePath, filename, (err) => {
        if (err) {
            next(err);
        }
    });
});

fileRouter.delete('/:filename', (req: Request, res: Response, next: NextFunction) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({ status: 'success', message: 'File deleted successfully' });
        }
    });
});

export default fileRouter;
