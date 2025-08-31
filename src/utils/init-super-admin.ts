import bcrypt from "bcrypt";
import { userModel } from "../app/modules/auth/auth.model";
import config from "../config";

export const createSuperAdmin = async () => {
  const userCount = await userModel.countDocuments();
  if (userCount === 0) {
    await userModel.create({
      name: "Super Admin",
      email: config.super_admin_email,
      password: config.super_admin_password,
      role: "superAdmin",
    });

    console.log("Super Admin created successfully");
  } else {
    console.log("Super Admin already exist. Skipping Super Admin creation.");
  }
};
