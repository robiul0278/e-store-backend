import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../config";
import multer from "multer";
import fs from "fs";

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloud_api_key,
    api_secret: config.cloud_api_secret,
});

export const sendImageToCloudinary = (path: string, fileName: string): Promise<UploadApiResponse> => {

    return new Promise((resolve, reject) => {
        // remove spaces
        const nameWithoutSpaces = fileName.split('.')[0].replace(/\s+/g, '-');

        // add 3 random chars for uniqueness
        const randomSuffix = Math.random().toString(36).substring(2, 5);
        const uniqueFileName = `${nameWithoutSpaces}-${randomSuffix}`;
        cloudinary.uploader.upload(
            path,
            {
                public_id: uniqueFileName,
                folder: 'my_profile',
            }, function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result as UploadApiResponse);
                // remove file from local uploads folder
                fs.unlinkSync(path);
            }
        );

    })
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })