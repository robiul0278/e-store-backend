import { v2 as cloudinary } from "cloudinary";

export const sendImageToCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
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
