import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document{
    name: string;
    email: string;
    password: string;
    googleId: string;
}

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        select: false,
    },
    googleId: {
        type: String,
    }
});

const UserModel = mongoose.models?.User || mongoose.model<User>("User", UserSchema);

export default UserModel;