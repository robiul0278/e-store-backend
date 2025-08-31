import { Schema, model } from 'mongoose';
import { IRegisterUser } from './auth.interface';
import bcrypt from "bcrypt";
import config from '../../../config';

const UserSchema = new Schema<IRegisterUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),

    )
    next();
});
UserSchema.post('save', function (doc, next) {
    doc.password = ''
    next();
});

export const userModel = model<IRegisterUser>("User", UserSchema);