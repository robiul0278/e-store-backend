import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";

export const sendImageToCloudinary = async () => {
    cloudinary.config({
        cloud_name: config.cloud_name,
        api_key: config.cloud_api_key,
        api_secret: config.cloud_api_secret,
    });

    try {
        const result = await cloudinary.uploader.upload(
            "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            {
                folder: "my_profile",
                use_filename: true,
                unique_filename: true,
                overwrite: false,
            }
        );
        console.log("Upload success:", result.secure_url);
    } catch (error) {
        console.error("Upload failed:", error);
    }
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