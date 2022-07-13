import mongoose from 'mongoose';
import IUser from '../interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number
    },
    photo: {
        type: String
    },

    userType: {
        type: String,
        required: true,
        default: 'user'
    },

    language: {
        type: String,
        default: 'no'
    },

    password: {
        type: String,
        default: 'xxxxxxx',
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});


const User = mongoose.model<IUser>("User", userSchema);

export default User;
