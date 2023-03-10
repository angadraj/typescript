import mongoose, { Document, Schema } from "mongoose";

export interface IUser {    
    email: string,
    password: string
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model<IUserModel>('User', UserSchema);