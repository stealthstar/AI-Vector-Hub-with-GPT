import type {NextApiRequest, NextApiResponse} from 'next'
import multer from "multer";
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    }
};

const folderPath = 'public/uploads';

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            cb(null, req.query.fileName as string);
        },
    }),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("beginning handler");

    if (req.method === 'POST') {
        upload.single('file')(req as any, res as any, (err: any) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            // File uploaded successfully
            res.status(200).json({ message: 'File uploaded successfully' });
        });
    } else if (req.method === 'DELETE') {
        const filePath = `${folderPath}/${req.query.fileName as string}`;
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ message: err.message });
                }
                res.status(200).json({ message: 'File deleted successfully' });
                console.log('File deleted successfully');
            });
        } else {
            console.log('File does not exist');
        }
    }

}

export default handler;